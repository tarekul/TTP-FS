import React from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) =>{
    return <><div class='container mt-5'><ul class="nav justify-content-center">
    <li class="nav-item">
      <h2>Stock Portfolio</h2>
    </li>
    <li class="nav-item">
        <Link to='/register'><a class="nav-link" href="#">Sign Up</a></Link>
    </li>
    <li class="nav-item">
        <Link to='/register'><a class="nav-link" href="#">Login</a></Link>
    </li>
  </ul>
  </div>
  </>
}

export default Nav