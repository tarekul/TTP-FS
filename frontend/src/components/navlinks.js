import React from 'react'
import {Link} from 'react-router-dom'

const Navlinks = props =>{
    return <><li class="nav-item">
                <Link to='/register'><a class="nav-link" href="#">Sign Up</a></Link>
                </li>
                <li class="nav-item">
                <Link to='/register'><a class="nav-link" href="#">Login</a></Link>
            </li>
        </>
}

export default Navlinks