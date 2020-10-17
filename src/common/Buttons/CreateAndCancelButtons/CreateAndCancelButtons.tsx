import React from 'react';
import "./CreateAndCancelButtons.css";
import RedButton from "../RedButton/RedButton";
import GreyAndBlueButton from "../GreyAndBlueButton/GreyAndBlueButton";

type Props = {
    onCreate: ()=>void,
    onCancel: ()=>void,
    createLabel?: string,
    cancelLabel?: string,
    isActivated?: boolean
}

const CreateAndCancelButtons = (props: Props) => {
    return(
        <div className={"save-and-cancel-buttons"}>
            <RedButton label={props.cancelLabel ?? 'Cancelar'} onClick={props.onCancel}/>
            <GreyAndBlueButton onClick={props.onCreate} label={props.createLabel ?? 'Guardar'} disabled={!props.isActivated}/>
        </div>
    )
}

export default CreateAndCancelButtons;
