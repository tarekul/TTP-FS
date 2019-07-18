import React from 'react'

const SignInForm = (props) =>{
    return <form>
    <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" id='email'  onChange={e=>{props.onChange(e)}}/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" id='password'  onChange={e=>{props.onChange(e)}}/>
        </div>
    </div>    
    <div className='submit-container'>
        <button type="submit" className="btn btn-primary" onClick={e=>{props.onSubmit()}}>Submit</button>
    </div>
</form>
}

export default SignInForm