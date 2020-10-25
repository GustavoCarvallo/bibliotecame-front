import React, {ReactElement} from 'react';
import "./ReminderButton.css";
import GenericModal from "../../common/GenericModal/GenericModal";
import {get} from "../../utils/http";


type Props = {
    label: string,
    disabled: boolean,
    success: (message: string) =>void,
    error: (message: string) =>void,
}

type ModalInfo = {
    open: boolean,
    title?: string,
    body?: ReactElement<any>
}
const ReminderButton = (props: Props) => {

    const [modalInfo, setModalInfo] = React.useState<ModalInfo>({
        open: false,
    });

    const closeModal = () => {
        setModalInfo({open: false})
    }

    const sendReminders = () =>{
        get("loan/delayed/notify")
            .then(res =>{
                props.success(`¡Se enviaron ${res} emails correctamente!`)
            })
            .catch(err =>{
                props.error(err)
            })
        closeModal()
    }

    const openModal = () => {
        setModalInfo({open: true,
        title: "Enviar Recordatorios",
        body: <div className={"reminder-modal-body"}>
            <p className="text">Se enviarán emails a todos los alumnos que tengan
                al menos 1 préstamo atrasado, para recordarles
                qué deben devolver los ejemplares.</p>
            <p className={"text"}>¿Está seguro que desea continuar?</p>
            <div className={"reminder-modal-button-container"}>
                <button className={"reminder-modal-red-button"} onClick={closeModal}>Cancelar</button>
                <button className={"reminder-modal-green-button"} onClick={sendReminders}>Confirmar</button>
            </div>
        </div>})
    }


        if(!props.disabled){
            return <div></div>
        }
        else return(
        <div>
            <button className={"reminder-button"} onClick={openModal}>
                {props.label}
            </button>
            <GenericModal title={modalInfo.title ?? ""} withHeader={false} isOpen={modalInfo.open}
                          onClose={closeModal}>
                {modalInfo.body}
            </GenericModal>
        </div>
        )
}

export default ReminderButton;
