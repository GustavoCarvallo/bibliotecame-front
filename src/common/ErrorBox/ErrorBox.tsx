import React from "react";
import "./ErrorBox.css"

interface Props {
    error: string;
    show: boolean;
}

const ErrorBox = (props: Props) => {
    const {error, show} = props;

    return (
        <div className={`error-box ${show ? 'show': 'hide'}`}>
            {error && <span className={"error-text"}>{error}</span>}
        </div>
    )
};

export default ErrorBox;