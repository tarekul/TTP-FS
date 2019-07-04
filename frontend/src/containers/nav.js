import React from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../contexts/authContext'

import Navlinks from '../components/navlinks'
const Nav = (props) =>{
    return <>
      <AuthContext.Consumer>
        {
          user=>{
            if(user) return <>
              <div class='container mt-5'><ul class="nav justify-content-center">
                <li class="nav-item"><h2>Stock Portfolio</h2></li>
              </ul></div>
            </>
            else return <>
              <div class='container mt-5'><ul class="nav justify-content-center">
                <Navlinks />
              </ul></div>
            </>
          }
        }
       
      </AuthContext.Consumer>
      
    </>
}

export default Nav