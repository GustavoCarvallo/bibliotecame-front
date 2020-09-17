import React from 'react'
import './SignUp.css'
import UserForm from './UserForm';

function SignUp() {

    return (
        <div className={"signup-screen"}>
            <h1 className="Title">Bibliotecame</h1>
            <div className="registration-box">
                <h2 className="sub-title"> Registro</h2>
                <UserForm/>
            </div>
        </div>
    )
}

export default SignUp;