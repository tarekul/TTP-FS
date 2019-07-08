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
              <div className='container mt-5'>
                <div style={{textAlign:'center'}}>
                <h1 class="display-3">Stock Portfolio</h1>
                </div>
                <ul className="nav" style={{display:'flex',justifyContent:'flex-end'}}>
                  <li className="nav-item"><Link to='/' className='nav-link active'>Portfolio</Link></li>
                  <li className="nav-item" style={{color:'blue',fontWeight:500,display:'flex',alignItems:'center'}}>|</li>
                  <li className="nav-item"><Link to='/transactions' className='nav-link active'>Transactions</Link></li>
                  <li className="nav-item" style={{color:'blue',fontWeight:500,display:'flex',alignItems:'center'}}>|</li>
                  <li className="nav-item"><Link to='/logout' className='nav-link active'>Logout</Link></li>
                </ul>
              </div>
            </>
            else return <>
              <div className='container mt-5'><ul className="nav justify-content-center">
                <Navlinks />
              </ul></div>
            </>
          }
        }
       
      </AuthContext.Consumer>
      
    </>
}

export default Nav