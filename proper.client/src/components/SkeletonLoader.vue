<template>
  <div class="col">
    <div class="boxes">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <!-- dribbble -->
  </div>
  <!-- <div class="col rental-skeleton mt-3">
    <h1 class="card-title">
      Loading...
    </h1>
  </div> -->
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import router from '../router'
import { rentalsService } from '../services/RentalsService'
export default {
  name: 'SkeletonLoader',
  setup() {
    const state = reactive({
      rentals: computed(() => AppState.rentals)
    })
    onMounted(() => {
      setTimeout(async() => {
        if (state.rentals.length === 0) {
          router.push({ name: 'NewRentalPage' })
        }
        await rentalsService.getAll()
      }, 3000)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
$color: #66425dcc;
$colorRight: darken(#66425dcc, 15%);
$colorLeft: darken(#66425dcc, 5%);
$shadow: #252931c5;

.boxes {
    --size: 32px;
    --duration: 800ms;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 3);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    margin-top: calc(var(--size) * 1.5 * -1);
    transform: translateY(20rem) translateX(-3rem) rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
    .box {
        width: var(--size);
        height: var(--size);
        top: 50%;
        left: 50%;
        position: absolute;
        transform-style: preserve-3d;
        &:nth-child(1) {
            transform: translate(100%, 0);
            animation: box1 var(--duration) linear infinite;
        }
        &:nth-child(2) {
            transform: translate(0, 100%);
            animation: box2 var(--duration) linear infinite;
        }
        &:nth-child(3) {
            transform: translate(100%, 100%);
            animation: box3 var(--duration) linear infinite;
        }
        &:nth-child(4) {
            transform: translate(200%, 0);
            animation: box4 var(--duration) linear infinite;
        }
        & > div {
            --background: #{$color};
            --top: auto;
            --left: auto;
            --translateZ: calc(var(--size) / 2);
            --rotateY: 0deg;
            --rotateX: 0deg;
            position: absolute;
            width: 100%;
            height: 100%;
            background: var(--background);
            top: var(--top);
            right: var(--right);
            bottom: var(--bottom);
            left: var(--left);
            transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
            &:nth-child(1) {
                --top: 0;
                --left: 0;
            }
            &:nth-child(2) {
                --background: #{$colorRight};
                --right: 0;
                --rotateY: 90deg;
            }
            &:nth-child(3) {
                --background: #{$colorLeft};
                --rotateX: -90deg;
            }
            &:nth-child(4) {
                --background: #{$shadow};
                --top: 0;
                --left: 0;
                --translateZ: calc(var(--size) * 3 * -1);
            }
        }
    }
}

@keyframes box1 {
    0%,
    50% {
        transform: translate(100%, 0);
    }
    100% {
        transform: translate(200%, 0);
    }
}

@keyframes box2 {
    0%{
        transform: translate(0, 100%);
    }
    50% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(100%, 0);
    }
}

@keyframes box3 {
    0%,
    50% {
        transform: translate(100%, 100%);
    }
    100% {
        transform: translate(0, 100%);
    }
}

@keyframes box4 {
    0%{
        transform: translate(200%, 0);
    }
    50% {
        transform: translate(200%, 100%);
    }
    100% {
        transform: translate(100%, 100%);
    }
}

html {
    -webkit-font-smoothing: antialiased;
}

* {
    box-sizing: border-box;
    &:before,
    &:after {
        box-sizing: border-box;
    }
}

// Center & dribbble
body {
    min-height: 100vh;
    font-family: Roboto, Arial;
    color: #ADAFB6;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F9FBFF;
    .dribbble {
        position: fixed;
        display: block;
        right: 20px;
        bottom: 20px;
        img {
            display: block;
            height: 28px;
        }
    }
}
</style>
