import React from 'react'
import SignInForm from '../components/signinform'
import firebase from '../firebase'
import AuthContext from '../contexts/authContext'
import {Redirect} from 'react-router-dom'

class SignIn extends React.Component{
    static contextType = AuthContext
    state = {
        email:'',
        password:'',
        error:null
    }


    onChange = (e) => this.setState({[e.target.id]:e.target.value})
    
    onSubmit = () =>{
        const {email,password} = this.state
        if(email && password){
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(()=>{
                console.log('firebase user sign in success')
                this.props.history.push('/')
            })
            .catch(err=>this.setState({error:err.message}))
        }
        else this.setState({error:'Please enter credentials'})
    }

    render(){
        return (
            <AuthContext.Consumer>
                {
                    user=>{
                        if(!user){
                            const {error} = this.state
                            const alert = error ? <div className="alert alert-danger" role="alert">
                                            {error} </div> : ''
                            return (
                                <div className='container mt-5'>
                                    {alert}
                                    <SignInForm onChange={this.onChange}  onSubmit={this.onSubmit}/>
                                </div>
                                
                            )
                        }
                    }
                }
            </AuthContext.Consumer>
        )
        
    }
}

export default SignIn