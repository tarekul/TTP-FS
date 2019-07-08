import React from 'react';
import {HashRouter, Route} from 'react-router-dom'
import firebase from './firebase'
import Register from './containers/register'
import Nav from './containers/nav'
import Portfolio from './containers/portfolio'
import Transactions from './containers/transactions'
import Logout from './containers/logout'
import SignIn from './containers/signin'
import AuthContext from './contexts/authContext'

class App extends React.Component{
  state = {
    user:null
  }
  componentDidMount(){
    this.unsubscribe = firebase.auth().onAuthStateChanged(user=>this.setState({user}))
  }

  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const {user} = this.state
    console.log(user)
    return (
      <HashRouter>
        <AuthContext.Provider value={user}>
          <Route path='/' component={Nav}/>
          <Route path='/' exact component={Portfolio}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/transactions' exact component={Transactions}/>
          <Route path = '/logout' exact component={Logout} />
          <Route path = '/signin' exact component={SignIn} />
        </AuthContext.Provider>
      </HashRouter>
    )

  }
    
    
  
}

export default App;
