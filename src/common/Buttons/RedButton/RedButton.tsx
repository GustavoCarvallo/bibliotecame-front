import React from 'react';
import "./RedButton.css";

type Props = {
    label: string,
    onClick: () => void
}

const RedButton = (props: Props) => {
    return (
        <button className="generic-red-button" onClick={props.onClick}>
            {props.label}
        </button>
    )
}

export default RedButton;
