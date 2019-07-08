import React from 'react'
import SignInForm from '../components/signinform'
import firebase from '../firebase'
import Service from '../services/service';

class SignIn extends React.Component{
    state = {
        email:'',
        password:'',
        error:null
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user) this.props.history.push('/')
        })
    }

    onChange = (e) =>{
        this.setState({[e.target.id]:e.target.value})
    }
    onSubmit = () =>{
        const {email,password} = this.state
        if(email && password){
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(()=>{
                Service.save_user(email)
                this.props.history.push('/')
            })
            .catch(err=>this.setState({error:err.message}))
        }
        else this.setState({error:'Please enter credentials'})
    }
    render(){
        const onSubmit = this.onSubmit
        const onChange = this.onChange
        const {error} = this.state
        const alert = error ? <div class="alert alert-danger" role="alert">
                        {error} </div> : ''
        return (
            <div class='container mt-5'>
                {alert}
                <SignInForm {...{onSubmit,onChange}}/>
            </div>
            
        )
    }
}

export default SignIn