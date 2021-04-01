<template>
  <div class="container-fluid">
<<<<<<< HEAD
    <div class="row">
      <div style="height: 15vh" class="text-white">
        Property Management Software, manage rentals
=======
    <div class="row mt-5"></div>
    <div class="row mt-5">
      <div class="col-3">
        <button type="button" class="btn btn-primary" @click="(state.showInbox = true), (state.showNewMessage = false)">
          Inbox
        </button>
>>>>>>> da014f23eaea6bc27b7a55d899ba78d6397766d5
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-right">
        <button type="button" class="btn btn-primary text-sizing " @click="(state.showNewMessage = true), (state.showInbox = false)">
          New
        </button>
      </div>
    </div>
    <div v-if="state.showInbox">
      <div class="mt-5">
        <div class="row">
          <div class="col-12 text-center" v-if="state.to">
            <div>
              Conversation With:
            </div>
            <img class="image-size" :src="state.to.picture" alt="avatar">
            {{ state.to.name }}
          </div>
        </div>
        <div class="container-fluid border border-dark shadow">
          <div v-for="message in state.messages[state.to._id]" :key="message._id">
            <div class="row" v-if="message.creatorId === state.account.id">
              <div class="col-12 text-right mt-3" v-if="message.creatorId === state.account.id">
                <span class="text-sizing">{{ message.body }}</span>
                <div class="row">
                  <div class="col-12 text-sizing">
                    {{ new Date(message.createdAt).toLocaleTimeString() }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="col-8 mt-3">
                <span class="text-sizing">
                  {{ message.body }}
                  <div class="row">
                    <div class="col-12 text-sizing">
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
          <form @submit.prevent="sendMessage">
            <div class="form-row">
              <div class="col-2">
                <button type="submit" class="btn btn-primary mb-3 text-sizing">
                  Send
                </button>
              </div>
              <div class="col-lg-8 col-sm">
                <textarea class="text-sizing"
                          id="message"
                          v-model="state.message.body"
                          cols="20"
                          rows="2"
                          aria-hidden="true"
                >
                 </textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="state.showNewMessage" class="mt-5">
    Users:
    <div v-for="account in state.accounts" :key="account._id">
      <div v-if="account._id != state.account._id">
        <button type="button" class="btn btn-primary" @click="openMessage(account.email)">
          {{ account.email }}
        </button>
      </div>
      <div v-else>
        <SkeletonLoader />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { messagesService } from '../services/MessagesService'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
export default {
  name: 'MessagesPage',
  setup() {
    const state = reactive({
      showInbox: false,
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
        state.showInbox = true
        state.to = await accountService.getByEmail(toEmail)
        setTimeout(() => {
          document.getElementById('message').focus()
        }, 1)
        logger.log('to Id: ', AppState.newMessageUsers)
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
      }

    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  border: 2px solid;
  width: 95%;
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
@media screen and (max-width: 992px) {
.text-sizing{
  font-size: 1.1rem;
}
}
@media screen and (min-width: 992px) {
.text-sizing{
  font-size: 3.5rem;
}
}
</style>
