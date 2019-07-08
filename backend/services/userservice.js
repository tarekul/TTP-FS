const {getDBConnect} = require('./dbConnect')
const dbAddr = 'postgres://localhost/stockportfolio'
const db = getDBConnect(dbAddr)
const userserv = {}

userserv.readUser = email =>{
    const sql = `SELECT * FROM users WHERE email=$[email]`
    return db.any(sql,{email})
}

userserv.postUser = (name,email,balance,token) =>{
    const sql = 'INSERT INTO users (name,email,balance,token) VALUES ($[name],$[email],$[balance],$[token]) RETURNING email'
    return db.one(sql,{name,email,balance,token})
}

userserv.updateBalance = (email,balance) =>{
    const sql = 'UPDATE users SET balance=$[balance] WHERE email=$[email] RETURNING balance'
    return db.one(sql,{email,balance})
}

module.exports = userserv;