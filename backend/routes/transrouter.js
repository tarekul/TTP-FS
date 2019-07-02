const express = require('express')
const transrouter = express.Router()
const transserv = require('../services/transservice')

transrouter.get('/:email',(req,res)=>{
    const {email} = req.params
    transserv.readUser(email)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>res.json(err))
})

transrouter.post('/',(req,res)=>{
    const {email,stock,shares,price} = req.body
    transserv.postTrade(email,stock,shares,price)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>res.json(err))
})

module.exports = transrouter;