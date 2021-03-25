<template>
  <div class="landing-page flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <NewRentalAccordion />
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
  background-image: url();
  background-size: cover ;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
