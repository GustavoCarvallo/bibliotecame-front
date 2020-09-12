import React from 'react';
import "./CreateAndCancelButtons.css";

type Props = {
    onCreate: ()=>void,
    onCancel: ()=>void,
    createLabel?: string,
    cancelLabel?: string,
}

const CreateAndCancelButtons = (props: Props) => {
    return(
        <div className={"save-and-cancel-buttons"}>
            <button className="rectangle-6-red" onClick={props.onCancel}>
                <p className="cancel-button">{props.cancelLabel ?? 'Cancelar'}</p>
            </button>
            <button className="rectangle-6" onClick={props.onCreate}>
                <p className="save-button">{props.createLabel ?? 'Guardar'}</p>
            </button>
        </div>
    )
}

export default CreateAndCancelButtons;
