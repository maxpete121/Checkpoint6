<template>
    <section class="row justify-content-center">
        <div class="col-4 text-center m-3">
            <span>
                <img class="img-fluid profile-pic rounded-circle" :src="profile.picture" alt="">
            </span>
            <h2 class="mt-2">{{ profile.name }}</h2>
        </div>
    </section>
    <section class="row justify-content-center">
        <div v-if="profile.github" class="col-5 card p-2">
            <span class="d-flex">
                <h4 class="me-2">Class:</h4>
                <h4 class="text-success">{{ profile.class }}</h4>
            </span>
            <span class="d-flex">
                <h4 class="me-2">GitHub:</h4>
                <h4 class="text-success">{{ profile.github }}</h4>
            </span>
            <span class="mt-4">
                <h4>Bio:</h4>
                <p>{{ profile.bio }}</p>
            </span>
        </div>
        <div class="col-4">
            <img class="cover-img rounded-2" :src="profile.coverImg" alt="">
        </div>
  
    </section>
    <section class="row justify-content-center mt-3">
        <div class="col-3 text-center">
            <h3>Recent Posts</h3>
        </div>
    </section>
    <section class="row">
        <div class="mt-4 col-4" v-for="post in posts">
          <PostCard :post="post"/>
        </div>
    </section>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { AppState } from '../AppState';
  import {profileService} from '../services/ProfileService'
  import { useRoute } from 'vue-router';
  import PostCard from '../components/PostCard.vue';
  export default {
    setup() {
        onMounted(()=>{
            getProfileById()
        })
        const route = useRoute();
        async function getProfileById(){
            let profileId = route.params.profileId
            await profileService.getProfileById(profileId)
            getPostsById(profileId)
        }

        async function getPostsById(profileId){
            await profileService.getPostsById(profileId)
        }
      return {
        profile: computed(()=> AppState.activeProfile),
        posts: computed(()=> AppState.profilePosts)
      }
    }, components: {PostCard}
  }
  </script>
  
  <style scoped>
  .profile-pic{
    height: 100px;
    width: 100px;
  }
  .cover-img{
    max-height: 450px;
    max-width: 550px;
  }
  </style>