import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService'
import { UsersService } from '../services/UsersService'
import { MessagesService } from '../services/MessagesService'

interface IParams{
    text: string;
    email: string;
}

io.on('connect', (socket) => {
    const connectionsService = new ConnectionsService()
    const usersService = new UsersService()
    const messagesService = new MessagesService()

    let user_id = null

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;

        const userExists = await usersService.findByEmail(email);

        if (!userExists) {
            const newUser = await usersService.create(email)
            
            await connectionsService.create({
                socket_id,
                user_id: newUser.id
            });

            user_id = newUser.id
        }
        else{
            user_id = userExists.id
            const connecetion  = await connectionsService.findByUserId(userExists.id)
            if(!connecetion){
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                });  
            }
            else{
                connecetion.socket_id = socket_id
                await connectionsService.create(connecetion)
            }
        }


        await messagesService.create({text, user_id})

    })
})