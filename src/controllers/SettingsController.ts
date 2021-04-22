import {Request, Response} from 'express'
import { SettingsService } from '../services/SettingsService';

class SettingsController {
    async create(request:Request, response:Response){
        const { chat, username } = request.body;
        const settingsService = new SettingsService()
        try{
            const newSetting = await settingsService.create({chat, username})
            return response.json(newSetting)
        }catch(err){
            return response.status(400).json({message: err.message})
        }
        
    }
}

export { SettingsController }