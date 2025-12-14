"use strict";

const express = require ("express");
const router = express.Router();
const mongoose = require("mongoose");
const App = require("./appModel.js");

router.get("/apply", (req, res) => {
  const variables = {
    activePage: "apply",
    formData: {},
    readOnly: false
  };
  res.render("apply", variables);
});

router.post("/sendApp", async (req, res) => {
  const variables = {
    activePage: "",
    formData: req.body,
    readOnly: true
  };

  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, { dbName: "catSite"});

    await App.create({
      contact: {
        fName: req.body.fName,
        lName: req.body.lName,
        dob: req.body.dob,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
      },
      cat: req.body.cat,
      living: {
        house: req.body.house,
        houseOther: req.body.houseOther,
        numPeople: req.body.numPeople,
        numPets: req.body.numPets,
      },
      comments: req.body.comments
    });

    mongoose.disconnect;
  } catch(err) {
    console.error(err);
  }

  res.render("confirmApp", variables);
});

router.get("/viewApp", (req, res) => {
  const variables = {
    activePage: "view"
  };
  res.render("viewApp", variables);
});

router.get("/requestApp", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, { dbName: "catSite"});

    const app = await App.findOne({
      "contact.email": req.query.email,
      cat: req.query.cat
    });

    if (app) {
      const variables = {
        activePage: "",
        status: app.status,
        formData: {
          fName: app.contact.fName,
          lName: app.contact.lName,
          dob: new Date(app.contact.dob).toISOString().split('T')[0],
          phone: app.contact.phone,
          email: app.contact.email,
          address: app.contact.address,
          cat: app.cat,
          house: app.living.house,
          houseOther: app.living.houseOther,
          numPeople: app.living.numPeople,
          numPets: app.living.numPets,
          comments: app.comments
        },
        readOnly: true
      };
  
      res.render("requestedApp", variables);
    } else {
      const variables = { activePage: "" };
      res.render("appNotFound", variables);
    }
    
    mongoose.disconnect;
  } catch(err) {
    console.error(err);
  }
});

module.exports = router;