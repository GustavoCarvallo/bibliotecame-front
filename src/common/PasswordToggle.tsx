import React, {useState} from 'react';
import ReactTooltip from "react-tooltip";


const PasswordToggle = () => {
    const [visible, setVisibility] = useState<boolean>(false);

    const Icon = (
        <>
            <ReactTooltip/>
            <i className={visible ? "fas fa-eye-slash" : "fas fa-eye"}
               onClick={() => setVisibility(visible => !visible)} data-tip={visible ? "Esconder contraseña" : "Ver contraseña"}/>
        </>
    );

    const InputType: string = visible ? "text" : "password";

    return [InputType, Icon];
};

export default PasswordToggle;
