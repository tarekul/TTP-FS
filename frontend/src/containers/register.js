import React from 'react'
import './register.css'
import RegForm from '../components/regform'
import Validateform from '../components/validateform'
import RegisterError from '../components/registererror'
import firebase from '../firebase'
import AuthContext from '../contexts/authContext'
import axios from 'axios';
import Service from '../services/service'

import {Redirect} from 'react-router-dom'

class Register extends React.Component{
    static contextType = AuthContext
    state = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        validated:true,
        error:null,
        signedup:false
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user) this.props.history.push('/')
        })
    }
    onChange = (e)=>{
        this.setState({[e.target.id]:e.target.value})
        
       
    }

    onSubmit = (e)=>{
        const {firstname,lastname,email,password} = this.state
        if(firstname && lastname && email && password) {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((response)=>{
                Service.postUser(firstname + " " + lastname,email,5000,response.user.uid)
                .then(res => this.setState({signedup:true}))
                
            })
            .catch(err => this.setState({validated:true,error:err.message}))
        }
        else this.setState({validated:false,error:null})
    }
    
    render(){
        const {validated,error,signedup} = this.state
        
        const alert = !validated ? <Validateform /> : ''
        const alert2 = error ? <RegisterError error={error} /> : ''
        if(signedup) return <Redirect to='/' />
        return <>
            <div className='container mt-5 jumbotron'>
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
