<template>
    <div class="row justify-content-center">
        <form @submit.prevent="searchPost()" class="col-4 mt-2 text-center  bg-light p-3 rounded-3" action="">
                <h5>Search Posts</h5>
                <span class="d-flex justify-content-center mb-1">
                    <h6 class="me-2">Filter</h6>
                    <select v-model="filter" required name="" id="">
                        <option value="Post">Post</option>
                        <option value="Profile">Profile</option>
                    </select>
                </span>
                <span class="d-flex">
                    <input v-model="searched" required maxlength="60" class="form-control" type="text">
                    <button class="ms-1 btn btn-outline-dark">Search</button>
                </span>
        </form>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { Post } from '../models/Post'
import {postService} from '../services/PostService.js'
import {profileService} from '../services/ProfileService'
  export default {
    setup() {
        const searched = ref('')
        const filter = ref('')
        async function searchPost(){
            if(filter.value == 'Post'){
                await postService.searchPost(searched.value)
            }else if(filter.value == 'Profile'){
                await profileService.searchProfilePost(searched.value)
            }
        }
      return {
        searchPost,
        searched,
        filter
      }
    }
  }
  </script>
  
  <style scoped></style>