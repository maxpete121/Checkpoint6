<template>
  <section class="container-fluid">
    <div class="row">
      <div v-for="post in posts" class="col-4">
        <PostCard/>
      </div>
    </div>
  </section>
</template>

<script>
import { postService } from '../services/PostService';
import PostCard from '../components/PostCard.vue';
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    onMounted(() => {

    })

    async function getPosts(){
      await postService.getPosts()
    }

    return {
      posts: computed(()=> AppState.posts)
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
</style>
