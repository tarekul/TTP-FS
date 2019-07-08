import React from 'react'

const RegisterError = (props) =>{
    return <div className="alert alert-danger" role="alert" style={{marginBottom:'0px'}}>
                {props.error}
            </div>
       
}

export default RegisterError