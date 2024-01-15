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
    <section class="d-flex justify-content-center mt-2">
        <div v-for="ad in ads" class="col-2 d-flex ms-2">
      <PluginCardTwo :ad="ad"/>
    </div>
    </section>
    
    <section class="row justify-content-center mt-3">
        <div class="col-3 text-center">
            <h3>Recent Posts</h3>
        </div>
    </section>
    <section v-if="totalPage > 1" class="row justify-content-center">
        <div class="col-4 justify-content-center mt-3 d-flex page-card pt-2 pb-1">
            <span>
              <button v-if="page > 1" @click="pageChangeDown(profile.id)" class="btn btn-outline-dark shadow">
                <i class="mdi mdi-arrow-left"></i>
                Newer Posts
              </button>
              <button v-if="page == 1" disabled class="btn btn-outline-dark shadow">
                <i class="mdi mdi-arrow-left"></i>
                Newer Posts
              </button>
            </span>
            <span class="d-flex ms-3 me-3">
              <h3>Page:</h3>
              <h3>{{ page }}</h3>
            </span>
            <span>
              <button @click="pageChangeUp(profile.id)" class="btn btn-outline-dark shadow">
                Older Posts
                <i class="mdi mdi-arrow-right"></i>
              </button>
            </span>
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
import PluginCardTwo from '../components/PluginCardTwo.vue';
import { postService } from '../services/PostService';
  export default {
    setup() {
        const page = computed(()=> AppState.currentPage)
        const post = computed(()=> AppState.posts)
        const account = computed(()=> AppState.account)
        const totalPage = computed(()=> AppState.totalPages)
        onMounted(()=>{
            AppState.currentPage = 1
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
            await profileService.getPostsById(profileId, page.value)
        }

        async function pageChangeUp(profileId){
      await AppState.currentPage++
      await getPostsById(profileId)
      if(account.value.id){
        await postService.checkPosts(AppState.account.id, post.value)
      }
    }

    async function pageChangeDown(profileId){
      if(AppState.currentPage > 1){
        await AppState.currentPage--
        await getPostsById(profileId)
        if(account.value.id){
        await postService.checkPosts(AppState.account.id, post.value)
      }
      }
    }

      return {
        page,
        profile: computed(()=> AppState.activeProfile),
        posts: computed(()=> AppState.profilePosts),
        ads: computed(()=> AppState.ads),
        pageChangeUp,
        pageChangeDown,
        totalPage
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