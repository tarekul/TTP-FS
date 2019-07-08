import React from 'react'
import axios from 'axios';

export default class Stock extends React.Component{
    state = {
        stock: '',
        shares: '',
        color: '',
        currentPrice: '',
        pubToken:'pk_36cce85f17164c5a815a8c420668ac38'
    }

    componentDidMount(){
        const {stock, shares} = this.props.obj;
        console.log('inside component did mount for stock.js')
        this.getOpenCurrPrice(stock, shares);
    }
    
    componentWillReceiveProps(newProps){
        console.log('component will receive props what r u doing?');
        const {stock, shares} = newProps.obj

        this.getOpenCurrPrice(stock, shares);
    }
    
    getOpenCurrPrice = (stock, shares) =>{
        console.log('sharessssss', shares);
        const {pubToken} = this.state
        const openPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${stock}/ohlc?token=${pubToken}`)
        const currentPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${stock}/price?token=${pubToken}`)

        Promise.all([openPrice,currentPrice])
        .then(([res1, res2])=>{
            let color = '';

            if(res1.data.open.price < res2.data){
                color = 'green'
            } else if(res1.data.open.price > res2.data){
                color = 'red'
            } else {
                color = 'grey'
            }

            this.setState({stock, shares, color, currentPrice: res2.data, })

            
        })
    }

    render() {
        const {stock, shares, color, currentPrice} = this.state;

        return <>
            <div class='row' style={{display:'flex',alignItems:'center',borderBottom:'1px solid black',padding:'20px',color:color,fontWeight:700}}>
                <div class='col-8'>{`${stock} - ${shares}`}</div>
                <div class='col-4'>{`$${(shares*currentPrice).toFixed(2)}`}</div>
            </div>
        </>
    }
}