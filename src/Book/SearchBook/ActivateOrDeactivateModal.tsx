import React from 'react';
import {ActivateInformation} from "./SearchBookTable";
import GenericModal from "../../common/GenericModal/GenericModal";
import {post} from "../../utils/http";

type Props = {
    open: boolean,
    setOpen: (open: boolean)=>void,
    activateInformation?: ActivateInformation,
}

const activateTitle = "Habilitar Libro";
const deactivateTitle = "Deshabilitar Libro";

const activateText = "¿Estas seguro que quieres habilitar el libro?\n" +
    "Ten en cuenta que el libro pasará a ser visible\n" +
    "para los usuarios alumnos.\n";
const deactivateText = "¿Estas seguro que quieres deshabilitar el libro?\n" +
    "\n" +
    "Ten en cuenta que el libro dejará de ser visible\n" +
    "para los usuarios alumnos.\n";

const ActivateOrDeactivateModal = (props: Props) => {

    const closeActivateModal = () => {
        props.setOpen(false);
    }

    const activate = () => {
        post(`book/${props.activateInformation?.id}/activate`,[]).then( () => {
                alert('El libro ha sido activado correctamente');
                props.activateInformation?.callBack(true);
                closeActivateModal();
            }
        ).catch((error) => {
                alert(error);
        })
    }

    const deactivate = () => {
        post(`book/${props.activateInformation?.id}/deactivate`,[]).then( () => {
                alert('El libro ha sido desactivado correctamente');
                props.activateInformation?.callBack(false);
                closeActivateModal();
            }
        ).catch((error) => {
                alert(error);
        })
    }


    return <GenericModal onClose={closeActivateModal}
                         isOpen={props.open} title={props.activateInformation?.active? deactivateTitle:activateTitle} withHeader={false}>
        <div className={"activate-modal-body"}>
            <div className={"activate-modal-text-container"}><h4 className={"activate-modal-text"}>{props.activateInformation?.active? deactivateText: activateText}</h4></div>
            <div className={"justify-button"}>
                <button onClick={closeActivateModal} className={"rectangle-cancel"} >Cancelar</button>
                <button onClick={props.activateInformation?.active? (() => deactivate()) : (() => activate())} className={"rectangle-confirm"} >Confirmar</button>
            </div>
        </div>
    </GenericModal>
}

export default ActivateOrDeactivateModal;
