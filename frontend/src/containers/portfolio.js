import React from 'react'
import Stockform from '../components/buystockform'
import Stocks from '../components/stocks'
import AuthContext from '../contexts/authContext'

class Portfolio extends React.Component{
    static contextType = AuthContext
    state = {
        stocks_avail:true
    }

    componentDidMount(){
        
        console.log('here',this.context)
    }
    render(){
        const {stocks_avail} = this.state
        return <>
            <div class='container mt-5'>
                <h1 class="display-4">Portfolio</h1>
                <div class='row' style={{minHeight:'72vh',backgroundColor:'red'}}>
                    {stocks_avail ? <Stocks /> : <div class='col-6' style={{backgroundColor:'yellow',padding:'5%'}}>
                        <h2>No Stocks Yet</h2>
                        </div>}
                    <div class='col' style={{backgroundColor:'black'}}></div>
                    <Stockform />
                </div>
            </div>
      </>
    }
}

export default Portfolio;