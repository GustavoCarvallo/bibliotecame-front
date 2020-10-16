import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {post} from "../utils/http";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";
import {toast} from "react-toastify";

type Props = {
    whereTo: string,
}

function LoginForm(props: Props) {

    const history = useHistory();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === "" || email === "") {
            notifyError("Las credenciales ingresadas no son correctas")
        } else {
            const promise = post("auth/", {
                    email: email,
                    password: password
                },
                {noAuth: true});

            promise.then(res => {
                localStorage.setItem('token', res.accessToken.token);
                localStorage.setItem('admin', res.admin);
                localStorage.setItem('fullName', res.fullName);
                history.push(props.whereTo);
            }).catch(err => {
                notifyError(err);
            })
                .catch(err => {
                    notifyError(err)
                })
        }
    }

    const notifyError = (message: string) => {
        toast.dismiss()
        toast.error(message)
    }

    const buttonStyleDeactivated = {
        color: '#48a3fb', backgroundColor: '#e4e9f0'
    }
    const buttonStyleActivated = {
        color: '#ffffff', backgroundColor: '#48a3fb'
    }

    return (
        <div className={"login-form-screen"}>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-input-container">
                    <InputWithIcon icon={"fas fa-envelope icon"} onChange={e => setEmail(e.target.value)} value={email}
                                   placeholder={"Ingrese su correo electrónico"}/>
                    <InputWithIcon icon={"fas fa-lock icon"} isPassword={true}
                                   onChange={e => setPassword(e.target.value)} value={password}
                                   placeholder={"Ingrese su contraseña"}/>
                </div>

                <button type="submit" className="button" style={(email !== "" && password !== "") ? buttonStyleActivated : buttonStyleDeactivated}>Iniciar Sesión</button>

            </form>
        </div>
    )
}

export default LoginForm;
