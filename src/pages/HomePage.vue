<template>
  <section class="container-fluid section-main">
      <SearchBar v-if="account.id"/>
    <div class="row justify-content-center">
      <div class="col-4 justify-content-center mt-3 d-flex page-card pt-2 pb-1">
        <span>
          <button @click="pageChangeDown()" class="btn btn-outline-dark">
            <i class="mdi mdi-arrow-left"></i>
            Previous Page
          </button>
        </span>
        <span class="d-flex ms-3 me-3">
          <h3>Page:</h3>
          <h3>{{ page }}</h3>
        </span>
        <span>
          <button @click="pageChangeUp()" class="btn btn-outline-dark">
            Next Page
            <i class="mdi mdi-arrow-right"></i>
          </button>
        </span>
      </div>
    </div>
    <div class="row justify-content-center">
      <div></div>
      <div class="col-5">
        <div v-if="account.id" class="post-card mt-4">
          <span class="d-flex align-items-center mb-2 justify-content-center">
            <h3>{{ account.name }}</h3>
            <img class="profile-pic rounded-circle ms-2" :src="account.picture" alt="">
          </span>
          <span class="text-center">
            <h5>Make a new Post!</h5>
          </span>
          <form @submit.prevent="postPost()" class="text-center" action="">
            <div class="d-flex flex-column">
              <span class="mb-2">
                <label for="">Image Link</label>
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
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    const postData = ref({})
    const page = computed(()=> AppState.currentPage)
    onMounted(() => {
      getPosts()
      clearActive()
    })

    function clearActive(){
      AppState.activeProfile = {}
      AppState.profilePosts = []
    }
    async function pageChangeUp(){
      await AppState.currentPage++
      getPosts()
    }

    async function pageChangeDown(){
      if(AppState.currentPage > 1){
        await AppState.currentPage--
        getPosts()
      }
    }

    async function getPosts(){
      await postService.getPosts(page.value)
    }

    async function postPost(){
      await postService.postPost(postData.value)
    }

    return {
      posts: computed(()=> AppState.posts),
      account: computed(()=> AppState.account),
      profiles: computed(()=> AppState.searchedProfile),
      postData,
      postPost,
      page,
      pageChangeUp,
      pageChangeDown,
    }
  }, components: {PostCard, SearchBar, ProfileCard}
}
</script>

<style scoped lang="scss">

.section-main{
  background-image: url(https://static.vecteezy.com/system/resources/previews/008/791/710/original/geometric-seamless-patterns-background-design-abstract-line-art-pattern-for-wallpaper-free-vector.jpg);
  background-position: center;
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
    background-color: white;
    color: black;
    border-radius: 20px;
    padding: 15px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.267);
    outline: thin black solid;
}
.profile-pic{
    height: 50px;
    width: 50px;
}
.page-card{
  background-color: white;
  border-radius: 15px;
}
</style>
