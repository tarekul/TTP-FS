import React from 'react'
import './register.css'
import RegForm from '../components/regform'
import Validateform from '../components/validateform'
import RegisterError from '../components/registererror'
import firebase from '../firebase'
import AuthContext from '../contexts/authContext'


class Register extends React.Component{
    static contextType = AuthContext
    state = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        validated:true,
        error:null
    }

    componentDidMount(){
        //console.log(this.context)
        if(this.context) this.props.history.push('/portfolio')
    }
    onChange = (e)=>{
        this.setState({[e.target.id]:e.target.value})
        
       
    }

    onSubmit = (e)=>{
        const {firstname,lastname,email,password} = this.state
        if(firstname && lastname && email && password) {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>this.props.history.push('/portfolio'))
            .catch(err => this.setState({validated:true,error:err.message}))
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
