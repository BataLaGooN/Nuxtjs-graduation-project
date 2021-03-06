import mongoose from 'mongoose'
const Schema = mongoose.Schema
const adminSchema = new Schema({
  adminname: {
    type: String,
    unique: false
  },
  adminsex: {
    type: Boolean,
    unique: false
  },
  adminworkdate: {
    type: String,
    unique: false
  },
  adminphoto: {
    type: String,
    unique: true
  },
  adminemail: {
    type: String,
    unique: true
  },
  adminphonenumber: {
    type: String,
    unique: true
  }, 
  adminpassword: {
    type: String,
    unique: false
  },
  admintype: {
    type: Boolean,
    unique: false
  },
  adminwages: {
    type: Number,
    unique: false
  }
})
export default mongoose.model('admin', adminSchema)
