import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { api } from "./AxiosService";





class PostService{
    async getPosts(){
        let response = await api.get('api/posts')
        console.log(response)
        let allPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = allPosts
    }
}


export const postService = new PostService()