<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container-fluid">
    <div class="card p-2">
      <div class="row text-center mt-2 mb-2">
        <h3>Update your profile</h3>
      </div>
      <form @submit.prevent="" action="">
        <div class="row justify-content-center">
          <div class="col-2">
            <span class="d-flex justify-content-center">
              <h4 class="me-2">Name:</h4>
            </span>
            <input v-model="profileUpdate.name"  class="form-control" type="text">
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-3">
            <span class="d-flex justify-content-center">
              <h4>Profile Pic URL:</h4>
            </span>
            <input v-model="profileUpdate.picture"  class="form-control" type="text">
          </div>
          <div class="col-3">
            <span class="d-flex justify-content-center">
              <h4>Cover Pic URL:</h4>
            </span>
            <input v-model="profileUpdate.coverImg" class="form-control" type="text">
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-3">
            <span class="d-flex justify-content-center">
              <h4>GitHub:</h4>
            </span>
            <input v-model="profileUpdate.github"  class="form-control" type="text">
          </div>
          <div class="col-3">
            <span class="d-flex justify-content-center">
              <h4>Linkedin:</h4>
            </span>
            <input v-model="profileUpdate.linkedin" class="form-control" type="text">
          </div>
        </div>
        <div class="row justify-content-center mt-2">
          <div class="col-6 text-center">
            <span class="text-center">
              <h4>Bio</h4>
            </span>
            <textarea name="" id="" cols="60" rows="7"></textarea>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-2 text-center">
            <span>
              <button class="btn btn-outline-dark">Update Profile</button>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    const profileUpdate = ref({
      name: AppState.account.name, 
      github: AppState.activeProfile.github,
      linkedin: AppState.activeProfile.linkedin,
      bio: AppState.activeProfile.bio
    })
    async function updateProfile(){
      
    }
    return {
      account: computed(() => AppState.account),
      profile: computed(()=> AppState.activeProfile),
      profileUpdate
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
