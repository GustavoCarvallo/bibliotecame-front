import React from 'react';
import "./GreenButton.css";

type Props = {
    label: string,
    onClick: ()=>void
    disabled?: boolean,
}

const GreenButton = (props: Props) => {
    return(
        <button className='generic-green-button' disabled={props.disabled} onClick={props.onClick}>
            {props.label}
        </button>
    )
}

export default GreenButton;
