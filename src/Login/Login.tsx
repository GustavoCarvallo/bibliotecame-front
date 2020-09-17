import React from 'react'
import "./Login.css";
import {toast, ToastContainer} from "react-toastify";
import LoginForm from "./LoginForm";
import "../common/Notify.css"
import {useLocation, useHistory} from 'react-router-dom';

function Login() {

    const location = useLocation();
    const history = useHistory();
    const urlExtend = location.search;
    const isSuccessSignUp : boolean = urlExtend === "?successfulSignUp";
    const isSuccessDelete : boolean = urlExtend === "?successfulDelete";

    const notifySignUp = () => toast.success('Se ha registrado exitosamente!', {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined});

    const notifyDelete = () => toast.info('Lamentamos que te hayas ido… Eperamos verte pronto nuevamente!', {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined});

    if(isSuccessSignUp){
        notifySignUp();
        history.replace(location.pathname);
    }

    if(isSuccessDelete){
        notifyDelete();
        history.replace(location.pathname);
    }

    return (
        <div className={"login-screen"}>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
            />
            <h1 className={"Title"}>Bibliotecame</h1>
            <div className="Rectangle-1">
                <h2 className="sub-title"> Iniciar Sesión</h2>
                <LoginForm whereTo="/home"/>
            </div>
        </div>
    )
}

export default Login;