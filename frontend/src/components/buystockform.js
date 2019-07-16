import React from 'react'
import axios from 'axios'
import Service from '../services/service'

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

    componentDidMount(){
        console.log(this.props.balance)
        // const email = this.props.email
        // Service.getUser(email)   //get user information from DB
        // .then(res=>{
        //     if(res.data.length > 0){
        //         const balance = res.data[0].balance
        //         this.setState({balance:balance})
        //     }
        // })
    }

    componentDidUpdate(){
        console.log('email')
    }


    
    handleInput(e){
        if(e.target.name === 'quantity'){
             if(parseInt(e.target.value)) this.setState({
                 quantity:parseInt(e.target.value),
                 formError:null
                })
             else this.setState({quantity:null})
        }
        
        else if(e.target.value !== '' ){
            this.setState({[e.target.name]:e.target.value.toUpperCase(),formError:null})
            // const currentPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${e.target.value}/price?token=${pubToken}`)
            // const openPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${e.target.value}/ohlc?token=${pubToken}`)
            
            // Promise.all([currentPrice,openPrice])
            // .then(res=>{
            //     this.setState({open:res[1].data.open.price,current:res[0].data,formError:false})
            // })
            // .catch(err=>{
            //     this.setState({formError:true,open:0,current:0})
            // })
        }
        
        else if(e.target.value === '') this.setState({ticker:null,open:0,current:0})
        
    }

    onSubmit(){
        const {ticker,quantity} = this.state
        const {purchaseStock} = this.props
        if(ticker && quantity) purchaseStock(ticker,quantity)
        else this.setState({formError:'Enter ticker and quantity'})
        // if(ticker && !formError){
        //     const post_trans = axios.post(`http://localhost:6003/transaction`,{
        //         email:this.props.email,
        //         stock:ticker,
        //         shares:quantity,
        //         price:current
        //     })

        //     axios.get(`http://localhost:6003/user/${this.props.email}`)
        //     .then(res=>{
        //         let balance = res.data[0].balance
        //         const pay = quantity * current
        //         if(pay < balance){
        //             balance = (balance - pay).toFixed(2)
        //             this.setState({balance:balance})
        //             const updatebalance = 
        //                 axios.put(`http://localhost:6003/user/${this.props.email}`,{
        //                     balance:balance
        //                 })
        //             axios.get(`http://localhost:6003/stock/${this.props.email}/check/${ticker}`)
        //             .then(res=>{
        //                 if(res.data.length === 0){
        //                     const saveStock = 
        //                         axios.post(`http://localhost:6003/stock`,{
        //                             email:this.props.email,
        //                             stock:ticker,
        //                             shares:quantity
        //                         })
                            
        //                     Promise.all([saveStock,updatebalance,post_trans])
        //                     .then(()=>this.props.stockupdate())
        //                 }
        //                 else{
        //                     const prev_quantity = res.data[0].shares
        //                     const new_quantity = prev_quantity + quantity
        //                     const shareupdate = 
        //                         axios.put(`http://localhost:6003/stock/${this.props.email}`,{
        //                             stock:ticker,
        //                             shares:new_quantity
        //                         })
        //                     Promise.all([shareupdate,updatebalance,post_trans])
        //                     .then(()=>this.props.stockupdate())
        //                 }
        //             }) 
        //         }
        //     })
        // }
        
        
    }
    
    render(){
        const {balance,purchaseError} = this.props
        const {formError,showPurchaseError} = this.state
        const alert = formError ? <div class="alert alert-danger" role="alert">{formError}</div> : ''
        const alert2 = purchaseError ? <div class="alert alert-danger" role="alert">{purchaseError}</div> : ''
        return <>
            <div className='col-6' style={{backgroundColor:'whitesmoke',padding:'5%'}}>
            <div className='row'>
                <div className='col'>
                    <h4>{`Cash $${balance}`}</h4>
                    {alert}
                    {showPurchaseError ? alert2 : <h1>something</h1>}
                </div>
            </div>
            <div className='row'>
                <div className='col-5' style={{marginTop:'5%',marginBottom:'5%'}}>
                    <input type="text" className="form-control" 
                        aria-label="Large" name='ticker' 
                        placeholder='Ticker' onChange={e=>{this.handleInput(e)}} />
                </div>
            </div>
            <div className='row'>
                <div className='col-5' style={{marginTop:'5%',marginBottom:'5%'}}>
                <input type="text" className="form-control" 
                    aria-label="Large" name='quantity'
                    placeholder='Quantity' onChange={e=>{this.handleInput(e)}} />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <button type="button" className="btn btn-primary" onClick={e=>this.onSubmit()}>Primary</button>
                </div>
            </div>
            </div>
        
        </>
    }
}

export default StockForm