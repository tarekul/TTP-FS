import axios from 'axios'
const Service = {}
Service.save_user = (email) =>{
    window.localStorage.setItem('email',email)
}

Service.get_user = () =>{
    return window.localStorage.getItem('email')
}

Service.getStocks = email =>{
    return axios.get(`http://localhost:6003/stock/${email}`)
}

Service.getUser = email =>{
    return axios.get(`http://localhost:6003/user/${email}`)
}

Service.getTrans = email =>{
    return axios.get(`http://localhost:6003/transaction/${email}`)
}

export default Service;