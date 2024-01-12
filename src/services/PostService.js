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

    async postPost(postData){
        let response = await api.post('api/posts', postData)
        let newPost = new Post(response.data)
        AppState.posts.push(newPost)
        console.log(response)
    }
}


export const postService = new PostService()