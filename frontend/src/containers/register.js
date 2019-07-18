import React from 'react'
import './register.css'
import RegForm from '../components/registerComp/regform'
import Validateform from '../components/validateform'
import RegisterError from '../components/registerComp/registererror'
import firebase from '../firebase'
import AuthContext from '../contexts/authContext'
import Service from '../services/service'

import {Redirect} from 'react-router-dom'

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
            .then((response)=>{
                console.log('bfore posting user to db')
                Service.postUser(firstname + " " + lastname,email,response.user.uid)
                .then(() => {
                    console.log('about to leave registration page')
                    console.log(this.props.history)
                    this.props.history.push('/')
                })
                
            })
            .catch(err => this.setState({validated:true,error:err.message}))
        }
        else this.setState({validated:false,error:null})
    }
    
    render(){
        console.log('register render lol')
        return <>
        <AuthContext.Consumer>
            {
                user =>{
                    console.log('testing authcontext behavior')
                    if(!user){
                        const {validated,error} = this.state
                        const alert = !validated ? <Validateform /> : ''
                        const alert2 = error ? <RegisterError error={error} /> : ''
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
            }
        </AuthContext.Consumer>
        </>
    }
}

export default Register
