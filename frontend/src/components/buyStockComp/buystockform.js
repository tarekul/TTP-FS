import React from 'react'
import axios from 'axios'
import Service from '../../services/service'
import Form from './form'

class StockForm extends React.Component{
    state = {
        pubToken:'pk_36cce85f17164c5a815a8c420668ac38',
        balance:0,
        ticker:null,
        open:0,
        current:0,
        quantity:null,
        formError:null,
        showPurchaseError:true
    }

    handleInput = (e) =>{
        if(e.target.name === 'quantity'){
             if(parseInt(e.target.value)) this.setState({
                 quantity:parseInt(e.target.value),
                 formError:null
                })
             else this.setState({quantity:null})
        }
        
        else if(e.target.value !== '' ){
            this.setState({[e.target.name]:e.target.value.toUpperCase(),formError:null})
        }
        
        else if(e.target.value === '') this.setState({ticker:null})
        
    }

    onSubmit = () =>{
        const {ticker,quantity} = this.state
        const {email,purchaseStock} = this.props
        if(ticker && quantity) purchaseStock(email,ticker,quantity)
        else this.setState({formError:'Enter ticker and quantity'})
    }
    
    render(){
        const {balance,purchaseError} = this.props
        const {formError} = this.state
        const handleInput = this.handleInput
        const onSubmit = this.onSubmit
        const ifFormErr = formError ? <div class="alert alert-danger" role="alert">{formError}</div> : ''
        const ifPurchaseErr = purchaseError ? <div class="alert alert-danger" role="alert">{purchaseError}</div> : ''
        return <Form {...{balance,ifFormErr,ifPurchaseErr,handleInput,onSubmit}} />
    }
}

export default StockForm