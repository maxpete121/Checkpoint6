


export class Post{
    constructor(data){
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.creator = data.creator || 'none'
        this.likes = data.likes
        this.id = data._id
    }
}