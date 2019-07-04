import React from 'react'
import axios from 'axios'

class StockForm extends React.Component{
    state = {
        pubToken:'pk_36cce85f17164c5a815a8c420668ac38',
        ticker:'',
        quantity:1,
        error:null
    }
    
    handleInput(e){
        if(e.target.name === 'quantity'){
            if(e.target.value = "") this.setState({quantity:1})
            if(parseInt(e.target.value)) this.setState({quantity:parseInt(e.target.value)})
        }
        else this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(){
        const {ticker,quantity,pubToken} = this.state
        if(ticker !== ''){
            axios.get(`https://cloud.iexapis.com/stable/tops?token=${pubToken}&symbols=${ticker}`)
            .then(response=>console.log(response.data[0].lastSalePrice))
        }
        
    }
    
    render(){
        return <>
            <div class='col-5' style={{backgroundColor:'green',padding:'5%'}}>
            <div class='row'>
                <div class='col'>
                    <h4>h4. Bootstrap heading</h4>
                </div>
            </div>
            <div class='row'>
                <div class='col' style={{marginTop:'5%',marginBottom:'5%'}}>
                    <input type="text" class="form-control" 
                        aria-label="Large" name='ticker' 
                        placeholder='Ticker' onChange={e=>{this.handleInput(e)}} />
                </div>
            </div>
            <div class='row'>
                <div class='col' style={{marginTop:'5%',marginBottom:'5%'}}>
                <input type="text" class="form-control" 
                    aria-label="Large" name='quantity'
                    placeholder='Quantity' onChange={e=>{this.handleInput(e)}} />
                </div>
            </div>
            <div class='row'>
                <div class='col'>
                    <button type="button" class="btn btn-primary" onClick={e=>this.onSubmit()}>Primary</button>
                </div>
            </div>
            </div>
        
        </>
    }
}

export default StockForm