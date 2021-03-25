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
  background-image: url(https://cf-images.us-east-1.prod.boltdns.net/v1/static/5615998029001/02d9b717-c65c-483f-9379-0ae668b160e6/dd0ce4e8-7956-4903-9ca3-3a20498614b1/1280x720/match/image.jpg);
  background-size: cover ;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
