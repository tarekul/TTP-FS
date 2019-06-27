const {getDBConnect} = require('./dbConnect')
const dbAddr = 'postgres://localhost/stockportfolio'
const db = getDBConnect(dbAddr)
const transserv = {}

transserv.readUser= username =>{
    const sql = 'SELECT * FROM transactions WHERE username=$[username]';
    return db.any(sql,{username})
}

transserv.postTrade = (username,stock,shares,price) =>{
    const sql = 'INSERT INTO transactions (username,stock,shares,price) VALUES ($[username],$[stock],$[shares],$[price]) RETURNING id';
    return db.one(sql,{username,stock,shares,price})
}

module.exports = transserv
