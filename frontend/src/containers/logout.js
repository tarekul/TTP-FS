import React from 'react'
import firebase from '../firebase' 
import {Redirect} from 'react-router-dom'

class Logout extends React.Component{
    state = {
        redirect:false
    }
    
    componentDidMount() {
        firebase.auth().signOut()
        .then(()=> this.setState({redirect:true}))
    }
    
    render(){
        const {redirect} = this.state
        if(redirect) return <Redirect to='/register' />
        return <h1>Logout ....</h1>
    }
    
}

export default Logout