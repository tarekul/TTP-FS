import React from 'react'
import {Link} from 'react-router-dom'

const Navlinks = props =>{
    return <><li className="nav-item">
                <Link to='/register' className="nav-link">Sign Up</Link>
                </li>
                <li className="nav-item">
                <Link to='/signin' className="nav-link">Login</Link>
            </li>
        </>
}

export default Navlinks