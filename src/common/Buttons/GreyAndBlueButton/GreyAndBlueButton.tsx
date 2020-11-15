import React from 'react';
import "./GreyAndBlueButton.css";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

type Props = {
    label: string,
    onClick: ()=>void
    disabled?: boolean,
    loading?: boolean,
}

const GreyAndBlueButton = (props: Props) => {
    return(
        <button className='generic-grey-and-blue-button' disabled={props.disabled} onClick={props.onClick}>
            {props.loading && <LoadingIcon/>}
            {!props.loading && props.label}
        </button>
    )
}

export default GreyAndBlueButton;
