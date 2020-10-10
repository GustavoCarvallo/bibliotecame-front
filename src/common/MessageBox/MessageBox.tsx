import React from 'react';
import "./MessageBox.css";

type Props = {
    message: string,
    severity: string,
    handleClose: ()=>void,
    //severity should be success or error
}

const MessageBox = (props: Props) => {

    return(
        <div className={`${props.severity}-message-box-container`}>
            <span className={`${props.severity}-message-box-text`}>{props.message}</span>
            <i className={`fas fa-times close-${props.severity}-box-icon`} onClick={props.handleClose}/>
        </div>
    )
}

export default MessageBox;
