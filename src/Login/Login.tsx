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

    const notifySignUp = () => {
        toast.dismiss();
        toast.success('Se ha registrado exitosamente!');
    }

    const notifyDelete = () => {
        toast.dismiss();
        toast.info('Lamentamos que te hayas ido… Eperamos verte pronto nuevamente!');
    }

    if (isSuccessSignUp) {
        notifySignUp();
        history.replace(location.pathname);
    }

    if (isSuccessDelete) {
        notifyDelete();
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
