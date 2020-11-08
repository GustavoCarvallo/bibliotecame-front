import React from 'react'
import './AmountComponent.css'

type Props = {
    amount: number,
    icon: string,
    text: string
}

const AmountComponent = (props :Props) => {
    return <div className={"amount-component"}>
        <div className={"number-and-text"}>
            <div className={"number"}>{props.amount}</div>
            <div className={"text"}>{props.text}</div>
        </div>
        <div className={"icon-container"}>
            <i className={`fas fa-${props.icon} icon`}> </i>
        </div>
    </div>
}

export default AmountComponent;