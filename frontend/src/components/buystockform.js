import React from 'react'
import axios from 'axios'

class StockForm extends React.Component{
    state = {
        pubToken:'pk_36cce85f17164c5a815a8c420668ac38',
        ticker:'',
        open:0,
        current:0,
        quantity:1,
        error:false
    }
    
    handleInput(e){
        const {ticker,quantity,pubToken} = this.state
        if(e.target.name === 'quantity'){
             if(parseInt(e.target.value)) this.setState({quantity:parseInt(e.target.value)})
             else this.setState({quantity:1})
        }
        else{
            if(e.target.value !== '' ){
                this.setState({[e.target.name]:e.target.value.toUpperCase()})
                const currentPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${e.target.value}/price?token=${pubToken}`)
                const openPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${e.target.value}/ohlc?token=${pubToken}`)
                
                Promise.all([currentPrice,openPrice])
                .then(res=>{
                    this.setState({open:res[1].data.open.price,current:res[0].data,error:false},()=>console.log(this.state))
                })
                .catch(err=>{
                    //console.log(err)
                    this.setState({error:true,open:0,current:0},()=>console.log(this.state))
                })
            }
            else this.setState({ticker:'',open:0,current:0,error:false})

            
        }
    }

    onSubmit(){
        const {ticker,quantity,pubToken,error,open,current} = this.state
        if(ticker && !error){
            if(quantity * parseInt(current) < 5000) console.log('yes')
        }
        
        
    }
    
    render(){
        const {current,open} = this.state
        const diff = (parseFloat(current) - parseFloat(open)).toFixed(2)
        let str = ''
        let styleObj = {}
        if(diff >= 0){
            str = '+' + diff.toString()
            styleObj = {marginTop:'5%',marginBottom:'5%',color:'green'}
        }
        else {
            str = diff.toString()
            styleObj = {marginTop:'5%',marginBottom:'5%',color:'red'}
        }
        return <>
            <div class='col-5' style={{backgroundColor:'whitesmoke',padding:'5%'}}>
            <div class='row'>
                <div class='col'>
                    <h4>h4. Bootstrap heading</h4>
                </div>
            </div>
            <div class='row'>
                <div class='col-5' style={{marginTop:'5%',marginBottom:'5%'}}>
                    <input type="text" class="form-control" 
                        aria-label="Large" name='ticker' 
                        placeholder='Ticker' onChange={e=>{this.handleInput(e)}} />
                </div>
                <div class='col' style={{marginTop:'5%',marginBottom:'5%'}}><h5>{current}</h5></div>
                <div class='col' style={styleObj}><h6>{str}</h6></div>
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