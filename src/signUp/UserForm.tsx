import React, {useState} from 'react';
import {postAndGetStatus} from "../utils/http";
import PasswordToggle from "./PasswordToggle";

interface User {
    email: string,
    password:string,
    firstName: string,
    lastName: string,
    phoneNumber: string
}

const UserForm = () => {

    const BAD_REQUEST = 400;
    const SUCCESS = 200;

    const [PasswordInputType1, ToggleIcon1] = PasswordToggle();
    const [PasswordInputType2, ToggleIcon2] = PasswordToggle();
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [user, setUser] = useState<User>({email:"", password:"",phoneNumber:"",  firstName:"", lastName:""})
    const [error, setError] = useState<string>("")


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password1 !== password2) {
            setError("Las contraseñas no coinciden");
        } else {

            const promise = postAndGetStatus("signup/", {
                    email: user.email,
                    password: password1,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber
                },
                {headers: {"Content-Type": "application/json"}, noAuth: true});


            promise.then(res => {
                if (res === BAD_REQUEST) {
                    if (user.firstName === "" || user.lastName === "" || user.email === "" || user.phoneNumber === "" || password1 === "") {
                        setError("Por favor completar todos los campos")
                    } else if (!user.email.includes(".austral.edu.") || !user.email.includes("@")) {
                        setError("El email no pertenece a la organización o no es válido")
                    } else if (!/^([a-zA-Z0-9]{6,})$/.test(password1)) {
                        setError("Contraseña debe ser alfanumérica de 6 caracteres mínimo")
                    }

                } else if (res === SUCCESS) {
                    setError("");
                    window.history.pushState("", "", "/login?successfulSignUp")
                    window.location.reload();
                } else {
                    setError("Error inesperado, intente de nuevo.");
                }
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


    return (
        <div>
            <div className="error" hidden={error === ""}><h3 className="error-message">{error}</h3></div>
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <div className="Rectangle-2">
                        <i className="fas fa-user icon"> </i>
                        <input className="Input" value={user.firstName}  onChange={e => onChangeUser(e.target.value, 1)} placeholder="Nombre"/>
                    </div>
                    <div className="Rectangle-2">
                        <i className="fas fa-user icon"> </i>
                        <input className="Input" value={user.lastName} onChange={e => onChangeUser(e.target.value, 2)} placeholder="Apellido"/>
                    </div>
                    <div className="Rectangle-2">
                        <i className="fas fa-envelope icon"> </i>
                        <input className="Input" value={user.email} onChange={e => onChangeUser(e.target.value, 3)} placeholder="Correo Electrónico"/>
                    </div>
                    <div className="Rectangle-2">
                        <i className="fas fa-phone-alt icon"> </i>
                        <input className="Input" value={user.phoneNumber} onChange={e => onChangeUser(e.target.value, 4)} placeholder="Teléfono"/>

                    </div>
                    <div className="Rectangle-2" key="pas1">
                        <i className="fas fa-lock icon"> </i>
                        <input className="Password" defaultValue={password1} type={PasswordInputType1.toString()}
                               placeholder="Contraseña" onChange={e => onChangePassword(e.target.value, 1)}/>
                        <span className="icon">{ToggleIcon1}</span>
                    </div>
                    <div className="Rectangle-2" key="pas2">
                        <i className="fas fa-lock icon"> </i>
                        <input className="Password" defaultValue={password2} type={PasswordInputType2.toString()}
                               placeholder="Confirmar contraseña" onChange={e => onChangePassword(e.target.value, 2)}/>
                        <span className="icon">{ToggleIcon2}</span>
                    </div>

                </div>

                <button type="submit" className="Rectangle-6">
                    <p className="Registrarme">Registrarme</p>
                </button>

            </form>
        </div>
    )

}

export default UserForm;