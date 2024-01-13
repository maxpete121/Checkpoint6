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

    async searchProfilePost(searched){
        let response = await api.get(`api/profiles?query=${searched}`)
        console.log('profiles',response)
        let profiles = response.data.map(profile => new Profile(profile))
        AppState.searchedProfile = profiles
        let empty = []
        AppState.posts = empty
    }

    async updateProfile(profileData){
        let response = await api.put('/account', profileData)
    }
}

export const profileService = new ProfileService()