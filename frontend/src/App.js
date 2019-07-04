import React from 'react';
import {HashRouter, Route} from 'react-router-dom'
import firebase from './firebase'
import Register from './containers/register'
import Nav from './containers/nav'
import Portfolio from './containers/portfolio'
import AuthContext from './contexts/authContext'

class App extends React.Component{
  state = {
    user:null
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=>this.setState({user}))
  }
  render(){
    const {user} = this.state
    console.log(user)
    return (
      <HashRouter>
        <AuthContext.Provider value={user}>
          <Route path='/' component={Nav}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/portfolio' exact component={Portfolio}/>
        </AuthContext.Provider>
      </HashRouter>
    );
  }
  
}

export default App;
