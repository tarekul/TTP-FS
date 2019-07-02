import React from 'react'
import './register.css'
import RegForm from '../components/regform'
import Validateform from '../components/validateform'

class Register extends React.Component{
    state = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        validated:true
    }

    onChange = (e)=>{
        this.setState({[e.target.id]:e.target.value})
        
       
    }

    onSubmit = (e)=>{
        const {firstname,lastname,email,password} = this.state
        if(firstname && lastname && email && password) {
            
            this.setState({validated:true})
        }
        else this.setState({validated:false})
    }
    
    render(){
        const {validated} = this.state
        
        const alert = !validated ? <Validateform /> : ''
            
        
        return <>
        <div class='container mt-5 jumbotron'>
        {alert}
        <RegForm onChange={this.onChange} onSubmit={this.onSubmit}/>
        </div>
    </>
    }
    
}

export default Register
