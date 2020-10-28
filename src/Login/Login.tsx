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
    const isSuccessVerification: boolean = urlExtend === "?successfulVerification";
    const isUnsuccessVerification: boolean = urlExtend === "?unsuccessfulVerification";

    const notifyInfo = (message: string) => {
        toast.dismiss();
        toast.info(message);
    }

    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message);
    }

    const notifyVerification = () => {
        toast.dismiss();
        toast.success('Tu cuenta ha sido verificada correctamente, ya puede iniciar sesión!');
    }

    if (isSuccessSignUp) {
        notifyInfo('Recuerde verificar su cuenta antes de ingresar!');
        history.replace(location.pathname);
    }

    if(isSuccessVerification){
        notifyVerification();
        history.replace(location.pathname);
    }

    if(isUnsuccessVerification){
        notifyError('El token no es valido');
        history.replace(location.pathname);
    }

    if (isSuccessDelete) {
        notifyInfo('Lamentamos que te hayas ido… Eperamos verte pronto nuevamente!');
        history.replace(location.pathname);
    }

    return (
        <div className={"login-screen"}>
            <h1 className={"Title"}>Bibliotecame</h1>
            <div className="Rectangle-1">
                <h2 className="sub-title"> Iniciar Sesión</h2>
                <LoginForm whereTo="/book"/>
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
