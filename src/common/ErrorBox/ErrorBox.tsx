import React, {useEffect} from "react";
import "./ErrorBox.css"

type Props = {
    error: string,
    show: boolean,
    hideErrorBox: () => void;
}

const TIMEOUT = 3000;

const ErrorBox = (props: Props) => {
    const error = props.error;
    const show = props.show;

    useEffect(() => {
        const timer = setTimeout(() => {
                props.hideErrorBox();
            }, TIMEOUT);
        return () => {
            clearTimeout(timer)
        }
    }, [show]);

    return (
        <div className={`error-container ${show ? 'show': 'hide'}`}>
            {error && <span className={"error-text"}>{error}</span>}
            <button className={'error-button'} onClick={props.hideErrorBox}><i className="fas fa-times"> </i></button>
        </div>
    )
};

export default ErrorBox;