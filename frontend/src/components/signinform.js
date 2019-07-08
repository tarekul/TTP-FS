import React from 'react'

const SignInForm = (props) =>{
    return <form>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="Email" id='email'  onChange={e=>{props.onChange(e)}}/>
        </div>
        <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input type="password" class="form-control" id="inputPassword4" placeholder="Password" id='password'  onChange={e=>{props.onChange(e)}}/>
        </div>
    </div>    
    <div class='submit-container'>
        <button type="submit" class="btn btn-primary" onClick={e=>{props.onSubmit()}}>Submit</button>
    </div>
</form>
}

export default SignInForm