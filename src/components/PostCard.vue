<template>
    <div class="post-card">
        <div class="d-flex align-items-center mb-2 justify-content-center">
            <h4 class="me-3">{{ post.creator.name }}</h4>
            <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                <img class="rounded-circle profile-pic" :src="post.creator.picture" alt="">
            </router-link>
        </div>
        <div class="d-flex justify-content-center mb-2">
            <img v-if="post.imgUrl" class="img-fluid img-class rounded-2" :src="post.imgUrl" alt="">
        </div>
        <div class="mt-1">
            <h6>{{ post.body }}</h6>
        </div>
        <div class="d-flex align-items-center justify-content-between">
            <span class="d-flex me-4">
                <h4 v-if="accountId.id &&  post.liked == true" @click="likePost(post.id, accountId.id)" type="button">💛</h4>
                <h4 v-else-if="accountId.id &&  post.liked == false" @click="likePost(post.id, accountId.id)" type="button">❤</h4>
                <h4 v-else>❤</h4>
                <h5>{{ post.likes.length }}</h5>
            </span>
            <span>
                <button v-if="accountId.id" class="btn btn-outline-dark me-3">Comment</button>
                <button @click="deletePost(post.id)" v-if="accountId.id == post.creatorId" class="btn btn-outline-dark">Delete</button>
            </span>
        </div>
        <div class="d-flex">
            <p class="me-2">Posted on:</p>
            <p class="me-4">{{ date }}</p>
            <p class="me-2">At:</p>
            <p>{{ time }}</p>
            <p class="">PM</p>
        </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted, watch } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
  import { RouterLink } from 'vue-router'
import { Post } from '../models/Post'
import { postService } from '../services/PostService'
  export default {
    props: {post: {type: Post, required: true}},
    setup(props) {
        let accountIds = computed(()=>AppState.account)
        let postDate = props.post
        let date = postDate.createdAt.toLocaleDateString()
        let hours = postDate.createdAt.toLocaleTimeString()
        let time = hours.slice(0,4)
        async function deletePost(postId){
            await postService.deletePost(postId)
        }
        async function likePost(postId, accountId){
            await postService.likePost(postId, accountId)
        }
      return {
        accountId: computed(()=> AppState.account),
        deletePost,
        likePost,
        date,
        time
      }
    }, components: {RouterLink}
  }
  </script>
  
  <style scoped>
.post-card{
    background-color: white;
    border-radius: 20px;
    padding: 15px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.267);
    outline: thin black solid;
}
.profile-pic{
    height: 50px;
    width: 50px;
}

.img-class{
    height: 350px;
    width: 470px;
}
</style>