import axios from 'axios'
const Service = {}
// Service.save_user = (email) =>{
//     window.localStorage.setItem('email',email)
// }

// Service.get_user = () =>{
//     return window.localStorage.getItem('email')
// }



Service.getUser = email =>{
    return axios.get(`http://localhost:6003/user/${email}`)
}

Service.postUser = (name,email,balance,uid) =>{
    return axios.post(`http://localhost:6003/user`,{
        name:name,
        email:email,
        balance:5000,
        token:uid
    })
}

Service.updateBalance = (email,new_balance) =>{
    return axios.put(`http://localhost:6003/user/${email}`,{
            balance:new_balance
    })
}

Service.getStocks = email =>{
    return axios.get(`http://localhost:6003/stock/${email}`)
}

Service.postStock = (email,ticker,quantity) =>{
    return axios.post(`http://localhost:6003/stock`,{
        email:email,
        stock:ticker,
        shares:quantity
    })
}

Service.checkIfStockExists = (email,ticker) =>{
    return axios.get(`http://localhost:6003/stock/${email}/check/${ticker}`)
}

Service.updateStock = (email,ticker,new_quantity) =>{
    return axios.put(`http://localhost:6003/stock/${email}`,{
                stock:ticker,
                shares:new_quantity
            })
}

Service.updateStocksNBalance = (email,ticker,quantity,balance,price) =>{
    const post_trans = Service.postTrans(email,ticker,quantity,price)
    const updatebalance = Service.updateBalance(email,balance)
    
    return Service.checkIfStockExists(email,ticker)
    .then(res=>{
        if(res.data.length === 0){
            const postStock = Service.postStock(email,ticker,quantity)
            return Promise.all([postStock,updatebalance,post_trans])
        }
        else{
            const prev_quantity = res.data[0].shares
            const new_quantity = prev_quantity + quantity
            const shareupdate = Service.updateStock(email,ticker,new_quantity)
            return Promise.all([shareupdate,updatebalance,post_trans])
        }
    }) 
}

Service.getTrans = email =>{
    return axios.get(`http://localhost:6003/transaction/${email}`)
}

Service.postTrans = (email,ticker,quantity,price) =>{
    return axios.post(`http://localhost:6003/transaction`,{
        email:email,
        stock:ticker,
        shares:quantity,
        price:price
    })
}

export default Service;