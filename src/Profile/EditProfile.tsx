import React from 'react';
import "../Book/CreateOrEditBook.css";
import "./EditProfile.css"
import {Profile} from "./Profile";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";
import {toast, ToastOptions} from "react-toastify";


type Props = {
    profile: Profile,
    setProfile: Function,
    handleSubmit: Function,
    type: string,
    handleCancel: () => void
}

type Errors = {
    nameError: boolean,
    lastNameError: boolean,
    passwordLengthError: boolean,
    passwordMatchError: boolean,
    phoneNumberError: boolean,
    alphanumericError: boolean,
    serverError?: string,
}

const initialErrors = {
    nameError: false,
    lastNameError: false,
    passwordLengthError: false,
    passwordMatchError: false,
    phoneNumberError: false,
    alphanumericError: false,
};

const EditProfile = (props: Props) => {
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,}$/);
    const [errors, setErrors] = React.useState<Errors>({...initialErrors});

    const handleSubmit = () => {
        let newErrors = validateProfile(props.profile);
        let valid = !newErrors.nameError && !newErrors.lastNameError && !newErrors.passwordLengthError && !newErrors.passwordMatchError && !newErrors.phoneNumberError && !newErrors.alphanumericError;
        if (valid) {
            props.handleSubmit(props.profile, handleSuccess, (status: string) => renderError(status))
        }else {
            setErrors(newErrors);
        }
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifySuccess = (message: string) => {
        toast.dismiss();
        toast.success(message, toastifyConfiguration);
    }

    const renderError = (message: string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
    }

    const handleSuccess = () => {
        notifySuccess('El perfil se ha modificado correctamente');
        setErrors({...initialErrors, serverError: undefined})
    }

    const validateProfile = (profile: Profile) => {
        let nameError: boolean = false;
        let lastNameError: boolean = false;
        let passwordLengthError: boolean = false;
        let passwordMatchError: boolean = false;
        let phoneNumberError: boolean = false;
        let alphanumericError: boolean = false;

        if (!profile.firstName || profile.firstName === "") {
            nameError = true;
            renderError("Completar nombre");
        }
        if (!profile.lastName || profile.lastName === "") {
            lastNameError = true;
            renderError("Completar apellido");
        }
        if (!profile.password || profile.password.length < 7) {
            passwordLengthError = true;
            renderError("La contraseña debe tener más de 6 caracteres!");
        }
        if (profile.password !== confirmPassword) {
            passwordMatchError = true;
            renderError("Las contraseñas deben coincidir!");
        }
        if (!profile.phoneNumber || profile.phoneNumber === "") {
            phoneNumberError = true;
            renderError("Ingrese su número de telefono!")
        }
        if (!profile.password || !regexp.test(profile.password)) {
            alphanumericError = true;
            renderError("La contraseña solo puede incluir letras y/o números!");
        }

        const newErrors: Errors = {
            nameError,
            lastNameError,
            passwordLengthError,
            passwordMatchError,
            phoneNumberError,
            alphanumericError
        }

        return newErrors;
    }

    function isActive(){
        return ( props.profile.firstName!=="" &&
            props.profile.lastName!=="" &&
            props.profile.password!=="" &&
            props.profile.phoneNumber!=="" &&
            confirmPassword!=="")
    }

    const buttonStyleDeactivated = {
        color: 'var(--app-green)', backgroundColor: 'var(--app-grey)'
    }
    const buttonStyleActivated = {
        color: '#ffffff', backgroundColor: 'var(--app-green)'
    }

    return (
        <div className={"edit-profile-screen"}>
            <div className={"update-profile-title"}>{'Mis Datos'}</div>
            <div className={"edit-profile-body"}>
                <div className="edit-profile-grid">
                    <InputWithIcon icon={"fas fa-user"}
                                   placeholder={"Nombre"}
                                   value={props.profile.firstName}
                                   onChange={event => props.setProfile({
                                       ...props.profile,
                                       firstName: event.target.value
                                   })}/>

                    <InputWithIcon icon={"fas fa-user"}
                                   placeholder="Apellido"
                                   value={props.profile.lastName}
                                   onChange={event => props.setProfile({
                                       ...props.profile,
                                       lastName: event.target.value
                                   })}/>
                    <InputWithIcon
                        icon={"fas fa-envelope"}
                        placeholder="Email"
                        readonly={true}
                        value={props.profile.email}/>
                    <InputWithIcon
                        icon={"fas fa-phone-alt"}
                        placeholder="Telefono"
                        value={props.profile.phoneNumber}
                        onChange={event => props.setProfile({...props.profile, phoneNumber: event.target.value})}/>
                    <InputWithIcon
                        icon={"fas fa-lock"}
                        placeholder="Contraseña"
                        value={props.profile.password}
                        onChange={event => props.setProfile({...props.profile, password: event.target.value})}
                        isPassword={true}/>
                    <InputWithIcon
                        icon={"fas fa-lock"}
                        placeholder="Confirmar contraseña"
                        isPassword={true}
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                </div>
                <button className="rectangle-6" onClick={handleSubmit} disabled={!isActive()} style={isActive() ? buttonStyleActivated : buttonStyleDeactivated}>
                    <p className="save-button">{'Guardar cambios'}</p>
                </button>
            </div>
        </div>
    )
}

export default EditProfile;
