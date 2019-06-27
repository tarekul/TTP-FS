const express = require('express')
const transrouter = express.Router()
const transserv = require('../services/transservice')

transrouter.get('/:username',(req,res)=>{
    const {username} = req.params
    transserv.readUser(username)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>res.json(err))
})

transrouter.post('/',(req,res)=>{
    const {username,stock,shares,price} = req.body
    transserv.postTrade(username,stock,shares,price)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>res.json(err))
})

module.exports = transrouter;