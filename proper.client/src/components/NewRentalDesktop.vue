<template>
  <div class="new-rental-desktop">
    <h4 class="border card-title round card-header bg-primary">
      Owner Information
    </h4>
    <div class="card border border-top-0 text-center">
      <form action="submit" class="form-group">
        <div class="row pl-5">
          <div class="col">
            <div class="row">
              Name
            </div>
            <div class="row">
              <input
                id="name"
                required
                placeholder="John Doe"
                type="text"
                v-model="state.newOwner.name"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              Phone Number
            </div>
            <div class="row">
              <input
                class="mr-1"
                id="phoneNum"
                required
                placeholder="(123) 456-7890"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                v-model="state.newOwner.phone"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              Street
            </div>
            <div class="row">
              <input id="street"
                     class="mr-1"
                     required
                     placeholder="404 Not Found St"
                     type="text"
                     v-model="state.ownerAddress.street"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              City
            </div>
            <div class="row">
              <input id="city"
                     class="mr-1"
                     required
                     placeholder="Alqualondë"
                     type="text"
                     v-model="state.ownerAddress.city"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              State
            </div>
            <div class="row">
              <input id="state"
                     class="mr-1"
                     required
                     placeholder="Eldamar"
                     type="text"
                     v-model="state.ownerAddress.state"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              Country
            </div>
            <div class="row">
              <input id="country"
                     class="mr-1"
                     required
                     placeholder="Aman"
                     type="text"
                     v-model="state.ownerAddress.country"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              Postal Code
            </div>
            <div class="row">
              <input id="zip"
                     class="mr-1"
                     pattern="[0-9]{5}"
                     required
                     placeholder="0N341NG"
                     type="text"
                     v-model="state.ownerAddress.zip"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              E-Mail
            </div>
            <div class="row">
              <input
                required
                placeholder="john.doe@test.com"
                type="email"
                name="ownerEmail"
                id="ownerEmail"
                v-model="state.newOwner.email"
              >
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="card">
      <div class="bg-primary card-title card-header">
        <h4>
          Rental Information
        </h4>
      </div>
      <div class="card-body">
        <div class="row pl-4">
          <div class="col">
            <div class="row">
              Street Name
            </div>
            <div class="row">
              <input class="mr-1" required placeholder="Broadway" type="text" v-model="state.address.street">
            </div>
          </div>
          <div class="col">
            <div class="row">
              Apartment Number
            </div>
            <div class="row">
              <input class="mr-1"
                     required
                     pattern="[0-9]{4}"
                     placeholder="#A113"
                     type="text"
                     v-model="state.address.aptNum"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              City
            </div>
            <div class="row">
              <input class="mr-1" required placeholder="New York" type="text" v-model="state.address.city">
            </div>
          </div>
          <div class="col">
            <div class="row">
              Country
            </div>
            <div class="row">
              <input class="mr-1" required placeholder="United States of America" type="text" v-model="state.address.country">
            </div>
          </div>
          <div class="col">
            <div class="row">
              Postal Code
            </div>
            <div class="row">
              <input class="mr-1"
                     required
                     pattern="[0-9]{5}"
                     placeholder="12345"
                     type="text"
                     v-model="state.address.zip"
              >
            </div>
          </div>
          <div class="col">
            <div class="row">
              Unit Rent
            </div>
            <div class="row">
              <input class="mr-1" required placeholder="$1400" type="text" v-model="state.newRental.rent">
            </div>
          </div>
          <div class="col">
            <div class="row">
              Year Built
            </div>
            <div class="row">
              <input class="mr-1" required placeholder="1776" type="text" v-model="state.newRental.yearBuilt">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header bg-primary" id="headingThree">
        <h4 class="mb-0">
          Tenant Info
        </h4>
      </div>
      <div class="card-body">
        <span v-if="!state.showCreateTenant">
          <button @click="state.showCreateTenant = !state.showCreateTenant" class="btn btn-dark mb-1" type="button">
            New Tenant
          </button>
        </span>
        <form @submit.prevent="createTenant(state.newTenant)" v-if="state.showCreateTenant">
          <div class="row">
            <div class="col-2 ml-4">
              <div class="row">
                Tenant Name
              </div>
              <div class="row">
                <input required placeholder="John Doe" type="text" v-model="state.newTenant.name">
              </div>
            </div>
            <div class="col-2">
              <div class="row">
                Tenant Phone Number
              </div>
              <div class="row">
                <input class="mt-1"
                       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                       required
                       placeholder="(123) 456-6789"
                       type="text"
                       v-model="state.newTenant.phoneNum"
                >
              </div>
            </div>
          </div>
          <button type="submit" class="ml-2 btn btn-dark text-primary">
            Add Tenant
          </button>
        </form>
        <div v-if="state.tenants">
          <div v-for="tenant in state.tenants" :key="tenant.id">
            <div class="bg-primary border border-danger block py-1 my-1">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-8">
                    <div class="title">
                      {{ tenant.name }}
                      <hr>
                    </div>
                  </div>
                  <div class="col-1 offset-1">
                    <button type="button" class="delete btn btn-sm btn-dark" @click="removeTenant(tenant)">
                      x
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div>
                      <span class="font-weight-bold">-</span> {{ tenant.phone }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="border-bottom border-dark card-header bg-primary" id="headingTwo">
        <h4 class="mb-0">
          Add a picture?
        </h4>
      </div>
      <div class="card-body">
        <input type="file" id="file" placeholder="Inset file here" @change="upload" accept="image/*" />
      </div>
    </div>
  </div>
  <button @click.prevent="create" type="button" class="btn btn-block btn-dark text-primary">
    Submit Form
  </button>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { rentalsService } from '../services/RentalsService'
import { ownersService } from '../services/OwnersService'
import { tenantsService } from '../services/TenantsService'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
import uploadFile from '../FileUploader'
const Compress = require('@ssmithereens/client-compress')

export default {
  name: 'NewRentalDesktop',
  setup() {
    const router = useRouter()
    const state = reactive({
      showCreateForm: true,
      showCreateTenant: true,
      showWarning: false,
      newTenant: {},
      newOwner: {},
      newRental: {},
      rent: 0,
      yearBuilt: 0,
      address: {},
      ownerAddress: {},
      task: {},
      newTask: {},
      owners: [],
      tenants: [],
      createdRental: false
    })
    onBeforeRouteLeave(async() => {
      if (!state.createdRental) {
        try {
          if (state.tenants) {
            logger.log(state.tenants)
            state.tenants.forEach(async(tenant) => await tenantsService.deleteBeforeRentalCreation(tenant.id))
          }
        } catch (err) {
          logger.error(err)
        }
      }
      state.newRental = {}
      state.address = {}
      state.ownerAddress = {}
      state.tenants = []
      state.newOwner = {}
    })

    return {
      state,
      async createOwner() {
        try {
          state.newOwner.address = state.ownerAddress
          state.newOwner = await ownersService.create(state.newOwner)
          state.owners.push(state.newOwner)
          state.newOwner = {}
          state.ownerAddress = {}
        } catch (error) {
          logger.error(error)
        }
      },
      async createTenant(newTenant) {
        try {
          newTenant.rentalId = state.newRental.id
          newTenant = await tenantsService.create(newTenant)
          state.tenants.push(newTenant)
          state.newTenant = {}
        } catch (error) {
          logger.error(error)
        }
      },
      async create() {
        try {
          state.newOwner.address = state.ownerAddress

          state.newOwner = await ownersService.create(state.newOwner)
          state.newRental.tenants = state.tenants
          state.newRental.address = state.address
          state.newRental.ownerId = state.newOwner.id

          state.newRental = await rentalsService.create(state.newRental)
          state.createdRental = true
          document.getElementById('file').value = ''
          router.push({ name: 'RentalDetailsPage', params: { id: state.newRental.id } })
        } catch (error) {
          logger.error(error)
        }
      },
      async removeTenant(tenant) {
        try {
          await tenantsService.delete(tenant.id)
          state.tenants.splice(state.tenants.indexOf(tenant), 1)
        } catch (error) {
          logger.error(error)
        }
      },
      async upload() {
        const files = event.target.files
        const fileArray = Array.from(files)
        logger.log(fileArray)
        const options = {
          targetSize: 0.2,
          quality: 0.75,
          maxWidth: 800,
          maxHeight: 600
        }

        const compress = new Compress(options)
        compress.compress(fileArray).then(async(conversions) => {
          const { photo, info } = conversions[0]
          logger.log(info)
          const res = await uploadFile(photo.data, 'images/rentals/' + this.createId(), {
            rentalId: state.newRental.id
          })
          state.newRental.picture = res.url
        })
      },
      createId() {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < 30; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.reverseuno{
  transform: rotate(180deg)
}
</style>
