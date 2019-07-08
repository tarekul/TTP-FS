const express = require('express')
const userrouter = express.Router()
const userserv = require('../services/userservice')

userrouter.get('/:email',(req,res)=>{
    const {email} = req.params
    userserv.readUser(email)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

userrouter.post('/',(req,res)=>{
    const {name,email,balance,token} = req.body
    userserv.postUser(name,email,balance,token)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

userrouter.put('/:email',(req,res)=>{
    const {email} = req.params;
    const {balance} = req.body;
    userserv.updateBalance(email,balance)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

module.exports = userrouter