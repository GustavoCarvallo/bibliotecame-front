import React, {useState} from 'react';
import GenericModal from "../../common/GenericModal/GenericModal";
import "./CreateCopyModal.css";
import CreateAndCancelButtons from "../../common/CreateAndCancelButtons/CreateAndCancelButtons";
import {Book} from "../Book";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";

type Props = {
    isOpen: boolean,
    onClose: ()=>void,
    book: Book,
    onSuccess: Function,
    onError: Function,
}
const CreateCopyModal = (props: Props) => {
    const handleCreate = () => {
        //here we post the copy ==> if success we call props.onSuccess, if error we call props.onError
        //just to test success and error messages:
        if (id !== "") {
            props.onSuccess({id, isBooked: false});
        } else {
            props.onError();
        }
        setId("");
        props.onClose();
    }

    const styles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-33.5%, -60%)',
            width: '800px',
            border: 'solid 1px #707070',
            borderRadius: '18px',
            boxShadow: '10px 10px 6px 0 rgba(0, 0, 0, 0.16)',
            padding: 0,
        }
    }

    const [id, setId] = useState<string>("");

    return(
        <GenericModal title={"Nuevo Ejemplar"} isOpen={props.isOpen} onClose={props.onClose} styles={styles}>
            <div className={"frame"}>
                <h1>Libro:</h1>
                <InputWithIcon value={props.book.title} icon={'fas fa-book'} disabled={true} isPassword={false}/>
                <h1>ID:</h1>
                <InputWithIcon value={id} icon={'fas fa-fingerprint'} onChange={event => setId(event.target.value.toUpperCase())} placeholder={"Id del ejemplar"} isPassword={false} />
                <CreateAndCancelButtons onCreate={handleCreate} onCancel={props.onClose}/>
            </div>
        </GenericModal>
    )
}

export default CreateCopyModal;
