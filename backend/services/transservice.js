const {getDBConnect} = require('./dbConnect')
const dbAddr = 'postgres://localhost/stockportfolio'
const db = getDBConnect(dbAddr)
const transserv = {}

transserv.readUser= email =>{
    const sql = 'SELECT * FROM transactions WHERE email=$[email]';
    return db.any(sql,{email})
}

transserv.postTrade = (email,stock,shares,price) =>{
    const sql = 'INSERT INTO transactions (email,stock,shares,price) VALUES ($[email],$[stock],$[shares],$[price]) RETURNING id';
    return db.one(sql,{email,stock,shares,price})
}

module.exports = transserv
