import React, {useState} from 'react';
import GenericModal from "../../common/GenericModal/GenericModal";
import "./CreateCopyModal.css";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
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
        if (id !== "") {
            props.onSuccess({id, booked: false, active:true});
        } else {
            props.onError();
        }
        setId("");
        props.onClose();
    }

    function isActive() {
        return (id !== "")
    }

    const [id, setId] = useState<string>("");

    return(
        <GenericModal title={"Nuevo Ejemplar"} isOpen={props.isOpen} onClose={props.onClose} withHeader>
            <div className={"new-copy-body"}>
                <h1>Libro:</h1>
                <InputWithIcon value={props.book.title} icon={'fas fa-book'} readonly={true}/>
                <h1>ID:</h1>
                <InputWithIcon value={id} icon={'fas fa-fingerprint'} onChange={event => setId(event.target.value.toUpperCase())} placeholder={"Id del ejemplar"}/>
                <div className={"buttons-container"}>
                    <CreateAndCancelButtons onCreate={handleCreate} onCancel={props.onClose} isActivated={isActive()}/>
                </div>
            </div>
        </GenericModal>
    )
}

export default CreateCopyModal;
