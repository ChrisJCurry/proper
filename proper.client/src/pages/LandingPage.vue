<template>
  <div class="landing-page flex-grow-1" v-if="!state.account.name">
    <button class="loginBtn btn btn-dark border border-info btn-lg btn-block" @click="login">
      Login
    </button>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'

import { AuthService } from '../services/AuthService'

export default {
  name: 'LandingPage',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      async login() {
        AuthService.loginWithPopup()
      }

    }
  }
}
</script>

<style scoped lang="scss">
.landing-page{
  text-align: center;
  background-image: url('../assets/img/boiseDowntown.jpg');
  background-size: cover ;
  user-select: none ;
  > img{
    height: 200px;
    width: 200px;
  }
}
.loginBtn {
  position: absolute;
  bottom: 75px;
}
</style>
