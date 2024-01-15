import { all } from "axios";
import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { api } from "./AxiosService";





class PostService{
    async getPosts(page){
        let response = await api.get(`api/posts?page=${page}`)
        let allPosts = response.data.posts.map(post => new Post(post))
        // console.log(allPosts)
        AppState.posts = allPosts
        AppState.totalPages = response.data.totalPages
    }
    
    async checkPosts(accountId, allPosts){
        console.log(accountId, allPosts)
        for(let i = 0; allPosts.length > i; i++){
            let post = allPosts[i].likeIds
            for(let x = 0; post.length > x; x++){
                if(allPosts[i].likeIds[x] == accountId){
                    allPosts[i].liked = true
                }else{
                    allPosts[i].liked = false
                }
                AppState.posts = allPosts
            }
        }
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

    async likePost(postId, accountId){
        let response = await api.post(`api/posts/${postId}/like`)
        let newPost = await new Post(response.data)
        for(let i = 0; newPost.likeIds.length > i; i++){
            // console.log(i)
            if(newPost.likeIds[i] == accountId){
                newPost.liked = true
            }else{
                newPost.liked = false
            }
        }
        // console.log(newPost)
        this.update(postId, newPost)
    }
    
    update(postId, newPost){
        AppState.posts = AppState.posts.map(post => post.id !== postId ? post : newPost)
    }


}


export const postService = new PostService()