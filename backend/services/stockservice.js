const {getDBConnect} = require('./dbConnect')
const dbAddr = 'postgres://localhost/stockportfolio'
const db = getDBConnect(dbAddr)
const stockserv = {}

stockserv.readUser = email =>{
    const sql = `SELECT * FROM stocks WHERE email=$[email]`
    return db.any(sql,{email})
}

stockserv.checkIfStockExists = (email,stock) =>{
    const sql = `SELECT * FROM stocks WHERE email = $[email] AND stock=$[stock]`
    return db.any(sql,{email,stock})
}

stockserv.postStock = (email,stock,shares) =>{
    const sql = 'INSERT INTO stocks (email,stock,shares) VALUES ($[email],$[stock],$[shares]) RETURNING id'
    return db.one(sql,{email,stock,shares})
}

stockserv.updateShares = (email,stock,shares) =>{
    const sql = 'UPDATE stocks SET shares=$[shares] WHERE email=$[email] AND stock=$[stock] RETURNING shares'
    return db.one(sql,{email,stock,shares})
}

module.exports = stockserv;