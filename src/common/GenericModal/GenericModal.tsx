import React, {FunctionComponent} from 'react';
import ReactModal from "react-modal";
import "./GenericModal.css";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    title: String,
    withHeader?: boolean,
    titleClassName?: string,
}
const GenericModal: FunctionComponent<Props> = ({isOpen, onClose, title, children, withHeader, titleClassName}) => {

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
                        {title && <span className={"modal-title"}>{title}</span>}
                    </div>:
                    title && <div className={"modal-header-transparent"}>
                        <span className={`modal-title ${titleClassName ?? ''}`}>{title}</span>
                        <i className="fas fa-times close-modal-icon" onClick={onClose}/>
                    </div>

            }
            {children}
        </ReactModal>
    )
}

export default GenericModal;
