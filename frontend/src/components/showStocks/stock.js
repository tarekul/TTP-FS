import React from 'react'
import axios from 'axios';

export default class Stock extends React.Component{
    state = {
        stock: '',
        shares: '',
        color: '',
        currentPrice: ''
    }

    componentDidMount(){
        const {stock, shares} = this.props.obj;
        this.getOpenCurrPrice(stock, shares);
    }

    componentWillReceiveProps(nextProps){
        const {stock, shares} = nextProps.obj;
        this.getOpenCurrPrice(stock, shares);
    }

    
    getOpenCurrPrice = (stock, shares) =>{
        //const getOpenPrice = axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=WXV4KNTDLX5R5A3N`)
        const getCurrentPrice = axios.get(`https://cloud.iexapis.com/stable/stock/${stock}/quote?token=pk_36cce85f17164c5a815a8c420668ac38`)

        Promise.all([getCurrentPrice])
        .then(([res2])=>{
            const currentPrice = res2.data.latestPrice
            this.setState({stock, shares, color:'black', currentPrice: currentPrice })
        })
        .catch(err=>console.log(err))
    }

    render() {
        const {stock, shares, color, currentPrice} = this.state;

        return <>
            <div className='row' style={{display:'flex',alignItems:'center',borderBottom:'1px solid black',padding:'20px',color:color,fontWeight:700}}>
                <div className='col-8'>{`${stock} - ${shares}`}</div>
                <div className='col-4'>{`$${(shares*currentPrice).toFixed(2)}`}</div>
            </div>
        </>
    }
}