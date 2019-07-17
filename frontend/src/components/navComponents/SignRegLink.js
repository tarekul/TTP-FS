import React from 'react'
import {Link} from 'react-router-dom'

const Navlinks = props =>{
    return <div className='container mt-5'>
        <div style={{textAlign:'center'}}>
            <h1 className="display-3">Stock Portfolio</h1>
        </div>
        <ul className="nav" style={{display:'flex',justifyContent:'flex-end'}}>
            <li className="nav-item"><Link to='/register' className='nav-link active'>Sign Up</Link></li>
            <li className="nav-item" style={{color:'blue',fontWeight:500,display:'flex',alignItems:'center'}}>|</li>
            <li className="nav-item"><Link to='/signin' className='nav-link active'>Login</Link></li>
        </ul>
        </div>
}

export default Navlinks