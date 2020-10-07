import React, {useState} from 'react';
import IconButton from "../common/IconButton";
import AddSanctionModal from "./AddSanctionModal";
import {toast, ToastOptions} from "react-toastify";
import "./SanctionsView.css"

export type Sanction = {
    userEmail: string,
    endDate: Date,
    reason: string
}

const SanctionsView = () => {

    const [sanctionModalState, setSanctionModalState] = useState<boolean>(false)

    const onAddSanctionSuccess = (sanction:Sanction) => {
        notifySuccess("Se ha sancionado al alumno/a exitosamente!")
    }

    const onAddSanctionError = () => {
        notifyError("Hubo un error, intente de nuevo")
    }

    const toastifyConfiguration: ToastOptions = {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "sanctionToast"
    }

    const notifySuccess = (message: string) => toast.success(message, toastifyConfiguration);
    const notifyError = (message: string) => toast.error(message, toastifyConfiguration);

    return(
        <div className={"sanctions-view"}>
            <IconButton icon={"fas fa-plus-circle"} onClick={()=>setSanctionModalState(true)}/>
            <AddSanctionModal isOpen={sanctionModalState} onClose={()=>setSanctionModalState(false)} onSuccess={onAddSanctionSuccess} onError={onAddSanctionError}/>
        </div>
    )
}

export default SanctionsView;