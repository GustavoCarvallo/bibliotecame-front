import React, {useState} from 'react';
import {post} from "../utils/http";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";
import {toast} from "react-toastify";

interface User {
    email: string,
    password:string,
    firstName: string,
    lastName: string,
    phoneNumber: string
}

const UserForm = () => {

    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [user, setUser] = useState<User>({email:"", password:"",phoneNumber:"",  firstName:"", lastName:""})

    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password1 !== password2) notifyError("Las contraseñas no coinciden");
        else if (!password1.match(/^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,}$/)) notifyError("¡La contraseña debe ser mayor que 6 e incluir numero y letras!");
        else if(user.firstName === "" ||
                  user.lastName === "" ||
                  user.email === "" ||
                  user.phoneNumber === "" ||
                  password1 === "" ||
                  password2 === "") notifyError("Debe completar todos los campos");
        else if(!user.email.match(/^[\w-.]+@([\w-]+\.austral.edu.)+[\w-]{2,4}$/)) notifyError("El email no pertenece a la organización o no es válido");
        else {

            const promise = post("signup/", {
                    email: user.email,
                    password: password1,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber
                },
                {headers: {"Content-Type": "application/json"}, noAuth: true});
            promise
                .then(() => {
                    window.history.pushState("", "", "/login?successfulSignUp")
                    window.location.reload();
                })
                .catch((error) => {
                        notifyError(error);
                })
        }
    }

    const onChangePassword = (pass : string, num : number) => {
        if(num === 1){
            setPassword1(pass);
        } else setPassword2(pass);
    }

    const onChangeUser = (value : string, num : number) => {
        if(num === 1){
            setUser({firstName: value, lastName: user.lastName, email: user.email, password: "", phoneNumber: user.phoneNumber})
        } else if(num === 2){
            setUser({firstName: user.firstName, lastName: value, email: user.email, password: "", phoneNumber: user.phoneNumber})
        } else if (num ===3){
            setUser({firstName: user.firstName, lastName: user.lastName, email: value, password: "", phoneNumber: user.phoneNumber})
        } else {
            setUser({firstName: user.firstName, lastName: user.lastName, email: user.email, password: "", phoneNumber: value})
        }
    }

    function isActive() {
        return user.firstName !== "" && user.lastName !== "" &&
            user.email !== "" && user.phoneNumber !== "" &&
            password1 !== "" && password2 !== "";

    }

    const buttonStyleDeactivated = {
        color: '#48a3fb', backgroundColor: '#e4e9f0'
    }
    const buttonStyleActivated = {
        color: '#ffffff', backgroundColor: '#48a3fb'
    }
    return (
        <div className={"form-content"}>
            <form onSubmit={handleSubmit}>
                <div className="signup-input-container">
                    <InputWithIcon icon={"fas fa-user"} value={user.firstName} onChange={e => onChangeUser(e.target.value, 1)} placeholder={"Nombre"}/>
                    <InputWithIcon icon={"fas fa-user"} value={user.lastName} onChange={e => onChangeUser(e.target.value, 2)} placeholder={"Apellido"}/>
                    <InputWithIcon icon={"fas fa-envelope"} value={user.email} onChange={e => onChangeUser(e.target.value, 3)} placeholder={"Correo Electrónico"}/>
                    <InputWithIcon icon={"fas fa-phone-alt"} value={user.phoneNumber} onChange={e => onChangeUser(e.target.value, 4)} placeholder={"Teléfono"}/>
                    <InputWithIcon icon={"fas fa-lock"} isPassword={true} value={password1} onChange={e => onChangePassword(e.target.value, 1)} placeholder={"Contraseña"}/>
                    <InputWithIcon icon={"fas fa-lock"} isPassword={true} value={password2} onChange={e => onChangePassword(e.target.value, 2)} placeholder={"Confirmar contraseña"}/>

                </div>

                <button type="submit" className="button" style={isActive() ? buttonStyleActivated : buttonStyleDeactivated} disabled={!isActive()}>Registrarme</button>

            </form>
        </div>
    )

}

export default UserForm;
