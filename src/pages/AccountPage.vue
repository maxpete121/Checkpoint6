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
      <form @submit.prevent="updateProfile()" action="">
        <div class="row justify-content-center">
          <div class="col-2">
            <span class="d-flex justify-content-center">
              <h4>Class:</h4>
            </span>
            <input v-model="profileUpdate.class" class="form-control" maxlength="20" type="text">
          </div>
          <div class="col-2">
            <span class="text-center">
              <h4>Graduated:</h4>
            </span>
            <select required class="form-control" v-model="profileUpdate.graduated" name="" id="">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-2">
            <span class="d-flex justify-content-center">
              <h4 class="me-2">Name:</h4>
            </span>
            <input v-model="profileUpdate.name" required  class="form-control" type="text">
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
            <textarea v-model="profileUpdate.bio" name="" id="" cols="60" rows="7"></textarea>
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
      <section class="row justify-content-center mt-2">
            <div v-for="ad in ads" class="col-2 d-flex">
          <PluginCardTwo :ad="ad"/>
        </div>
        </section>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { profileService } from '../services/ProfileService';
import PluginCardTwo from '../components/PluginCardTwo.vue';
import { adsService } from '../services/AdsService';
export default {
  setup() {
    onMounted(()=>{
      adsService.getAds()
    })
    const profileUpdate = ref({
      name: AppState.account.name, 
      github: AppState.activeProfile.github,
      linkedin: AppState.activeProfile.linkedin,
      bio: AppState.activeProfile.bio
    })
    async function updateProfile(){
      await profileService.updateProfile(profileUpdate.value)
    }
    return {
      account: computed(() => AppState.account),
      profile: computed(()=> AppState.activeProfile),
      ads: computed(()=> AppState.ads),
      profileUpdate,
      updateProfile
    }
  }, components: {PluginCardTwo}
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
