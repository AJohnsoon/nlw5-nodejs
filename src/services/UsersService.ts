import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {
    private usersRepository: Repository<User>
    constructor(){
        this.usersRepository  = getCustomRepository(UsersRepository)
    }

    async create(email: string){
        const userExists = await this.usersRepository.findOne({email})

        if(userExists){
            return userExists
        }

        const newUserService = this.usersRepository.create({email})
        await this.usersRepository.save(newUserService)
        return newUserService

    }
    async findByEmail(email: string) {
        return this.usersRepository.findOne({ email })
    }
}

export { UsersService }