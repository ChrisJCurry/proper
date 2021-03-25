<template>
  <div class="container-fluid">
      <div class="row">
          <img class="apt-pic-size" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.homestratosphere.com%2Fstudio-apartment-interior-design%2F&psig=AOvVaw0QM1ko3lwm2EnbzcrHa8Wr&ust=1616772513059000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODAuYzhy-8CFQAAAAAdAAAAABAJ" alt="">
      </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import  {rentalService} from '../services/RentalService'
export default {
    name: 'Rental'
    props: {
        rental: {type: Object, required: true }
    },
    setup(props) {
        const state = reactive({
            rental: computed(() => AppState.rental)
        }),


    }
}
</script>

<style scoped lang="scss">

.apt-pic-size{
    height: 100px;
    width: 100px;
    border-radius: 4px;
    padding: 3px  
}

.card:hover{
    @keyframes rental-card{
       0% {transform: scale(1.0, 1.0);}
       100% {transform: scale(1.1, 1.1);}
    }
}

.card {
    width: 200px;
    height: 300px;
    background-color: ;
}

</style>