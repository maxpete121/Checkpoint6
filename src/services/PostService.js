import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { api } from "./AxiosService";





class PostService{
    async getPosts(page){
        let response = await api.get(`api/posts?page=${page}`)
        // console.log(page)
        let allPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = allPosts
    }

    async postPost(postData){
        let response = await api.post('api/posts', postData)
        let newPost = new Post(response.data)
        AppState.posts.unshift(newPost)
        // console.log(response)
    }

    async deletePost(postId){
        let response = await api.delete(`api/posts/${postId}`)
        let postIndex = AppState.posts.findIndex(post => post.id == postId)
        AppState.posts.splice(postIndex, 1)
    }

    async searchPost(searched){
        let response = await api.get(`api/posts?query=${searched}`)
        let searchedPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = searchedPosts
    }

}


export const postService = new PostService()