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
        const email = this.context ? this.context.email : Service.get_user()
        Service.getTrans(email)
            .then(res=>{
                this.setState({transactions:res.data}, ()=>{
                    console.log(this.state);
                })
            })
        }

    render(){
        const {transactions} = this.state;
        return <>
            <div className='container mt-5'>
            <ul class="list-group" style={{padding:'0px'}}>
                {
                    transactions.map( (e,i) =>{
                        return <>
                            <li class="list-group-item">
                            {`Bought (${e.stock})  - ${e.shares} share${e.shares>1?'s':''}  @ $${e.price.toFixed(2)}`}
                            </li>
                        </>
                    })
                }
            </ul>
            </div>
        </>
    }
}

export default Transactions