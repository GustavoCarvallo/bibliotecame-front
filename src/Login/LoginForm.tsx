import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {post} from "../utils/http";
import ErrorBox from "../common/ErrorBox/ErrorBox";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";

type Props = {
    whereTo: string
}

function LoginForm(props: Props){

    const history = useHistory();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hasError, setHasError] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === "" || email === "") {
            setHasError(true);
        } else {
            const promise = post("auth/", {
                    email: email,
                    password: password
                },
                {noAuth: true});

            promise.then(res => {
                setHasError(false);
                localStorage.setItem('token', res.accessToken.token);
                localStorage.setItem('admin', res.admin);
                localStorage.setItem('fullName', res.fullName);
                history.replace(props.whereTo);
                history.go(0);
            })
                .catch(() => {
                    setHasError(true)
                })
        }
    }


    return (
        <div className={"login-form"}>
            <ErrorBox error={"Las credenciales ingresadas no son correctas"} show={hasError}/>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <InputWithIcon icon={"fas fa-envelope icon"} onChange={e => setEmail(e.target.value)} value={email} placeholder={"Ingrese su correo electrónico"}/>
                    <InputWithIcon icon={"fas fa-lock icon"} isPassword={true} onChange={e => setPassword(e.target.value)} value={password} placeholder={"Ingrese su contraseña"}/>
                </div>

                <button type="submit" className="button">Iniciar Sesión</button>

            </form>
        </div>
    )
}

export default LoginForm;
