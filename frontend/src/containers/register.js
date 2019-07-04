import React from 'react'
import './register.css'
import RegForm from '../components/regform'
import Validateform from '../components/validateform'
import RegisterError from '../components/registererror'
import firebase from '../firebase'

class Register extends React.Component{
    state = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        validated:true,
        error:null
    }

    onChange = (e)=>{
        this.setState({[e.target.id]:e.target.value})
        
       
    }

    onSubmit = (e)=>{
        const {firstname,lastname,email,password} = this.state
        if(firstname && lastname && email && password) {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>this.setState({validated:true,error:null}))
            .catch(err => this.setState({error:err.message}))
        }
        else this.setState({validated:false,error:null})
    }
    
    render(){
        const {validated,error} = this.state
        
        const alert = !validated ? <Validateform /> : ''
        const alert2 = error ? <RegisterError error={error} /> : ''
        
        return <>
        <div class='container mt-5 jumbotron'>
        <div style={{minHeight:'10vh'}}>
            {alert}
            {alert2}
        </div>
        <RegForm onChange={this.onChange} onSubmit={this.onSubmit}/>
        </div>
    </>
    }
    
}

export default Register
