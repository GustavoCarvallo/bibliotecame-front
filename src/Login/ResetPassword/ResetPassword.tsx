import React from 'react'
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import GreyAndBlueButton from "../../common/Buttons/GreyAndBlueButton/GreyAndBlueButton";
import {post} from "../../utils/http";
import {toast} from "react-toastify";
import {Link, useHistory} from 'react-router-dom';
import './ResetPassword.css'

const ResetPassword = () => {
    const [awaitingServerResponse, setAwaitingServerResponse] = React.useState<boolean>(false);

    const [email, setEmail] = React.useState<string>("")
    const history = useHistory();

    const sendEmail = () => {
        setAwaitingServerResponse(true);
        post(`user/forgot/${email}`, {})
            .then(res => {
                history.push("/login?successfulResetStart");
                setAwaitingServerResponse(false);
            })
            .catch(error => {
                notifyError(error);
                setAwaitingServerResponse(false);
            })
    }

    const notifyError = (message: string) => {
        toast.dismiss()
        toast.error(message)
    }

    return (
        <div className={"reset-screen"}>
            <h1 className={"Title"}>Bibliotecame</h1>
            <div className="Rectangle-1">
                <div className={'form'}>
                    <h2 className="sub-title"> Restaurar Contraseña</h2>
                    <InputWithIcon icon={'fas fa-envelope'}
                                   placeholder={'Ingrese su correo electrónico'}
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}/>
                   <GreyAndBlueButton label={'Continuar'} onClick={sendEmail} disabled={email==='' || awaitingServerResponse} loading={awaitingServerResponse}/>
                </div>
                <div className={"register-button"}>
                    <Link to={'/login'}>
                        <span>Iniciar Sesion</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ResetPassword;
