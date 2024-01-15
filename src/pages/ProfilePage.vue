<template>

        <section class="row justify-content-between mt-2">
            <div v-for="ad in ads" class="col-5 d-flex">
          <PluginCardTwo :ad="ad"/>
        </div>
        </section>

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
                <h4 class="me-2">Graduated:</h4>
                <h4 v-if="profile.graduated == true">✅</h4>
                <h4 v-else>❌</h4>
            </span>
            <span class="d-flex">
                <h4 class="me-2">Class:</h4>
                <h4 class="text-success">{{ profile.class }}</h4>
            </span>
            <span class="d-flex">
                <h4 class="me-2">GitHub:</h4>
                <h4 class="text-success">{{ profile.github }}</h4>
            </span>
            <span class="d-flex">
                <h4 class="me-2">Linkedin:</h4>
                <h4 class="text-success">{{ profile.linkedin }}</h4>
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
    <section class="row p-3">
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
import { adsService } from '../services/AdsService';
import PluginCardTwo from '../components/PluginCardTwo.vue'
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
            await adsService.getAds()
            await profileService.getPostsById(profileId)
        }

      return {
        profile: computed(()=> AppState.activeProfile),
        posts: computed(()=> AppState.profilePosts),
        ads: computed(()=> AppState.ads),
      }
    }, components: {PostCard, PluginCardTwo}
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