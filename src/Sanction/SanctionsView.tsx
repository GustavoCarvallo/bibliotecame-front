import React, {useState} from 'react';
import IconButton from "../common/IconButton";
import AddSanctionModal from "./AddSanctionModal";
import "./SanctionsView.css"
import {toast, ToastOptions} from "react-toastify";

export type Sanction = {
    userEmail: string,
    endDate: Date,
    reason: string
}

const SanctionsView = () => {

    const [sanctionModalState, setSanctionModalState] = useState<boolean>(false)

    const onAddSanctionSuccess = (message: string) => {
        notifySuccess(message)
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifySuccess = (message: string) => {
        toast.dismiss();
        toast.success(message, toastifyConfiguration);
    }
    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
    }

    return(
        <div className={"sanctions-view"}>
            <IconButton icon={"fas fa-plus-circle"} onClick={()=>setSanctionModalState(true)}/>
            <AddSanctionModal isOpen={sanctionModalState} onClose={()=>setSanctionModalState(false)} onSuccess={onAddSanctionSuccess}/>
        </div>
    )
}

export default SanctionsView;