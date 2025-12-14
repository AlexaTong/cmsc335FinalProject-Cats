const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Pending"
  },
  contact: {
    type: {
      fName: {
        type: String,
        required: true
      },
      lName: {
        type: String,
        required: true
      },
      dob: {
        type: Date,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      }
    },
    required: true
  },
  cat: {
    type: String,
    required: true
  },
  living: {
    type: {
      house: {
        type: String,
        required: true
      },
      houseOther: {
        type: String
      },
      numPeople: {
        type: Number,
        required: true
      },
      numPets: {
        type: Number,
        required: true
      }
    },
    required: true
  },
  comments: {
    type: String
  }
})

const App = mongoose.model("Application", appSchema);
module.exports = App;