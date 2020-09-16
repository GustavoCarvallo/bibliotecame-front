import React, {FunctionComponent} from 'react';
import ReactModal from "react-modal";
import "./GenericModal.css";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    title: String,
    styles?: Object,
}
const GenericModal: FunctionComponent<Props> = ({isOpen, onClose, title, styles, children}) => {

    const constStyles = {
        content: {
            border: 'solid 1px #707070',
            borderRadius: '18px',
            boxShadow: '10px 10px 6px 0 rgba(0, 0, 0, 0.16)',
            padding: 0,
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            style={Object.assign(constStyles, styles)}
            onRequestClose={onClose}
        >
                <div className={"modal-header"}>
                    <h1 className={"modal-title"}>{title}</h1>
                </div>
                <div className={"modal-body"}>
                    {children}
                </div>
        </ReactModal>
    )
}

export default GenericModal;
