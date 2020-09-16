import React from 'react';
import "../Book/CreateOrEditBook.css";
import "./CreateOrEditProfile.css"
import {Profile} from "./Profile";

type Props = {
    profile: Profile,
    setProfile: Function,
    handleSubmit: Function,
    type: string,
    handleCancel: ()=>void,
    setSuccess: Function,
}

type Errors = {
    nameError: boolean,
    lastNameError: boolean,
    passwordLengthError: boolean,
    passwordMatchError: boolean,
    phoneNumberError: boolean,
    serverError?: number,
}

const initialErrors = {
    nameError: false,
    lastNameError: false,
    passwordLengthError: false,
    passwordMatchError: false,
    phoneNumberError: false,
};

const CreateOrEditProfile = (props: Props) => {
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    const [errors, setErrors] = React.useState<Errors>({...initialErrors})

    const handleSubmit = () => {
        props.setProfile({...props.profile, password: password})
        let newErrors = validateProfile(props.profile);
        let valid = !newErrors.nameError && !newErrors.lastNameError && !newErrors.passwordLengthError && !newErrors.passwordMatchError && !newErrors.phoneNumberError;
        if (valid) {
            props.handleSubmit(props.profile, handleSuccess, (status: number) => setErrors({...newErrors, serverError: status}))
        }else {
            setErrors(newErrors);
        }
    }

    const handleSuccess = () => {
        props.setSuccess(true);
        setErrors({...initialErrors, serverError: undefined})
    }

    const validateProfile = (profile: Profile) => {
        let nameError: boolean = false;
        let lastNameError: boolean = false;
        let passwordLengthError: boolean = false;
        let passwordMatchError: boolean = false;
        let phoneNumberError: boolean = false;


        if (!profile.firstName || profile.firstName === "") {
            nameError = true;
        }
        if (!profile.lastName || profile.lastName === "") {
            lastNameError = true;
        }
        if (!password || password.length<7) {
            passwordLengthError = true;
        }
        if (password !== confirmPassword) {
            passwordMatchError = true;
        }
        if (!profile.phoneNumber || profile.phoneNumber === "") {
            phoneNumberError = true;
        }

        const newErrors: Errors = {
            nameError,
            lastNameError,
            passwordLengthError,
            passwordMatchError,
            phoneNumberError
        }

        return newErrors;
    }

    return (
        <div className={"create-book"}>
            <div className={"update-profile-title"}>{'Mis Datos'}</div>
            {(errors.nameError && renderError("Completar nombre")) ||
            (errors.lastNameError && renderError("Completar apellido")) ||
            (errors.passwordLengthError && renderError("La contraseña debe tener más de 6 caracteres!")) ||
            (errors.passwordMatchError && renderError("Las contraseñas deben coincidir!")) ||
            (errors.serverError && renderStatusError(errors.serverError))
            }
            <div>
                <div className="box">
                    <div className="rectangle-2">
                        <i className="fas fa-user"></i>
                        <input className="input" placeholder="Nombre" value={props.profile.firstName}
                               onChange={event => props.setProfile({...props.profile, firstName: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-user"/>
                        <input className="input" placeholder="Apellido" value={props.profile.lastName}
                               onChange={event => props.setProfile({...props.profile, lastName: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-envelope"/>
                        <input className="input" placeholder="Email" readOnly value={props.profile.email}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-phone-alt"/>
                        <input className="input" placeholder="Telefono" value={props.profile.phoneNumber}
                               onChange={event => props.setProfile({...props.profile, phoneNumber: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-lock"/>
                        <input className="input" placeholder="Contraseña" value={password}
                               onChange={event => setPassword(event.target.value)}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-lock"/>
                        <input className="input" placeholder="Confirmar contraseña" value={confirmPassword}
                               onChange={event => setConfirmPassword(event.target.value)}/>
                    </div>
                </div>
                <button className="rectangle-6" onClick={handleSubmit}>
                    <p className="save-button">{'Guardar cambios'}</p>
                </button>
            </div>
        </div>
    )
}

const renderStatusError = (status: number) => {
    switch (status) {
        case 400:
            return renderError("Comprobar los datos que fueron introducidos")
        default:
            return renderError("Error del servidor")
    }
}

const renderError = (message: string) => {
    return (
        <div className={"error-box"}>
            <div className={"error-message"}>{message}</div>
        </div>
    )
}

export default CreateOrEditProfile;
