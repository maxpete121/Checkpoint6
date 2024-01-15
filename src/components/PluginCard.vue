<template>
  <div class="col-6 card text-center justify-content-center">
    <img :src="adOne.tall" alt="">
    <h4>{{ adOne.title }}</h4>
    <a :href="adOne.linkURL">Great Deals</a>
  </div>


  <div class="col-6 card text-center justify-content-center mt-2">
    <img :src="adTwo.tall" alt="">
    <h4>{{ adTwo.title }}</h4>
    <span>
      <a :href="adTwo.linkURL">Great Deals</a>
    </span>
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
    let adVal = ads.value
    let adOne = adVal[0]
    let adTwo = adVal[1]
    return {
      adOne,
      adTwo
    }
  }
}
</script>
  
<style scoped>
.ad {
  position: absolute;
}
</style>