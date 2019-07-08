import React from 'react'
import Stockform from '../components/buystockform'
import Stocks from '../components/stocks'
import AuthContext from '../contexts/authContext'
import Service from '../services/service'
import axios from 'axios'

class Portfolio extends React.Component{
    static contextType = AuthContext
    state = {
        data:[],
        email:'',
        balance:0,
        total:0
    }

    componentDidMount(){
        this.refreshState(this.context,true)
    }

    refreshState = (context,getBalance=false) =>{
        const email = context ? this.context.email : Service.get_user('email')
        if(context) Service.save_user(email)
        console.log(email)
        this.setState({email:email})
        Service.getStocks(email)
        .then(res=>{
            this.updateTotalStocks(res.data)
            this.setState({data:res.data})
        })
        if(getBalance){
            //console.log(email)
            Service.getUser(email)
            .then(res=>{
                if(res.data[0].length > 0){
                    const balance = res.data[0].balance
                    this.setState({balance:balance})
                }
                
            })
        }
    }


    stockupdate = () =>{
        this.refreshState(this.context)
    }

    updateTotalStocks = (data) =>{
        const pubToken = 'pk_36cce85f17164c5a815a8c420668ac38'
        
        const promises = data.map(e=>{
            return axios.get(`https://cloud.iexapis.com/stable/stock/${e.stock}/price?token=${pubToken}`)
        })
        Promise.all(promises)
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
        const {data,email,balance,total} = this.state;
        const stockupdate = this.stockupdate;
        return <>
            <div class='container mt-5'>
                <h3 class="display-6">{`Portfolio ($${total})`}</h3>
                <div class='row' style={{minHeight:'72vh',backgroundColor:'red'}}>
                    {data.length > 0  ? 
                        <Stocks data={data} updateTotalStocks={this.updateTotalStocks} /> 
                        : 
                        <div class='col-6' style={{backgroundColor:'snow',padding:'5%'}}>
                            <h2>No Stocks Yet</h2>
                        </div>}
                    <Stockform {...{email, stockupdate, balance}} />
                </div>
            </div>
      </>
    }
}

export default Portfolio;