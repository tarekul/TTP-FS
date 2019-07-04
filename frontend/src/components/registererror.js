import React from 'react'

const RegisterError = (props) =>{
    return <div class="alert alert-danger" role="alert" style={{marginBottom:'0px'}}>
                {props.error}
            </div>
       
}

export default RegisterError