import React from 'react';
import "./CreateAndCancelButtons.css";

type Props = {
    onCreate: ()=>void,
    onCancel: ()=>void,
    createLabel?: string,
    cancelLabel?: string,
    isActivated?: boolean
}

const CreateAndCancelButtons = (props: Props) => {

    const buttonStyleDeactivated = {
        color: '#48a3fb', backgroundColor: '#e4e9f0'
    }
    const buttonStyleActivated = {
        color: '#ffffff', backgroundColor: '#48a3fb'
    }

    return(
        <div className={"save-and-cancel-buttons"}>
            <button className="rectangle-6-red" onClick={props.onCancel}>
                <p className="cancel-button">{props.cancelLabel ?? 'Cancelar'}</p>
            </button>
            <button className="rectangle-6" onClick={props.onCreate} style={props.isActivated ? buttonStyleActivated : buttonStyleDeactivated}>
                <p className="save-button">{props.createLabel ?? 'Guardar'}</p>
            </button>
        </div>
    )
}

export default CreateAndCancelButtons;
