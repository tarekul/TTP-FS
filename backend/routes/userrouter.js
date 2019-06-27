const express = require('express')
const userrouter = express.Router()
const userserv = require('../services/userservice')

userrouter.get('/:username',(req,res)=>{
    const {username} = req.params
    userserv.readUser(username)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>res.json(err))
})

userrouter.post('/',(req,res)=>{
    const {name,username,balance,token} = req.body
    userserv.postUser(name,username,balance,token)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

userrouter.put('/:username',(req,res)=>{
    const {username} = req.params;
    const {balance} = req.body;
    userserv.postUser(username,balance)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

module.exports = userrouter