import React from 'react';
import {post} from "../../utils/http";
import GenericModal from "../../common/GenericModal/GenericModal";

type Props = {
    id: number,
    defaultValue: boolean,
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

const ActivateOrDeactivateButton = (props: Props) => {
    const [active, setActive] = React.useState(props.defaultValue);
    const [modalOpen, setModalOpen] = React.useState(false);

    const activate = () => {
        post(`book/${props.id}/activate`,[],).then( () => {
                alert('El libro ha sido activado correctamente');
                setActive(true);
                closeActivateModal();
            }
        ).catch(error => {
            alert('El libro no pudo ser activado correctamente')
        })
    }

    const deactivate = () => {
        post(`book/${props.id}/deactivate`,[],).then( () => {
                alert('El libro ha sido desactivado correctamente');
                setActive(false);
                closeActivateModal();
            }
        ).catch(error => {
            alert('El libro no pudo ser desactivado correctamente')
        })
    }

    const renderModal = () => {
        return <GenericModal onClose={closeActivateModal}
                             isOpen={modalOpen} title={active? deactivateTitle:activateTitle} withHeader={false}>
            <div className={"activate-modal-body"}>
                <div className={"activate-modal-text-container"}><h4 className={"activate-modal-text"}>{active? deactivateText: activateText}</h4></div>
                <div className={"justify-button"}>
                    <button onClick={closeActivateModal} className={"rectangle-cancel"} >Cancelar</button>
                    <button onClick={active? (() => deactivate()) : (() => activate())} className={"rectangle-confirm"} >Confirmar</button>
                </div>
            </div>
        </GenericModal>}

    const openActivateModal = () => {
        setModalOpen(true);
    }

    const closeActivateModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            {renderModal()}
            <i className={active ?  "fas fa-ban search-book-red-icon" : "far fa-check-circle search-book-green-icon"}
               onClick={() => openActivateModal()}/>
        </>
    )
}

export default ActivateOrDeactivateButton;
