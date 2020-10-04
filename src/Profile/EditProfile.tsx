import React from 'react';
import "../Book/CreateOrEditBook.css";
import "./EditProfile.css"
import ErrorBox from "../common/ErrorBox/ErrorBox";
import {Profile} from "./Profile";
import PasswordToggle from "../common/PasswordToggle";


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
    const regexp = new RegExp(/^([a-zA-Z0-9]){6,}$/);
    const [errors, setErrors] = React.useState<Errors>({...initialErrors});
    const [PasswordInputType, ToggleIcon] = PasswordToggle();
    const [PasswordInputType2, ToggleIcon2] = PasswordToggle();

    const handleSubmit = () => {
        let newErrors = validateProfile(props.profile);
        let valid = !newErrors.nameError && !newErrors.lastNameError && !newErrors.passwordLengthError && !newErrors.passwordMatchError && !newErrors.phoneNumberError && !newErrors.alphanumericError;
        if (valid) {
            props.handleSubmit(props.profile, handleSuccess, (status: string) => setErrors({...newErrors, serverError: status}))
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
        let alphanumericError: boolean = false;

        if (!profile.firstName || profile.firstName === "") {
            nameError = true;
            renderError("Completar nombre");
        }
        if (!profile.lastName || profile.lastName === "") {
            lastNameError = true;
            renderError("Completar apellido");
        }
        if (!profile.password || profile.password.length<7) {
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
        if (!profile.password || !regexp.test(profile.password)){
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
            <div>
                <div className={"box"}>
                    {errorChecker(errors)}
                </div>
                <div className="box">

                    <div className="rectangle-2">
                        <i className="fas fa-user edit-profile-grey-icon"/>
                        <input className="input" placeholder="Nombre" value={props.profile.firstName}
                               onChange={event => props.setProfile({...props.profile, firstName: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-user edit-profile-grey-icon"/>
                        <input className="input" placeholder="Apellido" value={props.profile.lastName}
                               onChange={event => props.setProfile({...props.profile, lastName: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-envelope edit-profile-black-icon"/>
                        <input className="input" placeholder="Email" readOnly value={props.profile.email}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-phone-alt edit-profile-grey-icon"/>
                        <input className="input" placeholder="Telefono" value={props.profile.phoneNumber}
                               onChange={event => props.setProfile({...props.profile, phoneNumber: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-lock edit-profile-grey-icon"/>
                        <input className="input" placeholder="Contraseña"
                               onChange={event => props.setProfile({...props.profile, password: event.target.value})}
                               type={PasswordInputType.toString()}
                        />
                        <span className="icon">{ToggleIcon}</span>
                    </div>
                    <div className="rectangle-2">
                        <i className="fas fa-lock edit-profile-grey-icon"/>
                        <input className="input" placeholder="Confirmar contraseña" value={confirmPassword}
                               onChange={event => setConfirmPassword(event.target.value)}
                               type={PasswordInputType2.toString()}
                        />
                        <span className="icon">{ToggleIcon2}</span>
                    </div>
                </div>
                <button className="rectangle-6" onClick={handleSubmit}>
                    <p className="save-button">{'Guardar cambios'}</p>
                </button>
            </div>
        </div>
    )
}

const errorChecker = (errors : Errors) => {
    let message = "";
    if(errors.passwordMatchError) message="Las contraseñas deben coincidir!";
    if(errors.alphanumericError) message="La contraseña solo puede incluir letras y/o números!";
    if(errors.passwordLengthError) message="La contraseña debe tener más de 6 caracteres!";
    if(errors.phoneNumberError) message="Inserte su número de telefono!";
    if(errors.lastNameError) message="Completar apellido";
    if(errors.nameError) message= "Completar nombre";
    if(errors.serverError) message=errors.serverError;
    if(message===""){
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
