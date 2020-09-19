import React from 'react'
import {Copy} from "../Book";
import GenericModal from "../../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../../common/CreateAndCancelButtons/CreateAndCancelButtons";
import "./ActivateDeactivateCopyModal.css"

type Props = {
    isOpen: boolean,
    onClose: ()=>void,
    copy: Copy,
    onSuccess: Function,
    onError: Function,
    isActive: boolean
}

const ActivateDeactivateCopyModal = (props: Props) => {

    const handleChange = () => {
        if(props.copy.isBooked){
            props.onError();
        } else {
            props.onSuccess({id:props.copy.id, isBooked: props.copy.isBooked, isActive: !props.copy.isActive});
        }
        props.onClose();
    }

    return(
        <GenericModal title={props.isActive? "Habilitar Ejemplar" : "Deshabilitar Ejemplar"} isOpen={props.isOpen} onClose={props.onClose}>
            <div className={"act-deact-copy-body"}>
                <p className={"text"}>¿Estas seguro que quieres {props.isActive? "habilitar" : "deshabilitar" } el ejemplar?</p>
                <p className={"text"}>Ten en cuenta que el ejemplar {props.isActive? "empezará a" : "dejará de" } estar disponible para ser reservado.</p>
                <CreateAndCancelButtons onCreate={handleChange} onCancel={props.onClose} createLabel={"Confirmar"}/>
            </div>
        </GenericModal>
    )
}

export default ActivateDeactivateCopyModal;