import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  accounts: [],
  messages: {},
  readMessages: {},
  newMessageUsers: [],
  rentals: [],
  rental: {},
  notes: [],
  note: {},
  tasks: [],
  task: {},
  owners: [],
  owner: {},
  tenants: [],
  tenant: {}
})
