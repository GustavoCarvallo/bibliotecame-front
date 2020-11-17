import React from 'react';
import "../Book/CreateOrEditBook.css";
import "./EditProfile.css"
import {Profile} from "./Profile";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";
import {toast, ToastOptions} from "react-toastify";
import EditPassword from "./EditPassword/EditPassword";


type Props = {
    profile: Profile,
    setProfile: Function,
    handleSubmit: Function,
    type: string,
}

type Errors = {
    nameError: boolean,
    lastNameError: boolean,
    phoneNumberError: boolean,
    serverError?: string,
}


const EditProfile = (props: Props) => {
    const [openPasswordModal, setOpenPasswordModal] = React.useState<boolean>(false);

    const handleSubmit = () => {
        let newErrors = validateProfile(props.profile);
        let valid = !newErrors.nameError && !newErrors.lastNameError &&  !newErrors.phoneNumberError;
        if (valid) {
            props.handleSubmit(props.profile, handleSuccess, (status: string) => renderError(status))
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
    }

    const validateProfile = (profile: Profile) => {
        let nameError: boolean = false;
        let lastNameError: boolean = false;
        let phoneNumberError: boolean = false;

        if (!profile.firstName || profile.firstName === "") {
            nameError = true;
            renderError("Completar nombre");
        }
        if (!profile.lastName || profile.lastName === "") {
            lastNameError = true;
            renderError("Completar apellido");
        }
        if (!profile.phoneNumber || profile.phoneNumber === "") {
            phoneNumberError = true;
            renderError("Ingrese su número de telefono!")
        }

        const newErrors: Errors = {
            nameError,
            lastNameError,
            phoneNumberError,
        }

        return newErrors;
    }

    function isActive(){
        return ( props.profile.firstName!=="" &&
            props.profile.lastName!=="" &&
            props.profile.phoneNumber!=="")
    }

    const buttonStyleDeactivated = {
        color: 'var(--app-green)', backgroundColor: 'var(--app-grey)'
    }
    const buttonStyleActivated = {
        color: '#ffffff', backgroundColor: 'var(--app-green)'
    }

    function openModal(){
        setOpenPasswordModal(true);
    }

    function closeModal(){
        setOpenPasswordModal(false);
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
                </div>
                <div className={'edit-profile-buttons-grid'}>
                    <EditPassword profile={props.profile} notifySuccess={notifySuccess} isOpen={openPasswordModal} openModal={openModal} onCancel={closeModal} onClose={closeModal}/>
                    <button className="edit-profile-submit-button" onClick={handleSubmit} disabled={!isActive()} style={isActive() ? buttonStyleActivated : buttonStyleDeactivated}>
                        <p className="save-button">{'Guardar cambios'}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;
