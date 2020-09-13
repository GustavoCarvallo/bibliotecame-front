import React from "react";
import "../Book_Temporal/BookScreen.css"

interface Props {
    icon: String,
    onClick : Function
}

const IconButton = (props: Props) => {
    return (<i className={`${props.icon} button-icon`} onClick={()=> props.onClick()}>
    </i>)
}

export default IconButton;
