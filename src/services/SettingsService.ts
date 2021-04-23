import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
    chat: boolean,
    username: string
}

class SettingsService {
    private settingsRepository: Repository<Setting>
    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository)
    }

    async create({chat, username}: ISettingsCreate){

        const userAlreadExists = await this.settingsRepository.findOne({username})

        if(userAlreadExists){
            throw new Error(`User ${username} alread exists!`)
        }

        const newSettingService = this.settingsRepository.create({
            chat,
            username
        })
        await this.settingsRepository.save(newSettingService)
        return newSettingService

    }

    async findByUsername(username:string){
        const settings = await this.settingsRepository.findOne({
            username,
        })
        return settings
    }
    async update(username:string, chat: boolean){
        await this.settingsRepository.createQueryBuilder().update(Setting)
        .set({chat})
        .where("username = :username", {username}).execute()
    }

}

export { SettingsService }