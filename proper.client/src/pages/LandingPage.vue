<template>
  <div class="landing-page flex-grow-1 d-flex flex-column align-items-center justify-content-center">
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
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
</style>
