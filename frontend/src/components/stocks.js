import React from 'react'
import Stock from './stock';

const Stocks = props => {
    const stockList = props.data;

    return (
        <>
            <div className='col-6' style={{backgroundColor:'whitesmoke',padding:'5%',borderRight:'1px solid black'}}>
                {stockList.map( (e,i) =>{
                    return <Stock obj={e}  key={i}/>
                })}
            </div>
        </>
    )
    
}

export default Stocks