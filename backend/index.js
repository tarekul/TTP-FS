const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const userrouter = require('./routes/userrouter')
const stockrouter = require('./routes/stockrouter')
const transrouter = require('./routes/transrouter')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.json('Hello World')
})

app.use('/user',userrouter)
app.use('/stock',stockrouter)
app.use('/transaction',transrouter)

app.listen(6003,()=>{
    console.log('listening on 6003')
})