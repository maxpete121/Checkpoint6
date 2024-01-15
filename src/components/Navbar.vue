<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3">
    <router-link @click="checkPosts()" class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h2><i class="mdi mdi-desktop-tower-monitor me-1 text-success"></i>Dev Space</h2>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>

        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div>
        <button class="btn text-light" @click="toggleTheme"><i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i></button>
      </div>
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AppState } from '../AppState';
import { postService } from '../services/PostService';
export default {
  setup() {
    const allPosts = computed(()=> AppState.posts)
    const theme = ref(loadState('theme') || 'light')
    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    })
    async function checkPosts(){
      setTimeout(function(){postService.checkPosts(AppState.account.id, allPosts.value)}, 500)
      await postService.checkPosts(AppState.account.id, allPosts.value)
    }
    return {
      theme,
      checkPosts,
      toggleTheme() {
        theme.value = theme.value == 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        saveState('theme', theme.value)
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
