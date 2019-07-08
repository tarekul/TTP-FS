import React from 'react'
import axios from 'axios'
import Service from '../services/service'

class StockForm extends React.Component{
    state = {
        pubToken:'pk_36cce85f17164c5a815a8c420668ac38',
        balance:0,
        ticker:'',
        open:0,
        current:0,
        quantity:1,
        error:false
    }

    componentDidMount(){
        const email = this.props ? this.props.email : Service.get_user()
        axios.get(`http://localhost:6003/user/${email}`)
        .then(res=>{
            const balance = res.data[0].balance
            this.setState({balance:balance})
        })
    }


    
    handleInput(e){
        const {pubToken} = this.state
        if(e.target.name === 'quantity'){
             if(parseInt(e.target.value)) this.setState({quantity:parseInt(e.target.value)})
             else this.setState({quantity:1})
        }
        
        else if(e.target.value !== '' ){
            this.setState({[e.target.name]:e.target.value.toUpperCase()})
            const currentPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${e.target.value}/price?token=${pubToken}`)
            const openPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${e.target.value}/ohlc?token=${pubToken}`)
            
            Promise.all([currentPrice,openPrice])
            .then(res=>{
                this.setState({open:res[1].data.open.price,current:res[0].data,error:false})
            })
            .catch(err=>{
                //console.log(err)
                this.setState({error:true,open:0,current:0})
            })
        }
        
        else if(e.target.value === '') this.setState({ticker:'',open:0,current:0,error:false})
        
    }

    onSubmit(){
        const {ticker,quantity,error,current} = this.state
        if(ticker && !error){
            const post_trans = axios.post(`http://localhost:6003/transaction`,{
                email:this.props.email,
                stock:ticker,
                shares:quantity,
                price:current
            })

            axios.get(`http://localhost:6003/user/${this.props.email}`)
            .then(res=>{
                let balance = res.data[0].balance
                if(quantity * parseFloat(current) < balance){
                    balance = balance - (quantity * parseFloat(current))
                    this.setState({balance:balance})
                    const updatebalance = 
                        axios.put(`http://localhost:6003/user/${this.props.email}`,{
                            balance:balance
                        })
                    axios.get(`http://localhost:6003/stock/${this.props.email}/check/${ticker}`)
                    .then(res=>{
                        if(res.data.length === 0){
                            const saveStock = 
                                axios.post(`http://localhost:6003/stock`,{
                                    email:this.props.email,
                                    stock:ticker,
                                    shares:quantity
                                })
                            
                            Promise.all([saveStock,updatebalance,post_trans])
                            .then(()=>this.props.stockupdate())
                        }
                        else{
                            //console.log(res.data)
                            const prev_quantity = res.data[0].shares
                            const new_quantity = prev_quantity + quantity
                            const shareupdate = 
                                axios.put(`http://localhost:6003/stock/${this.props.email}`,{
                                    stock:ticker,
                                    shares:new_quantity
                                })
                            Promise.all([shareupdate,updatebalance,post_trans])
                            .then(()=>this.props.stockupdate())
                        }
                    }) 
                }
            })
        }
        
        
    }
    
    render(){
        const {balance} = this.state
        return <>
            <div class='col-6' style={{backgroundColor:'whitesmoke',padding:'5%'}}>
            <div class='row'>
                <div class='col'>
                    <h4>Cash ${balance}</h4>
                </div>
            </div>
            <div class='row'>
                <div class='col-5' style={{marginTop:'5%',marginBottom:'5%'}}>
                    <input type="text" class="form-control" 
                        aria-label="Large" name='ticker' 
                        placeholder='Ticker' onChange={e=>{this.handleInput(e)}} />
                </div>
            </div>
            <div class='row'>
                <div class='col-5' style={{marginTop:'5%',marginBottom:'5%'}}>
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