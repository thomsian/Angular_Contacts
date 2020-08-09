const express = require("express");
const Contact = require('./model/contact');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

mongoose.connect('mongodb://localhost/contacts')
.then(()=>{
  console.log('connected to database');
})
.catch(()=>{
  console.log('connection failed');
})

app.post("/api/contacts", (req, res, next) => {
  const contact = new Contact({
       firstName: req.body.firstName,
       secondName: req.body.secondName,
       contactNo: req.body.contactNo
  });
  contact.save().then((result)=>{
    res.status(201).json({
    message: 'Contact added successfully',
    contactId: result._id
    });
  })
  
});

app.get("/api/contacts", (req, res, next) => {
  Contact.find().then(documents => {
      res.status(200).json({
        message:'contact fetched sucessfully',
        contacts: documents
      })
  });
});

app.get("/api/contacts/:id",(req,res,next) => {
  Contact.findById(req.params.id).then(contact =>{
    if(contact) {
      res.status(200).json(contact);
    } else{
      res.status(401).json({
        message: 'Contact not find'
      })
    }
  })

});

app.delete("/api/contacts/:id",(req,res,next) => {
  Contact.deleteOne({_id: req.params.id})
   .then((result)=>{
     console.log(result);
     res.status(200).json({
     message: 'contact deleted'
   });
  });
});

app.put('/api/contacts/:id',(req,res,next)=>{
  const contact= new Contact({
    _id:req.body.id,
    firstName:req.body.firstName,
    secondName:req.body.secondName,
    contactNo: req.body.contactNo
  })
  console.log(req.body);
  Contact.updateOne({
    _id:req.params.id,
  },contact)
  .then((responseData)=>{
      res.status(201).json({
      message:'update succesfull'
  })
  });
})
module.exports = app;
