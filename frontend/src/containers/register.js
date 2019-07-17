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
                Service.postUser(firstname + " " + lastname,email,5000,response.user.uid)
                .then(() => {
                    this.props.history.push('/')
                })
                
            })
            .catch(err => this.setState({validated:true,error:err.message}))
        }
        else this.setState({validated:false,error:null})
    }
    
    render(){
        return <>
        <AuthContext.Consumer>
            {
                user =>{
                    if(!user){
                        const {validated,error,signedup} = this.state
                        const alert = !validated ? <Validateform /> : ''
                        const alert2 = error ? <RegisterError error={error} /> : ''
                        if(signedup) return <Redirect to='/portfolio' />
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
                    else return <Redirect to='/' />
                }
            }
        </AuthContext.Consumer>
        </>
    }
}

export default Register
