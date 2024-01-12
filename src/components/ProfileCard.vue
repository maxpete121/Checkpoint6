<template>
    <div class="post-card">
        <div class="d-flex align-items-center">
            <h3>{{ profile.name }}</h3>
            <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
                <img class="profile-pic rounded-circle" :src="profile.picture" alt="">
            </router-link>
        </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { Profile } from '../models/Profile'
import { RouterLink } from 'vue-router'
  export default {
    props: {profile: {type: Profile, required: true}},
    setup() {
      return {

      }
    }, components: {RouterLink}
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
  