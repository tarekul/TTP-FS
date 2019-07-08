const Service = {}
Service.save_user = (email) =>{
    window.localStorage.setItem('email',email)
}

Service.get_user = () =>{
    return window.localStorage.getItem('email')
}

export default Service;