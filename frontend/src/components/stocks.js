import React from 'react'
import Stock from './stock';

class Stocks extends React.Component{
   render(){
        const stockList = this.props.data
        return (
            <>
                <div className='col-6' style={{backgroundColor:'whitesmoke',padding:'5%',borderRight:'1px solid black'}}>
                    {stockList.map((e,i) =>{
                        console.log(e)
                        return <Stock obj={e} key={i}/>
                    })}
                </div>
            </>
        )
    }
    
    
}

export default Stocks