import React from 'react';
import "./InputWithIcon.css";

type Props = {
    disabled?: boolean,
    value?: string,
    onChange?: (event: any)=>void,
    icon: string,
    placeholder?: string,
}

const InputWithIcon = (props: Props) => {
    return(
        <div className={"field-container" + (props.disabled? "-disabled":"")}>
            <i className={`${props.icon} icon`} style={{color: props.value && props.value !== "" ? '#030303' : '#a4a8ad'}}/>
            <input className={"input"} disabled={props.disabled} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>
        </div>
    )
}

export default InputWithIcon;
