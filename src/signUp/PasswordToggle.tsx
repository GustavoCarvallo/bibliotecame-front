import React, {useState} from 'react';


    const PasswordToggle = () => {
        const [visible, setVisibility] = useState<boolean>(false);

        const Icon = (
            <i className={visible ? "fas fa-eye-slash" : "fas fa-eye"}
               onClick={() => setVisibility(visible => !visible)}> </i>
        );

        const  InputType : string = visible ? "text" : "password";

        return [InputType, Icon];
    };

    export default PasswordToggle;