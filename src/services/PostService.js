import { Post } from "../models/Post";
import { api } from "./AxiosService";





class PostService{
    async getPosts(){
        let response = await api.get('api/posts')
        let allPosts = response.data.map(post => new Post(post))
        
    }
}


export const postService = new PostService()