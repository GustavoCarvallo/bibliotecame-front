import React from 'react';
import "./InputWithIcon.css";
import PasswordToggle from "../PasswordToggle";

type Props = {
    disabled?: boolean,
    value?: string,
    onChange?: (event: any)=>void,
    icon: string,
    placeholder?: string,
    isPassword?: boolean,
    rightIcon?: boolean
}

const InputWithIcon = (props: Props) => {

    const [PasswordInputType, ToggleIcon] = PasswordToggle();

    return(
        <div className={"field-container" + (props.disabled? "-disabled":"") + ((!props.isPassword&&props.rightIcon)? " toRight": "")}>
            <i className={`${props.icon} icon`} style={{color: props.value && props.value !== "" ? '#030303' : '#a4a8ad'}}/>
            <input className={props.isPassword? "Password": "input"}
                   disabled={props.disabled}
                   type={props.isPassword? PasswordInputType.toString(): 'text'}
                   value={props.value}
                   onChange={props.onChange}
                   placeholder={props.placeholder}/>
            <span className="icon" hidden={!props.isPassword}>{ToggleIcon}</span>
        </div>
    )
}

export default InputWithIcon;
