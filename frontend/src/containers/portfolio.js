import React from 'react'
import Stockform from '../components/buyStockComp/buystockform'
import Stocks from '../components/showStocks/stocks'
import AuthContext from '../contexts/authContext'
import Service from '../services/service'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Portfolio extends React.Component{
    static contextType = AuthContext
    state = {
        pubToken:'pk_36cce85f17164c5a815a8c420668ac38',
        data:null,
        email:null,
        balance:null,
        total:null,
        purchaseError:null,
        loading:true
    }


    refreshState = (email) =>{
        const getStocks =  Service.getStocks(email)
        const getUserBalance = Service.getUser(email)
        Promise.all([getStocks,getUserBalance])
        .then(res_arr=>{
            const stock_list = res_arr[0].data
            this.updateTotalStocks(stock_list)
            .then(total=>{
                const balance = res_arr[1].data[0].balance
                
                this.setState({
                    data:stock_list,
                    purchaseError:null,
                    balance:balance,
                    total:total,
                    loading:false
                })
            })
            
        }) 
    }



    purchaseStock = (email,ticker,quantity) =>{
        const {balance,pubToken} = this.state
        axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${pubToken}`)
        .then(res=>{
            const price = res.data.latestPrice
            if(balance > price * quantity){
                const newBalance = balance - (price*quantity)
                Service.updateStocksNBalance(email,ticker,quantity,newBalance)
                .then(()=>{
                    Service.postTrans(email,ticker,quantity,price)
                    this.refreshState(email)
                })
            }
            else this.setState({purchaseError:'Balance too low'})
        })
        .catch(err=> this.setState({purchaseError:'Could not purchase stock'}))
    }


    updateTotalStocks = (data) =>{
        const pubToken = 'pk_36cce85f17164c5a815a8c420668ac38'
        
        const promises = data.map(e=>{
            return axios.get(`https://cloud.iexapis.com/stable/stock/${e.stock}/quote?token=${pubToken}`)
        })
        return Promise.all(promises)
        .then(res_arr=>{
            const total =  res_arr.reduce((acc,e,i)=>{
                const currPrice = e.data.latestPrice;
                const qty = data[i].shares;
                return acc + currPrice*qty;
            }, 0)
            return total.toFixed(2)

        })
    }

    render(){
        return (
            <AuthContext.Consumer>
                {
                    user=>{
                        if(user) {
                            const email = user.email
                            const {data,balance,total,purchaseError,loading} = this.state;
                            if(!data && !balance && !total){
                                this.refreshState(email)
                                return ''
                            }
                            else{
                                const purchaseStock = this.purchaseStock;
                               
                                if(loading) return ''
                                else {
                                    return <>
                                    <div className='container mt-5' style={{backgroundColor:'#98ccd3'}}>
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
                            
                        }

                    }
                }
            </AuthContext.Consumer>
        )


        
    }
}

export default Portfolio;