import React from "react";
import Modal from 'react-modal';
import "./Modal.css"

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        border: 'solid 1px #707070',
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        boxShadow: '10px 10px 6px 0 rgba(0, 0, 0, 0.16)'
}

};


interface Props {
    title: String,
    text: String,
    onClick : ()=>void,
    button: JSX.Element
}

Modal.setAppElement('body')


const ModalComponent = (props: Props) => {

    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal(){
        setIsOpen(false);
    }

    function confirmModal(){
        props.onClick();
        setIsOpen(false);
    }

    return (
        <div>
            <div onClick={openModal}>
                {props.button}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">

                <div className={"justify"}>
                    <h2 className={"title"}>{props.title}</h2>
                </div>
                <div className={"justify"}><h4 className={"text"}>{props.text}</h4></div>
                <div className={"justify-button"}>

                    <button onClick={closeModal} className={"rectangle-cancel"} >Cancelar</button>
                    <button onClick={confirmModal} className={"rectangle-confirm"} >Confirmar</button>
                </div>
            </Modal>
        </div>
    );
}

export default ModalComponent;
