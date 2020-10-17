import React from 'react';
import "./GreyAndBlueButton.css";

type Props = {
    label: string,
    onClick: ()=>void
    disabled?: boolean,
}

const GreyAndBlueButton = (props: Props) => {
    return(
        <button className='generic-grey-and-blue-button' disabled={props.disabled} onClick={props.onClick}>
            {props.label}
        </button>
    )
}

export default GreyAndBlueButton;
