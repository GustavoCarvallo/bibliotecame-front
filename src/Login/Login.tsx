import React from 'react'
import "./Login.css";
import {toast} from "react-toastify";
import LoginForm from "./LoginForm";
import "../common/Notify.css"
import {useLocation, useHistory, Link} from 'react-router-dom';


function Login() {

    const location = useLocation();
    const history = useHistory();
    const urlExtend = location.search;
    const isSuccessSignUp: boolean = urlExtend === "?successfulSignUp";
    const isSuccessDelete: boolean = urlExtend === "?successfulDelete";
    const isSuccessResetStart: boolean = urlExtend === "?successfulResetStart";
    const isSuccessReset: boolean = urlExtend === "?successfulReset";

    const notifySuccess = (message: string) => {
        toast.dismiss();
        toast.success(message);
    }
    const notifyInfo = (message: string) => {
        toast.dismiss();
        toast.info(message);
    }

    if (isSuccessSignUp) {
        notifySuccess('Se ha registrado exitosamente!');
        history.replace(location.pathname);
    }else if (isSuccessDelete) {
        notifyInfo('Lamentamos que te hayas ido… Eperamos verte pronto nuevamente!');
        history.replace(location.pathname);
    }else if (isSuccessResetStart) {
        notifySuccess('Restauración de contraseña iniciada, revise su casilla de correo!');
        history.replace(location.pathname);
    }else if (isSuccessReset) {
        notifySuccess('Se ha restaurado su contraseña correctamente!');
        history.replace(location.pathname);
    }

    return (
        <div className={"login-screen"}>
            <h1 className={"Title"}>Bibliotecame</h1>
            <div className="Rectangle-1">
                <h2 className="sub-title"> Iniciar Sesión</h2>
                <LoginForm whereTo="/book"/>
                <div className={"reset-password-button"}>
                    <Link to={'forgotPassword'} className={'forgot'}>
                        <span>¿Has olvidado tu contraseña?</span>
                    </Link>
                </div>
                <div className={"register-button"}>
                    <Link to={'signup'}>
                        <span>¿Deseas Registrarte?</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
