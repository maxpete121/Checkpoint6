import { AppState } from "../AppState"
import { Account } from "../models/Account"
import { Post } from "../models/Post"
import { Profile } from "../models/Profile"
import { api } from "./AxiosService"





class ProfileService{
    async getProfileById(profileId){
        let response = await api.get(`api/profiles/${profileId}`)
        const newProfile = await new Profile(response.data)
        AppState.activeProfile = newProfile
        // console.log(newProfile, 'profile')
    }

    async getPostsById(profileId, page){
        let response = await api.get(`api/profiles/${profileId}/posts?page=${page}`)
        let profilePosts = await response.data.posts.map(post => new Post(post))
        AppState.profilePosts = profilePosts
        AppState.totalPages = response.data.totalPages
        console.log(response)
    }

    async searchProfilePost(searched){
        let response = await api.get(`api/profiles?query=${searched}`)
        // console.log('profiles',response)
        let profiles = response.data.map(profile => new Profile(profile))
        AppState.searchedProfile = profiles
        let empty = []
        AppState.posts = empty
    }

    async updateProfile(profileData){
        let response = await api.put('/account', profileData)
        // console.log(response)
        let newAccount = new Account(response.data)
        AppState.account = newAccount
    }
}

export const profileService = new ProfileService()