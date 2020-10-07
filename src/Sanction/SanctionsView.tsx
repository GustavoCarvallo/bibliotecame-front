import React, {useState} from 'react';
import IconButton from "../common/IconButton";
import AddSanctionModal from "./AddSanctionModal";
import "./SanctionsView.css"

export type Sanction = {
    userEmail: string,
    endDate: Date,
    reason: string
}

type Props = {
    onSuccess: (message:string) => void,
    onError: (message:string) => void
}

const SanctionsView = (props: Props) => {

    const [sanctionModalState, setSanctionModalState] = useState<boolean>(false)

    const onAddSanctionSuccess = (message: string) => {
        props.onSuccess(message)
    }

    const onAddSanctionError = (message: string) => {
        props.onError(message)
    }

    return(
        <div className={"sanctions-view"}>
            <IconButton icon={"fas fa-plus-circle"} onClick={()=>setSanctionModalState(true)}/>
            <AddSanctionModal isOpen={sanctionModalState} onClose={()=>setSanctionModalState(false)} onSuccess={onAddSanctionSuccess} onError={onAddSanctionError}/>
        </div>
    )
}

export default SanctionsView;