import React from 'react'
import AuthContext from '../contexts/authContext'

import Navlinks from '../components/navComponents/SignRegLink'
import PortTransLogLink from '../components/navComponents/PortTranLink'

const Nav = (props) =>{
    return <>
      <AuthContext.Consumer>
        {
          user=>{
            if(user) return <PortTransLogLink />
            else return <Navlinks />
          }
        }
      </AuthContext.Consumer>
    </>
}

export default Nav