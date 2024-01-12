<template>
  <section class="container-fluid">
    <div class="row">
      <div></div>
      <div class="col-5">
        <div class="post-card mt-4">
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
      </div>
    </div>
  </section>
</template>

<script>
import { postService } from '../services/PostService';
import PostCard from '../components/PostCard.vue';
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    const postData = ref({})
    onMounted(() => {
      getPosts()
    })

    async function getPosts(){
      await postService.getPosts()
    }

    async function postPost(){
      await postService.postPost(postData.value)
    }

    return {
      posts: computed(()=> AppState.posts),
      account: computed(()=> AppState.account),
      postData,
      postPost
    }
  }, components: {PostCard}
}
</script>

<style scoped lang="scss">
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
