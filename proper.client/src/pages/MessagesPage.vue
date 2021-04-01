<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <button type="button" class="btn btn-primary" @click="(state.showInbox = true), (state.showNewMessage = false)">
          Inbox
        </button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-primary" @click="(state.showNewMessage = true), (state.showInbox = false)">
          New Message
        </button>
      </div>
    </div>
    <div v-if="state.showInbox">
      <div class="mt-5">
        <div class="row">
          <div class="col-12" v-if="state.to">
            <img :src="state.to.picture" alt="">
            {{ state.to.name }}
          </div>
        </div>
        <div v-for="message in state.messages[state.to._id]" :key="message._id">
          <div class="row">
            <div class="col-8">
              <div v-if="message.creatorId === state.account.id">
                <span class="font-weight-bold">You</span>: {{ message.body }} at {{ new Date(message.createdAt).toLocaleTimeString() }}
              </div>
              <div v-else>
                <span class="font-weight-bold">{{ message.creator.name }}</span>: {{ message.body }} at {{ new Date(message.createdAt).toLocaleTimeString() }}
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col">
            <form @submit.prevent="sendMessage">
              <div class="form-row">
                <div class="col-10">
                  <textarea id="message" v-model="state.message.body" rows="5"></textarea>
                </div>
                <div class="col-2">
                  <button type="submit" class="btn btn-primary ml-4">
                    Send
                  </button>
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
      </div>
    </div>
    <div v-else>
      <SkeletonLoader />
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
  width: 100%;
  overflow: hidden;
  resize: none;
}

</style>
