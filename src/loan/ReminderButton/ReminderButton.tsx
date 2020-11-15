import React, {ReactElement} from 'react';
import "./ReminderButton.css";
import GenericModal from "../../common/GenericModal/GenericModal";
import {get} from "../../utils/http";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import LoadingIcon from "../../common/Buttons/LoadingIcon/LoadingIcon";


type Props = {
    label: string,
    disabled: boolean,
    success: (message: string) =>void,
    error: (message: string) =>void,
}

type ModalInfo = {
    open: boolean,
    title?: string,
    body?: ReactElement
}
const ReminderButton = (props: Props) => {
    const [awaitingServerResponse, setAwaitingServerResponse] = React.useState<boolean>(false);

    const [modalInfo, setModalInfo] = React.useState<ModalInfo>({
        open: false,
    });

    const closeModal = () => {
        setModalInfo({open: false})
    }

    const sendReminders = () =>{
        setAwaitingServerResponse(true);
        get("loan/delayed/notify")
            .then(res =>{
                props.success(`¡Se enviaron ${res} emails correctamente!`);
                setAwaitingServerResponse(false);
            })
            .catch(err =>{
                props.error(err)
                setAwaitingServerResponse(false);
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
            <CreateAndCancelButtons onCancel={closeModal} onCreate={sendReminders} createLabel={"Confirmar"} isActivated={true}/>
        </div>})
    }


        if(!props.disabled){
            return <></>
        }
        else return(
        <div>
            <button className={`reminder-button ${awaitingServerResponse? 'loading-button': ''}`} onClick={openModal} disabled={awaitingServerResponse}>
                {awaitingServerResponse && <LoadingIcon/>}
                {!awaitingServerResponse && props.label}
            </button>
            <GenericModal title={modalInfo.title ?? ""} withHeader={false} isOpen={modalInfo.open}
                          onClose={closeModal}>
                {modalInfo.body}
            </GenericModal>
        </div>
        )
}

export default ReminderButton;
