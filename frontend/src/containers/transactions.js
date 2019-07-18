import React from 'react'
import AuthContext from '../contexts/authContext'
import Service from '../services/service'

class Transactions extends React.Component{
    static contextType = AuthContext
    state = {
        history:null
    }

    render(){
        const {history} = this.state
        return <AuthContext.Consumer>
            {
                user=>{
                    if(user){
                        if(!history){
                            Service.getTrans(user.email)
                            .then(res=>{
                                this.setState({history:res.data})
                            })
                        }
                        else if(history){
                            return <>
                                <div className='container mt-5'>
                                <ul class="list-group" style={{padding:'0px'}}>
                                    {
                                        history.map((e,i) =>{
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
                }
            }
        </AuthContext.Consumer>
        
    }
}

export default Transactions