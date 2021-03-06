import React from 'react';
import "./CreateAndCancelButtons.css";
import RedButton from "../RedButton/RedButton";
import GreenButton from "../GreenButton/GreenButton";

type Props = {
    onCreate: () => void,
    onCancel: () => void,
    createLabel?: string,
    cancelLabel?: string,
    isActivated?: boolean,
}

const CreateAndCancelButtons = (props: Props) => {
    return (
        <div className={"save-and-cancel-buttons"}>
            <RedButton label={props.cancelLabel ?? 'Cancelar'} onClick={props.onCancel}/>
            <GreenButton onClick={props.onCreate} label={props.createLabel ?? 'Guardar'} disabled={!props.isActivated}/>
        </div>
    )
}

export default CreateAndCancelButtons;
