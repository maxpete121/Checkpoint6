<template>
    <div class="post-card">
        <div class="d-flex align-items-center mb-2">
            <h4 class="me-2">Posted By:</h4>
            <h4 class="me-3">{{ post.creator.name }}</h4>
            <img class="rounded-circle profile-pic" :src="post.creator.picture" alt="">
        </div>
        <img class="img-fluid rounded-2" :src="post.imgUrl" alt="">
        <div class="mt-1">
            <h6>{{ post.body }}</h6>
        </div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { Post } from '../models/Post'
  export default {
    props: {post: {type: Post, required: true}},
    setup() {

      return {

      }
    }
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
</style>