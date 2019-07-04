import React from 'react'

const Stocks = props =>{
    return <>
        <div class='col-6' style={{backgroundColor:'yellow',padding:'5%'}}>
            <div class='row' style={{minHeight:'5vh'}}>
                <div class='col-8' style={{backgroundColor:"blue"}}></div>
                <div class='col-4' style={{backgroundColor:"orange"}}></div>
            </div>
            <div class='row' style={{minHeight:'5vh'}}>
                <div class='col-8' style={{backgroundColor:"pink"}}></div>
                <div class='col-4' style={{backgroundColor:"turquoise"}}></div>
            </div>
        </div>
    </>
}

export default Stocks