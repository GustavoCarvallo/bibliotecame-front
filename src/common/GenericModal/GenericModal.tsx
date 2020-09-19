import React, {FunctionComponent} from 'react';
import ReactModal from "react-modal";
import "./GenericModal.css";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    title: String,
    withHeader?: boolean
}
const GenericModal: FunctionComponent<Props> = ({isOpen, onClose, title, children, withHeader}) => {

    const constStyles = {
        content: {
            border: 'solid 1px #707070',
            borderRadius: '18px',
            boxShadow: '10px 10px 6px 0 rgba(0, 0, 0, 0.16)',
            padding: 0,
            width: 'fit-content',
            position: 'unset'
        },
        overlay: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            style={Object.assign(constStyles)}
            onRequestClose={onClose}
        >
            {
                withHeader ?
                    <div className={'modal-header'}>
                        {title && <h1 className={"modal-title"}>{title}</h1>}
                    </div>:
                    title && <h1 className={"modal-title"}>{title}</h1>

            }
            {children}
        </ReactModal>
    )
}

export default GenericModal;
