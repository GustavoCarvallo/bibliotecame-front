import React from 'react'
import "./Login.css";
import {toast, ToastContainer} from "react-toastify";
import LoginForm from "./LoginForm";
import "../common/Notify.css"

function Login() {

    const url = window.location.href;
    const urlParts = url.split('?');
    const isSuccessSignUp : boolean = urlParts[1] === "successfulSignUp";
    const isSuccessDelete : boolean = urlParts[1] === "successfulDelete";

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
        window.history.replaceState("","",urlParts[0])
    }

    if(isSuccessDelete){
        notifyDelete();
        window.history.replaceState("","",urlParts[0])
    }

    return (
        <div className={"the-body"}>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
            />
            <img src={"img/library-1.png"}
                 srcSet={"img/library-1@2x.png 2x,img/library-1@3x.png 3x"}
                 className="library-1" alt=""/>
            <h1 className="Bibliotecame">Bibliotecame</h1>
            <div className="Rectangle-1">
                <h2 className="Registro"> Iniciar Sesión</h2>
                <LoginForm whereTo="/home"/>
            </div>
        </div>
    )
}

export default Login;