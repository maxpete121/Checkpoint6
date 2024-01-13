import { computed } from "vue"
import { AppState } from "../AppState"



export class Post{
    constructor(data, liked){
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.creator = data.creator || 'none'
        this.likes = data.likes
        this.id = data._id
        this.liked = liked || false
    }

}