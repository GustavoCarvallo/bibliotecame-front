import React from 'react'
import './SignUp.css'
import UserForm from './UserForm';

function SignUp() {

    return (
        <div className={"the-body"}>
            <img src={"img/library-1.png"}
                 srcSet={"img/library-1@2x.png 2x,img/library-1@3x.png 3x"}
                 className="library-1" alt=""/>
            <h1 className="Bibliotecame">Bibliotecame</h1>
            <div className="registration-box">
                <h2 className="Registro"> Registro</h2>
                <UserForm/>
            </div>
        </div>
    )
}

export default SignUp;