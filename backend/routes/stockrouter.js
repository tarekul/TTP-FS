const express = require('express')
const stockrouter = express.Router()
const stockserv = require('../services/stockservice')

stockrouter.get('/:username',(req,res)=>{
    const {username} = req.params
    stockserv.readUser(username)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>res.json(err))
})

stockrouter.post('/',(req,res)=>{
    const {username,stock,shares} = req.body
    stockserv.postStock(username,stock,shares)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

stockrouter.put('/:username',(req,res)=>{
    const {username} = req.params;
    const {stock, shares} = req.body;
    stockserv.postStock(username,stock,shares)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

module.exports = stockrouter