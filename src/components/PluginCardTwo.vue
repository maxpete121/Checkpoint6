<template>
    <div class="card text-center p-1">
      <img class="img-fluid rounded-2" :src="ad.square" alt="">
      <h4>{{ ad.title }}</h4>
      <a :href="ad.linkURL">Great Deals</a>
    </div>
  </template>
    
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
  import { Ads } from '../models/Ads'
  export default {
    props: { ad: { type: Ads, required: true } },
    setup() {
      let ads = computed(() => AppState.ads)
      return {
      }
    }
  }
  </script>
    
  <style scoped>

  </style>