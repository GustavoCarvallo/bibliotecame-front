import React, {useEffect, useState} from 'react';
import "./DeleteButton.css";
import "../common/Notify.css";
import "./Profile.css";
import {toast, ToastOptions} from "react-toastify";
import {del,get} from "../utils/http";
import GenericModal from "../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import EditProfileSubmitHandler from "./EditProfile/EditProfileSubmitHandler";
import {isAdmin} from "../router/Routes";


export type Profile = {
    id?: number,
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    isAdmin?: boolean,
}

type Success = {
    success: boolean,
    message?: string,
}

const SEARCH = "SEARCH";
export const CREATE = "CREATE";
export const EDIT = "EDIT";

function Profile() {

    const admin = isAdmin();

    useEffect(()=>{
        get(`user/getLogged`)
            .then(res => {
                setSelectedProfile({id:res.id, email:res.email, password: "", firstName: res.firstName, lastName: res.lastName, phoneNumber: res.phoneNumber, isAdmin: res.isAdmin});
            })
            .catch(err => console.log(err));},[])

    const [status, setStatus] = React.useState(EDIT);

    const [success, setSuccess] = React.useState<Success>({
        success: false,
    });

    const [selectedProfile, setSelectedProfile] = React.useState<Profile>({})

    const [ModalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
    }

    const handleCloseCreation = () => {
        setSuccess({success: false});
        setStatus(SEARCH);
    }

    const deleteUser = () => {
        const promise = del("deleteUser/" + selectedProfile.id,);

        promise.then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            window.history.pushState("", "", "/login?successfulDelete")
            window.location.reload();
        })
            .catch((error) => {
                    notifyError(error);
            })
        closeModal();
    }

    const renderView = (<>
        <div className={"edit-profile-container"} id={"edit-profile-container"}>
            <EditProfileSubmitHandler selectedProfile={selectedProfile}
                                      setSelectedProfile={setSelectedProfile}
                                      handleCancel={handleCloseCreation}/>
            {!admin && (<div className={"delete-button-container"}>
                <button className="delete" onClick={openModal}>Eliminar Cuenta</button>

                <GenericModal title={"Eliminar Cuenta"} isOpen={ModalIsOpen} onClose={closeModal}>
                    <div className={"delete-account-body"}>
                        <p className="text">¿Estas seguro que quieres eliminar de forma permanente tu cuenta?</p>
                        <p className="text">Ten en cuenta que esta acción no se puede revertir</p>
                        <CreateAndCancelButtons onCreate={deleteUser} createLabel={"Confirmar"} onCancel={closeModal} isActivated={true}/>
                    </div>
                </GenericModal>

            </div>)}
        </div>

    </>);

    return (
        <div className={"profile-main-container"}>
            {renderView}
        </div>
    )
}


export default Profile;
