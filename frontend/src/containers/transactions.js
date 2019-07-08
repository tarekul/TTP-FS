import React from 'react'
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
                this.setState({transactions:res.data})
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
                            <li className="list-group-item" style={{border:0}} key={i}>
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