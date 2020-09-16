import React, {useState} from 'react'
import PasswordToggle from "../common/PasswordToggle";
import {post} from "../utils/http";

type LogInfo = {
    email: string,
    password: string
}

type Props = {
    whereTo: string
}

function LoginForm(props: Props){

    const [PasswordInputType, ToggleIcon] = PasswordToggle();
    const [logInfo, setLogInfo] = useState<LogInfo>({email: "", password: ""});
    const [error, setError] = useState<string>("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (logInfo.password === "") {
            setError("Las credenciales ingresadas no son correctas");
        } else if (logInfo.email === "") {
            setError("Las credenciales ingresadas no son correctas");
        } else {
            const promise = post("auth/", {
                    email: logInfo.email,
                    password: logInfo.password
                },
                {headers: {"Content-Type": "application/json"}, noAuth: true});

            promise.then(res => {
                setError("");
                localStorage.setItem('token', res.accessToken.token);
                localStorage.setItem('admin', res.admin);
                window.history.pushState("", "", props.whereTo);
                window.location.reload();
            })
                .catch(() => {
                    setError("Las credenciales ingresadas no son correctas")
                })
        }
    }

    const changeInfo = (value: string, num: number) => {
        if(num === 1){
            setLogInfo({email:value, password: logInfo.password});
        } else setLogInfo({email:logInfo.email, password: value});
    }



    return (
        <div>
            <div className="error" hidden={error === ""}><h3 className="error-message">{error}</h3></div>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <div className="Rectangle-2">
                        <i className="fas fa-user icon"> </i>
                        <input className="Input" value={logInfo.email} onChange={e => changeInfo(e.target.value, 1)}
                               placeholder="Ingrese su correo electrónico"/>
                    </div>
                    <div className="Rectangle-2" key="pas2">
                        <i className="fas fa-lock icon"> </i>
                        <input className="Password"  type={PasswordInputType.toString()} value={logInfo.password} onChange={e => changeInfo(e.target.value, 2)}
                               placeholder="Ingrese su contraseña"/>
                        <span className="icon">{ToggleIcon}</span>
                    </div>

                </div>

                <button type="submit" className="Rectangle-6">
                    <p className="Registrarme">Iniciar Sesión</p>
                </button>

            </form>
        </div>
    )
}

export default LoginForm;