import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { Profile } from "../models/Profile"
import { api } from "./AxiosService"





class ProfileService{
    async getProfileById(profileId){
        let response = await api.get(`api/profiles/${profileId}`)
        const newProfile = await new Profile(response.data)
        AppState.activeProfile = newProfile
        console.log(newProfile, 'profile')
    }

    async getPostsById(profileId){
        let response = await api.get(`api/profiles/${profileId}/posts`)
        let profilePosts = await response.data.posts.map(post => new Post(post))
        AppState.profilePosts = profilePosts
    }
}

export const profileService = new ProfileService()