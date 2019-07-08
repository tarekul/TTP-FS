import React from 'react'
import firebase from '../firebase' 

class Logout extends React.Component{
    componentDidMount() {
        firebase.auth().signOut()
        .then(()=> this.props.history.push('/signin'))
    }
    
    render(){
        return <h1>Logout ....</h1>
    }
    
}

export default Logout