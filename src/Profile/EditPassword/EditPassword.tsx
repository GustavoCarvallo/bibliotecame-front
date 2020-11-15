import React from 'react';
import GenericModal from "../../common/GenericModal/GenericModal";
import {Profile} from "../Profile";
import {toast} from "react-toastify";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import "./EditPassword.css";
import {put} from "../../utils/http";

type Props = {
    profile: Profile,
    notifySuccess: (message:string) => void,
    isOpen: boolean,
    openModal: () => void,
    onClose: () => void,
    onCancel: () => void,
}

type Errors = {
    passwordLengthError: boolean,
    passwordMatchError: boolean,
    alphanumericError: boolean,
    serverError?: string,
}

const EditPassword = (props: Props) => {
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const regexp = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,}$/);

    const renderError = (message: string) => {
        toast.dismiss();
        toast.error(message);
    }

    const onCancel = () => {
        setPassword("");
        setConfirmPassword("");
        props.onCancel();
    }

    const handleSubmit = () => {
        let newErrors = validatePassword(password, confirmPassword);
        let valid = !newErrors.passwordLengthError && !newErrors.passwordMatchError && !newErrors.alphanumericError;
        if (valid) {
            put(`user/${props.profile.id}/updatePassword`,{password: password})
                .then(() =>{
                    props.notifySuccess(`¡Su contraseña se actualizó correctamente!`)
                    onCancel();
                })
                .catch(err =>{
                    renderError(err)
                })
        }
    }

    const validatePassword = (password: string, confirmPassword: string) => {
        let passwordLengthError: boolean = false;
        let passwordMatchError: boolean = false;
        let alphanumericError: boolean = false;

        if (!password || password.length < 7) {
            passwordLengthError = true;
            renderError("¡La contraseña debe tener más de 6 caracteres!");
        } else
        if (password !== confirmPassword) {
            passwordMatchError = true;
            renderError("¡Las contraseñas deben coincidir!");
        }
        else
        if (!regexp.test(password)) {
            alphanumericError = true;
            renderError("¡La contraseña debe incluir solo letras y números, teniendo al menos una de cada una!");
        }

        const newErrors: Errors = {
            passwordLengthError,
            passwordMatchError,
            alphanumericError
        }

        return newErrors;
    }

    return (
        <>
            <button className={"edit-password-open-button"} onClick={props.openModal}>
                <i className={`fas fa-lock edit-password-lock-icon`}/>
                Cambiar contraseña
            </button>
        <GenericModal isOpen={props.isOpen} onClose={props.onClose} title={'Modificar contraseña'} withHeader>
            <div className={'edit-password-modal'}>
                <div className={'edit-password-input'}>
                        <InputWithIcon
                            icon={"fas fa-lock"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            isPassword={true}/>

                </div>
                <div className={'edit-password-input'}>
                <InputWithIcon
                    icon={"fas fa-lock"}
                    placeholder="Confirmar contraseña"
                    isPassword={true}
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                />
                </div>
            </div>
            <div className={"edit-password-modal-buttons-container"}>
                <CreateAndCancelButtons onCreate={handleSubmit} onCancel={onCancel} createLabel={"Guardar"}
                                        isActivated={password !== "" && confirmPassword !== ""}/>
            </div>
            </GenericModal>
        </>
    )
}

export default EditPassword;