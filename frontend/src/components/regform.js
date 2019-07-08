import React from 'react'

const RegForm = (props) =>{
    const onChange = this.props.onChange
    return <form>
    <div className="form-row">
        <div className="form-group col-md-6">
            <label for="inputEmail4">First Name</label>
            <input type="text" className="form-control"  placeholder="firstname" id='firstname'  onChange={e=>{onChange(e)}} />
        </div>
        <div className="form-group col-md-6">
            <label for="inputEmail4">Last Name</label>
            <input type="text" className="form-control"  placeholder="lastname" id='lastname'  onChange={e=>{onChange(e)}} />
        </div>

        <div className="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" id='email'  onChange={e=>{onChange(e)}}/>
        </div>
        <div className="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" id='password'  onChange={e=>{onChange(e)}}/>
        </div>
    </div>    
    <div className='submit-container'>
        <button type="submit" className="btn btn-primary" onClick={e=>{props.onSubmit()}}>Submit</button>
    </div>
</form>
}

export default RegForm