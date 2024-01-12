import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { api } from "./AxiosService"





class ProfileService{
    async getProfileById(profileId){
        let response = await api.get(`api/profiles/${profileId}`)
        const newProfile = await new Profile(response.data)
        AppState.activeProfile = newProfile
        console.log(response.data)
    }
}

export const profileService = new ProfileService()