import React from 'react'
import Stockform from '../components/buystockform'
import Stocks from '../components/stocks'
import AuthContext from '../contexts/authContext'
import Service from '../services/service'
import axios from 'axios'

class Portfolio extends React.Component{
    static contextType = AuthContext
    state = {
        pubToken:'pk_36cce85f17164c5a815a8c420668ac38',
        data:[],
        email:null,
        balance:0,
        total:0,
        purchaseError:null,
        loading:true
    }

    componentDidMount(){
        if(this.context) this.refreshState(true)
    }

    componentDidUpdate(pp, ps){
        const {email} = this.state
        if(!email && this.context) this.refreshState(true)
    }


    refreshState = (getBalance=false) =>{
        const {email} = this.state
        if(!email && this.context){
            this.setState({email:this.context.email})
        }
        
        Service.getStocks(email || this.context.email)
        .then(res=>{
            this.updateTotalStocks(res.data)
            .then(()=>this.setState({data:res.data,purchaseError:null,loading:false}))
            
        })
        if(getBalance){
            Service.getUser(email || this.context.email)
            .then(res=>{
                console.log(res.data)
                if(res.data.length > 0){
                    const balance = res.data[0].balance
                    this.setState({balance:balance})
                }
            })
        }
    }

    toggleLoading = () => this.setState({loading:false})


    purchaseStock = (ticker,quantity) =>{
        const {email} = this.context 
        const {balance,pubToken} = this.state
        axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${pubToken}`)
        .then(res=>{
            const price = res.data
            if(balance > price * quantity){
                const newBalance = balance - (price*quantity)
                Service.updateStocksNBalance(email,ticker,quantity,newBalance)
                .then(()=>this.refreshState(true))
            }
            else this.setState({purchaseError:'Balance too low'})
        })
        .catch(err=>{
            this.setState({purchaseError:'Could not purchase stock'})
        })
    }


    updateTotalStocks = (data) =>{
        const pubToken = 'pk_36cce85f17164c5a815a8c420668ac38'
        
        const promises = data.map(e=>{
            return axios.get(`https://cloud.iexapis.com/stable/stock/${e.stock}/price?token=${pubToken}`)
        })
        return Promise.all(promises)
        .then(res_arr=>{
            const new_total = res_arr.reduce((acc,e,i)=>{
                const currPrice = e.data;
                const qty = data[i].shares;
                return acc + currPrice*qty;
            }, 0)

            this.setState({total:new_total.toFixed(2)})
        })
    }

    render(){
        const {data,email,balance,total,purchaseError,loading} = this.state;
        const purchaseStock = this.purchaseStock;
        if(loading) return ''
        else return <>
            <div className='container mt-5'>
                <h3 className="display-6">{`Portfolio ($${total})`}</h3>
                <div className='row' style={{minHeight:'72vh',backgroundColor:'whitesmoke'}}>
                    {data.length > 0  ? 
                        <Stocks data={data} updateTotalStocks={this.updateTotalStocks}/> 
                        : 
                        <div className='col-6' style={{backgroundColor:'whitesmoke',padding:'5%'}}>
                            <h2>No Stocks Yet</h2>
                        </div>}
                    <Stockform {...{email,purchaseStock, balance,purchaseError}} />
                </div>
            </div>
      </>
    }
}

export default Portfolio;