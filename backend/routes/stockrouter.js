const express = require('express')
const stockrouter = express.Router()
const stockserv = require('../services/stockservice')

stockrouter.get('/:email',(req,res)=>{
    const {email} = req.params
    stockserv.readUser(email)
    .then(response=>{
        res.json(response)
    })
    .catch(err=>res.json(err))
})

stockrouter.get('/:email/check/:stock',(req,res)=>{
    const{email,stock} = req.params
    stockserv.checkIfStockExists(email,stock)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

stockrouter.post('/',(req,res)=>{
    const {email,stock,shares} = req.body
    stockserv.postStock(email,stock,shares)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

stockrouter.put('/:email',(req,res)=>{
    const {email} = req.params;
    const {stock, shares} = req.body;
    stockserv.updateShares(email,stock,shares)
    .then(response=>res.json(response))
    .catch(err=>res.json(err))
})

module.exports = stockrouter