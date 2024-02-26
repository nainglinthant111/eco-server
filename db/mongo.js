const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
const dbURI = process.env.MONGODB_URI
mongoose
    .connect(dbURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

const userSchema = new mongoose.Schema({
    aboutYou:String ,
    age: Number,
    agreetc: Boolean,
    dob: String,
    email: String,
    gender: String,
    address: {
      id: Number,
      addLine1: String,
      addLine2: String,
      city: String,
      state: String,
      zipCode: Number
    },
    language: String,
    mobNumber: String,
    name: String,
    password:String,
    uploadPhoto: String,
    role: String,
    id: String
  });

const productsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    uploadPhoto: String,
    productDesc: String,
    mrp: Number,
    dp: Number,
    status: String
  });

const ordersSchema = new mongoose.Schema({
    id: Number,
    userId: String,
    sellerId: Number,
    ptoduct: {
        id: Number,
        name: String,
        uploadPhoto: String,
        productDesc: String,
        mrp: Number,
        dp: Number,
        status: String
      },
    deliveryAddress: {
        id: Number,
        addLine1: String,
        addLine2: String,
        city: String,
        state: String,
        zipCode: Number
      },
    contact: String,
    dateTime: String
  });

const User = mongoose.model("User", userSchema);
const Products = mongoose.model("Products", productsSchema);
const Orders = mongoose.model("Orders", ordersSchema);

module.exports = {
    User,Products,Orders
}
