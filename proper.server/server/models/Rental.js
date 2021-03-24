import { Schema } from 'mongoose'

const Rental = new Schema(
  {
    // address.street
    // address.apt
    // address.city
    // address.state
    // address.zip
    // address.country
    address: { type: {}, required: true },
    rent: { type: Number, required: true },
    yearBuilt: { type: String, required: true },
    tenants: [{ type: String, ref: 'Tenant' }],
    maintenance: [],
    owner: { type: {}, required: true }
  }
)

export default Rental
