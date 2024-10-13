import mongoose from 'mongoose'

const carListingSchema = new mongoose.Schema({
  carModel: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
  images: {
    type: [String], 
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
},{
  timestamps: true,
})

export default mongoose.models.CarListing || mongoose.model('CarListing', carListingSchema)
