import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionCreate{
    admin_id?: string,
    socket_id: string,
    user_id: string,
    id?: string
}

class ConnectionsService {
    private connectionsRepository: Repository<Connection>
    constructor(){
        this.connectionsRepository = getCustomRepository(ConnectionsRepository)
    }

    async create({admin_id, socket_id, user_id, id}:IConnectionCreate) {
        const newConnectionService = this.connectionsRepository.create({ 
            admin_id, 
            socket_id,
            user_id,
            id
        })

        await this.connectionsRepository.save(newConnectionService)
        return newConnectionService
    }

    async findByUserId(user_id: string){
        const connection = await this.connectionsRepository.findOne({
            user_id
        });
        return connection
    }

}

export { ConnectionsService }