const {getDBConnect} = require('./dbConnect')
const dbAddr = 'postgres://localhost/stockportfolio'
const db = getDBConnect(dbAddr)
const userserv = {}

userserv.readUser = username =>{
    const sql = `SELECT * FROM users WHERE username=$[username]`
    return db.any(sql,{username})
}

userserv.postUser = (name,username,balance,token) =>{
    const sql = 'INSERT INTO users (name,username,balance,token) VALUES ($[name],$[username],$[balance],$[token]) RETURNING id'
    return db.one(sql,{name,username,balance,token})
}

userserv.updateBalance = (username,balance) =>{
    const sql = 'UPDATE users SET balance=$[balance] WHERE username=$[username] RETURNING balance'
    return db.one(sql,{username,balance})
}

module.exports = userserv;