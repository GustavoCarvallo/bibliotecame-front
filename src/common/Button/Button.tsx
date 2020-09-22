import React, {MouseEvent} from 'react';

type Props = {
    label: string,
    onClick?: (e: MouseEvent)=>void,
    className?: string,
}

const Button = (props: Props) => {
    return(
        <button className={props.className} onClick={props.onClick}>{props.label}</button>
    )
}

export default Button;
