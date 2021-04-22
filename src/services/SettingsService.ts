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
}

export { SettingsService }