import React from 'react'
import {Link, useHistory, useParams} from "react-router-dom";
import {put} from "../../utils/http";
import {toast} from "react-toastify";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import GreyAndBlueButton from "../../common/Buttons/GreyAndBlueButton/GreyAndBlueButton";
import './NewPassword.css'

const NewPassword = () => {

    const [password1, setPassword1] = React.useState<string>("")
    const [password2, setPassword2] = React.useState<string>("")
    const history = useHistory();
    const {token} = useParams();

    const changePassword = () => {
        if(password1 !== password2) notifyError('Las contraseñas no coinciden')
        else if(!password1.match(/^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,}$/)) notifyError('¡La contraseña debe ser mayor que 6 e incluir numero y letras!')
        else {
            put(`reset/${token}`, {password: password1})
                .then(() => {
                    history.push("/login?successfulReset")
                })
                .catch(error => {
                    notifyError(error)
                })
        }
    }

    const notifyError = (message: string) => {
        toast.dismiss()
        toast.error(message)
    }

    return (
        <div className={"new-screen"}>
            <h1 className={"Title"}>Bibliotecame</h1>
            <div className="Rectangle-1">
                <div className={'form'}>
                    <h2 className="sub-title"> Nueva Contraseña</h2>
                    <InputWithIcon icon={'fas fa-lock'}
                                   placeholder={'Ingrese su nueva contraseña'}
                                   value={password1}
                                   onChange={e => setPassword1(e.target.value)} isPassword={true}/>
                    <InputWithIcon icon={'fas fa-lock'}
                                   placeholder={'Repita su contraseña'}
                                   value={password2}
                                   onChange={e => setPassword2(e.target.value)} isPassword={true}/>
                    <GreyAndBlueButton label={'Continuar'} onClick={changePassword} disabled={password1==='' || password2===''}/>
                </div>
                <div className={"register-button"}>
                    <Link to={'/login'}>
                        <span>Iniciar Sesion</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default NewPassword;