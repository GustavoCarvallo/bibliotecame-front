import React from 'react'
import './SignUp.css'
import UserForm from './UserForm';
import {Link} from "react-router-dom";

function SignUp() {

    return (
        <div className={"signup-screen"}>
            <h1 className="unauth-Title">Bibliotecame</h1>
            <div className="registration-box">
                <h2 className="unauth-sub-title"> Registro</h2>
                <UserForm/>
                <div className={"register-button"}>
                    <Link to={'login'}>
                        <span>Ya tengo una cuenta</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;