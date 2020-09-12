import React from 'react';
import ReactModal from "react-modal";
import "./GenericModal.css";

type Props = {
    isOpen: boolean,
    onClose: Function,
    title: String,
}
const GenericModal = (props: Props) => {

    const styles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            border: 'solid 1px #707070',
            borderRadius: '18px',
            boxShadow: '10px 10px 6px 0 rgba(0, 0, 0, 0.16)',
            padding: 0,
            display: 'flex',
        }
    }

    return (
        <ReactModal
            isOpen={props.isOpen}
            style={styles}
        >
            <div className={"header"}>
                <h2 className={"title"}>{props.title}</h2>
            </div>
            <div className={"body"}>

            </div>
        </ReactModal>
    )
}

export default GenericModal;
