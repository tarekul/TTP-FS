const {getDBConnect} = require('./dbConnect')
const dbAddr = 'postgres://localhost/stockportfolio'
const db = getDBConnect(dbAddr)
const stockserv = {}

stockserv.readUser = username =>{
    const sql = `SELECT * FROM stocks WHERE username=$[username]`
    return db.any(sql,{username})
}

stockserv.postStock = (username,stock,shares) =>{
    const sql = 'INSERT INTO stocks (username,stock,shares,openprice) VALUES ($[username],$[stock],$[shares],$[openprice]) RETURNING id'
    return db.one(sql,{username,stock,shares})
}

stockserv.updateShares = (username,stock,shares) =>{
    const sql = 'UPDATE stocks SET shares=$[shares] WHERE username=$[username] AND stock=$[stock] RETURNING shares'
    return db.one(sql,{username,stock,shares})
}

module.exports = stockserv;