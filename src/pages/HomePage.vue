<template>
  <section class="container-fluid section-main">
    <div v-for="ad in ads" class="ad">
      <PluginCard :ad="ad"/>
    </div>
      <SearchBar v-if="accountVal.id"/>
    <div class="row justify-content-center">
      <div class="col-4 justify-content-center mt-3 d-flex page-card pt-2 pb-1">
        <span>
          <button @click="pageChangeDown()" class="btn btn-outline-dark shadow">
            <i class="mdi mdi-arrow-left"></i>
            Newer Posts
          </button>
        </span>
        <span class="d-flex ms-3 me-3">
          <h3 class="me-2">Page:</h3>
          <h3 class="">{{ page }}</h3>
          <h3>/</h3>
          <h3>{{ totalPage }}</h3>
        </span>
        <span>
          <button @click="pageChangeUp()" class="btn btn-outline-dark shadow">
            Older Posts
            <i class="mdi mdi-arrow-right"></i>
          </button>
        </span>
      </div>
    </div>
    <div class="row justify-content-center">
      <div></div>
      <div class="col-5">
        <div v-if="accountVal.id" class="post-card mt-4">
          <span class="d-flex align-items-center mb-2 justify-content-center">
            <h3>{{ accountVal.name }}</h3>
            <img class="profile-pic rounded-circle ms-2" :src="accountVal.picture" alt="">
          </span>
          <span class="text-center">
            <h5>Make a new Post!</h5>
          </span>
          <form @submit.prevent="postPost()" class="text-center" action="">
            <div class="d-flex flex-column">
              <span class="mb-2">
                <label class="me-2" for="">Image Link</label>
                <input v-model="postData.imgUrl" type="text">
              </span>
              <span>
                <textarea v-model="postData.body" required cols="40" rows="5" name="" id=""></textarea>
              </span>
            </div>
            <button>Post</button>
          </form>
        </div>
        <div class="mt-4" v-for="post in posts">
          <PostCard :post="post"/>
        </div>
        <div v-if="profiles != []" v-for="profile in profiles">
          <ProfileCard :profile="profile"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { postService } from '../services/PostService';
import PostCard from '../components/PostCard.vue';
import SearchBar from '../components/SearchBar.vue';
import ProfileCard from '../components/ProfileCard.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { AppState } from '../AppState';
import { adsService } from '../services/AdsService';
import PluginCard from '../components/PluginCard.vue';
export default {
  setup() {
    const postData = ref({})
    const page = computed(()=> AppState.currentPage)
    const post = computed(()=> AppState.posts)
    const account = computed(()=> AppState.account)
    onMounted(() => {
      clearActive()
      getPosts()
    })

    function clearActive(){
      AppState.activeProfile = {}
      AppState.profilePosts = []
    }
    async function pageChangeUp(){
      await AppState.currentPage++
      await getPosts()
      if(account.value.id){
        await postService.checkPosts(AppState.account.id, post.value)
      }
    }

    async function pageChangeDown(){
      if(AppState.currentPage > 1){
        await AppState.currentPage--
        await getPosts()
        if(account.value.id){
        await postService.checkPosts(AppState.account.id, post.value)
      }
      }
    }

    async function getPosts(){
      await postService.getPosts(page.value)
      await adsService.getAds()
    }

    async function postPost(){
      await postService.postPost(postData.value)
      await postService.checkPosts(AppState.account.id, post.value)
    }



    return {
      posts: computed(()=> AppState.posts),
      accountVal: computed(()=> AppState.account),
      profiles: computed(()=> AppState.searchedProfile),
      ads: computed(()=> AppState.ads),
      totalPage: computed(()=> AppState.totalPages),
      postData,
      postPost,
      page,
      pageChangeUp,
      pageChangeDown,
    }
  }, components: {PostCard, SearchBar, ProfileCard, PluginCard}
}
</script>

<style scoped lang="scss">

.section-main{
  background-image: linear-gradient(to bottom right, black, white);
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.post-card{
    background-color: rgba(255, 255, 255, 0.945);
    color: black;
    border-radius: 20px;
    padding: 15px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.267);
    outline: thin black 9px;
}
.post-card:hover{
  background-color: rgb(255, 255, 255);
    color: black;
    border-radius: 20px;
    padding: 15px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.267);
    outline: thin black 9px;
    transform: scale(1.02);
}
.profile-pic{
    height: 50px;
    width: 50px;
}
.page-card{
  background-color: white;
  border-radius: 15px;
}

.ad{
  position: absolute;
  margin-top: 30px;
}
</style>
