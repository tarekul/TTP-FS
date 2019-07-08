import React from 'react'
import axios from 'axios'
import AuthContext from '../contexts/authContext'
import Service from '../services/service'

class Transactions extends React.Component{
    static contextType = AuthContext
    state = {
        transactions: [],
    }

    componentDidMount(){
        if(this.context){
            const email = this.context.email
            axios.get(`http://localhost:6003/transaction/${email}`)
            .then(res=>{
                this.setState({transactions:res.data}, ()=>{
                    console.log(this.state);
                })
            })
        }
        else{
            const email = Service.get_user()
            axios.get(`http://localhost:6003/transaction/${email}`)
            .then(res=>{
                this.setState({transactions:res.data}, ()=>{
                    console.log(this.state);
                })
            })
        }
        
    }

    render(){
        const transactions = this.state.transactions;
        return <>
            <div className='container mt-5'>
                {
                    transactions.map( (e,i) =>{
                        return <div class='row'>
                            {`Bought (${e.stock})  - ${e.shares} share${e.shares>1?'s':''}  @ $${e.price.toFixed(2)}`}
                        </div>
                    })
                }
            </div>
        </>
    }
}

export default Transactions