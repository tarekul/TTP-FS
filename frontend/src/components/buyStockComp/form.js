import React from 'react'

export default function(props){
    const {ifFormErr,ifPurchaseErr,balance,handleInput,onSubmit} = props
    return <>
            <div className='col-6' style={{backgroundColor:'whitesmoke',padding:'5%'}}>
            <div className='row'>
                <div className='col'>
                    <h4>{`Cash $${balance}`}</h4>
                    {ifFormErr}
                    {ifPurchaseErr}
                </div>
            </div>
            <div className='row'>
                <div className='col-5' style={{marginTop:'5%',marginBottom:'5%'}}>
                    <input type="text" className="form-control" 
                        aria-label="Large" name='ticker' 
                        placeholder='Ticker' onChange={e=>{handleInput(e)}} />
                </div>
            </div>
            <div className='row'>
                <div className='col-5' style={{marginTop:'5%',marginBottom:'5%'}}>
                <input type="text" className="form-control" 
                    aria-label="Large" name='quantity'
                    placeholder='Quantity' onChange={e=>{handleInput(e)}} />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <button type="button" className="btn btn-primary" onClick={e=>onSubmit()}>Buy</button>
                </div>
            </div>
            </div>
        
        </>
}