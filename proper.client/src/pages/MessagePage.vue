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
          <span class="font-weight-bold">{{ message.creator.name }}</span>: {{ message.body }} at {{ new Date(message.createdAt).toLocaleTimeString() }}
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
export default {
  name: 'MessagePage',
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
        await messagesService.getByUserIdAndToId(state.account._id, state.to._id)
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
