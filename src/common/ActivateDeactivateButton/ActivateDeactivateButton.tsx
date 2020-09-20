import React from 'react'
import IconButton from "../IconButton";

type Props = {
    isActive: boolean
    activateFunction: () => void,
    deactivateFunction: ()=> void
}

const ActivateDeactivateButton = (props : Props) => {

    return <div className={"act-deact-button"}>
        {props.isActive ?
            (
                <IconButton icon={"fas fa-ban copies-ban"} onClick={props.deactivateFunction}/>
            ):(
                <IconButton icon={"fas fa-check-circle copies-check"} onClick={props.activateFunction}/>
            )
        }
    </div>

}

export default ActivateDeactivateButton;