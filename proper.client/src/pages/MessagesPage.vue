<template>
  <div class="container-fluid messages-page">
    <div class="row mt-3 text-white">
      Messages Property Management
    </div>
    <div class="row mt-5">
      <div class="col-12 text-right">
        <button type="button" class="btn btn-dark text-sizing " @click="(state.showNewMessage = !state.showNewMessage), (state.showCurrentMessage = false)">
          New
        </button>
      </div>
    </div>
    <div v-if="state.showCurrentMessage">
      <div class="mt-4">
        <div class="row">
          <div class="col-12 text-center text-light" v-if="state.to">
            <div>
              Conversation With:
            </div>
            <img class="image-size mt-3" :src="state.to.picture" alt="avatar">
            {{ state.to.name }}
          </div>
        </div>
        <div class="messaging-container container-fluid border border-dark rounded shadow mt-3 bg-light">
          <div v-for="message in state.messages[state.to._id]" :key="message._id">
            <div class="row" v-if="message.creatorId === state.account.id">
              <div class="col-12 text-right mt-2">
                <span class="text-sizing">
                  {{ message.body }}
                  <img class="image-size" :src="state.account.picture" alt="avatar">
                </span>
                <div class="row mb-2">
                  <div class="col-12 text-sizing">
                    {{ new Date(message.createdAt).toLocaleTimeString() }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row bg-secondary" v-else>
              <div class="col-8 mt-3">
                <span class="text-sizing">
                  <img class="image-size" :src="state.account.picture" alt="avatar">
                  {{ message.body }}
                  <div class="row">
                    <div class="col-12 text-sizing mt-1 mb-1">
                      {{ new Date(message.createdAt).toLocaleTimeString() }}</div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <form class="input-group" @submit.prevent="sendMessage">
            <textarea id="message" class="form-control" aria-label="With textarea" v-model="state.message.body"></textarea>
            <div class="input-group-append">
              <button class="btn btn-primary text-dark" type="submit">
                Send
              </button>
            </div>
          </form>
          <!-- <form @submit.prevent="sendMessage" class="input-group">
            <div class="form-row">
              <div class="col-lg-8 col">
                <textarea class="text-sizing"
                          id="message"
                          v-model="state.message.body"
                          cols="150"
                          rows="1"
                          aria-hidden="true"
                >
                 </textarea>
                <span class="input-group-btn">
                  <button type="submit" class="btn btn-primary text-dark mt-2 mb-3 text-sizing input-group-append">
                    Send
                  </button>
                </span>
              </div>
            </div>
          </form> -->
        </div>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <div v-if="state.showNewMessage" class="mt-5">
      <div v-for="account in state.accounts" :key="account._id">
        <div class="m-2" v-if="account._id != state.account._id">
          <button type="button" class="btn btn-primary text-dark btn-block" @click="openMessage(account.email)">
            {{ account.email }}
          </button>
        </div>
        <div v-else>
          <!-- <SkeletonLoader /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { messagesService } from '../services/MessagesService'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import $ from 'jquery'

export default {
  name: 'MessagesPage',
  setup() {
    const state = reactive({
      showCurrentMessage: false,
      showNewMessage: false,
      account: computed(() => AppState.account),
      accounts: computed(() => AppState.accounts),
      messages: computed(() => AppState.messages),
      to: {},
      message: { body: '' }
    })
    onMounted(async() => {
      await accountService.getAll()
      await messagesService.getByUserId(state.account._id)
    })
    return {
      state,
      async openMessage(toEmail) {
        state.to = {}
        state.showNewMessage = false
        state.showCurrentMessage = true
        state.to = await accountService.getByEmail(toEmail)
        setTimeout(() => {
          document.getElementById('message').focus()
        }, 1)
        await messagesService.getByUserIdAndToId(state.account._id, state.to._id)
        if (AppState.messages[state.account._id].length !== AppState.readMessages[state.account._id]) {
          AppState.readMessages[state.account._id] = AppState.messages[state.account._id]
          AppState.newMessageUsers.splice(AppState.newMessageUsers.indexOf(state.to), 1)
          if (AppState.newMessageUsers.length < 1) {
            document.getElementById('notification').classList.add('d-none')
            document.getElementById('notification').classList.remove('d-sm-block')
          }
        }
      },
      async sendMessage() {
        await messagesService.create(state.message, state.to._id)
        state.message = {}
        console.log($('.messaging-container'))
        $('.messaging-container').scrollTop($('.messaging-container')[0].scrollHeight)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
  .messaging-container {
    border: 2px solid;
    height: 16.2rem;
    resize: none;
    overflow: auto;
  }

  .image-size{
    height: 2.5rem;
    width: 2.5rem;
  }
  .container{
    height: 70%;
    width: 100%;
    box-shadow: .2rem .2rem .2rem ;
  }
  .shadow{
    box-shadow: .2rem .2rem .2rem ;
  }
  .text-sizing{
      font-size: 1rem;
    }
    .messages-page {
  background: linear-gradient(-45deg, #8f8389, #899985);
  background-size: 100% 100%;
  animation: gradient 15s ease infinite;
}
  // @media screen and (max-width: 992px) {

  // }
</style>
