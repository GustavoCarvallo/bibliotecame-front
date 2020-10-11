import React from 'react';
import "../Book/CreateOrEditBook.css";
import "./EditProfile.css"
import ErrorBox from "../common/ErrorBox/ErrorBox";
import {Profile} from "./Profile";
import PasswordToggle from "../common/PasswordToggle";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";


type Props = {
    profile: Profile,
    setProfile: Function,
    handleSubmit: Function,
    type: string,
    handleCancel: () => void,
    setSuccess: Function,
}

type Errors = {
    nameError: boolean,
    lastNameError: boolean,
    passwordLengthError: boolean,
    passwordMatchError: boolean,
    phoneNumberError: boolean,
    alphanumericError: boolean,
    serverError?: number,
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
    const regexp = new RegExp(/^([a-zA-Z0-9]){6,}$/);
    const [errors, setErrors] = React.useState<Errors>({...initialErrors});
    const [PasswordInputType, ToggleIcon] = PasswordToggle();
    const [PasswordInputType2, ToggleIcon2] = PasswordToggle();

    const handleSubmit = () => {
        let newErrors = validateProfile(props.profile);
        let valid = !newErrors.nameError && !newErrors.lastNameError && !newErrors.passwordLengthError && !newErrors.passwordMatchError && !newErrors.phoneNumberError && !newErrors.alphanumericError;
        if (valid) {
            props.handleSubmit(props.profile, handleSuccess, (status: number) => setErrors({
                ...newErrors,
                serverError: status
            }))
        } else {
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

    return (
        <div className={"edit-profile-screen"}>
            <div className={"update-profile-title"}>{'Mis Datos'}</div>
            <div className={"box"}>
                {errorChecker(errors)}
            </div>
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
            return ("Comprobar los datos que fueron introducidos")
        default:
            return ("Error del servidor")
    }
}

const errorChecker = (errors: Errors) => {
    let message = "";
    if (errors.passwordMatchError) message = "Las contraseñas deben coincidir!";
    if (errors.alphanumericError) message = "La contraseña solo puede incluir letras y/o números!";
    if (errors.passwordLengthError) message = "La contraseña debe tener más de 6 caracteres!";
    if (errors.phoneNumberError) message = "Inserte su número de telefono!";
    if (errors.lastNameError) message = "Completar apellido";
    if (errors.nameError) message = "Completar nombre";
    if (errors.serverError) message = renderStatusError(errors.serverError);
    if (message === "") {
        return;
    }
    return renderError(message);
}

const renderError = (message: string) => {
    return (
        <ErrorBox error={message} show={true}/>
    )
}

export default EditProfile;
