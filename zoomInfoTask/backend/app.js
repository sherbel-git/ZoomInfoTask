const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require("./middleware/check-auth")
const bcrypt = require("bcrypt")


const Customer = require('./models/customer');
const User = require('./models/user');

const app = express();

mongoose.connect("mongodb+srv://sherbel:Qxl9mklZ95FASmtQ@cluster0.ecbrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('connecting to database!')
  })
  .catch(() => {
    console.log('connecting failed!')
  })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/user/signup" ,(req,res,next) => {
  bcrypt.hash(req.body.password, 10 ).then(hash => {
    const user = new User ({
      email: req.body.email,
      password: hash
  });
    console.log(user);
  user.save().then(result => {
    res.status(201).json({
      message: 'user created',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


});

app.post("/api/user/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'auth Failed 1'
        });
      }
      fetchedUser = user
      console.log(user.password + '  ' + req.body.password )
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed 2"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        "secret_this_should_be_longer",
        {expiresIn: "1h"}
      );
      console.log(token)
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({
        message: "Auth failed 3"
      })
    })
});


app.post("/api/customer", (req, res, next) => {
  const customer = new Customer({
    idNumber: req.body.idNumber,
    number: req.body.number,
    firstName: req.body.firstName,
    birthDate: req.body.birthDate,
    phone1: req.body.phone1,
    balance: req.body.balance,
    obligo: req.body.obligo,
    isParent: req.body.isParent,
  });
  customer.save();
  console.log(customer);
  res.status(201).json({message: 'customer created successfully'})
});
app.get("/api/customers", (req, res, next) => {
  Customer.find().then((document) => {
    console.log(document);
    const items = [
      {
        "items":
          document
        ,
        "total": document.length,
        "lastPage": document.length/5
      }
    ];
    res.status(200).json(...items);
  });
});

app.delete("/api/customer/:id", (req, res, next) => {
  Customer.deleteOne({_id: req.params.id}).then((document) => {
    res.status(200).json({message: 'customer Deleted!'})
  });
});

app.get("/api/customer/:id", (req, res, next) => {
  Customer.find({_id: req.params.id}).then((document) => {
    res.status(200).json(...document)

  });
});


module.exports = app;
