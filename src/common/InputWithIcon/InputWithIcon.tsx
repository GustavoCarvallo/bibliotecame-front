import React from 'react';
import "./InputWithIcon.css";
import PasswordToggle from "../PasswordToggle";

type Props = {
    value?: string,
    onChange?: (event: any) => void,
    icon: string,
    placeholder?: string,
    isPassword?: boolean,
    rightIcon?: boolean
    readonly?: boolean,
}

const InputWithIcon = (props: Props) => {

    const [PasswordInputType, ToggleIcon] = PasswordToggle();

    return (
        <div
            className={"generic-field-container" + ((!props.isPassword && props.rightIcon) ? " toRight" : "")}>
            <i className={`${props.icon} generic-field-icon`}
               style={{color: props.value && props.value !== "" ? '#030303' : '#a4a8ad'}}/>
            <div className="generic-field-input-container">
                <input className={props.isPassword ? "generic-password-input" : "generic-input"}
                       type={props.isPassword ? PasswordInputType.toString() : 'text'}
                       value={props.value}
                       onChange={props.onChange}
                       readOnly={props.readonly}
                       placeholder={props.placeholder}/>
            </div>
            <span className="generic-field-icon" hidden={!props.isPassword}>{ToggleIcon}</span>
        </div>
    )
}

export default InputWithIcon;
