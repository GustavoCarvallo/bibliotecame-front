import React from 'react'
import IconButton from "../IconButton";
import ReactTooltip from "react-tooltip";

type Props = {
    isActive: boolean
    activateFunction: () => void,
    deactivateFunction: ()=> void
}

const ActivateDeactivateButton = (props : Props) => {

    return <div className={"act-deact-button"}>
        <ReactTooltip/>
        {props.isActive ?
            (
                <IconButton icon={"fas fa-ban copies-ban"} onClick={props.deactivateFunction} tooltip={"Deshabilitar"}/>
            ):(
                <IconButton icon={"fas fa-check-circle copies-check"} onClick={props.activateFunction} tooltip={    "Habilitar"}/>
            )
        }
    </div>

}

export default ActivateDeactivateButton;
