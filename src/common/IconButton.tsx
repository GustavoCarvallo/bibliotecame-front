import React from "react";
import "../Book/BookScreen.css"
import "./IconButton.css"
import ReactTooltip from "react-tooltip";

interface Props {
    icon: String,
    onClick: Function,
    tooltip?: string,
}

const IconButton = (props: Props) => {
    return (<>
        <ReactTooltip/>
        <i className={`${props.icon} button-icon icon-button-pointer`} onClick={() => props.onClick()} data-tip={props.tooltip ?? undefined}/>
    </>)
}

export default IconButton;
