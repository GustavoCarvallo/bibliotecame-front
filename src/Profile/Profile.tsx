import React, {useEffect, useState} from 'react';
import "./DeleteButton.css";
import "../common/Notify.css";
import "./Profile.css";
import {toast, ToastContainer} from "react-toastify";
import {del,get} from "../utils/http";
import GenericModal from "../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../common/CreateAndCancelButtons/CreateAndCancelButtons";
import EditProfile from "./EditProfile/EditProfile";
import {bearString} from "../utils/mocksettings.json"; //Once Login is merged, replace this with actual token


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

    useEffect(()=>{
        //When login is merged, Authorization should be in Http.tsx, so we need to erase this "bearString" mock.
        get(`user/getLogged`, {headers: {"Content-Type": "application/json","Authorization": `Bearer ${bearString}`}})
            .then(res => setSelectedProfile(res))
            .catch(err => alert(err.message));},[])

    const [status, setStatus] = React.useState(EDIT);

    const [success, setSuccess] = React.useState<Success>({
        success: false,
    });

    const [selectedProfile, setSelectedProfile] = React.useState<Profile>({
        //Should get this from localhost:8080/user/getlogged with the token as Header.
        id: 5,
        email: "genericMail@ing.austral.edu.ar",
        password: "abcd1234",
        firstName: "I'm still",
        lastName: "Loading",
        phoneNumber: "+I'llCallYouLater",
        isAdmin: true,
    })

    const BAD_REQUEST = 400;

    const [ModalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const notifyError = (message: string) => toast.error(message, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined});

    const handleSetSuccess = (success: boolean, message?: string) => {
        setSuccess({
            success,
            message
        })
    }

    const handleCloseCreation = () => {
        setSuccess({success: false});
        setStatus(SEARCH);
    }

    const deleteUser = () => {
        const promise = del("deleteUser/" + selectedProfile.id,
            {headers: {"Content-Type": "application/json"}, noAuth: true});

        promise.then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                window.history.pushState("", "", "/login?successfulDelete")
                window.location.reload();
            })
            .catch(error => {
            if(error.status === BAD_REQUEST){
                notifyError('No se pudo eliminar tu cuenta porque tienes prestamos activos');
            } else {
                notifyError('No se pudo eliminar su cuenta por un error inesperado. Intente de nuevo');
            }
        })
        closeModal();
    }

    return <div>
            <button className="delete" onClick={openModal}>Eliminar Cuenta</button>

            <GenericModal title={"Eliminar Cuenta"} isOpen={ModalIsOpen} onClose={closeModal}>
                <div className={"delete-account-body"}>
                    <p className="text">¿Estas seguro que quieres eliminar de forma permanente tu cuenta?</p>
                    <p className="text">Ten en cuenta que esta acción no se puede revertir</p>
                    <CreateAndCancelButtons onCreate={deleteUser} createLabel={"Confirmar"} onCancel={closeModal}/>
                </div>
            </GenericModal>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
            />

        </div>
}

return (<>
    {success.success && <div className={'success-message-container'}>
        <span className={'success-text'}>{success.message ?? 'El perfil se ha modificado correctamente'}</span>
        <i className="fas fa-times success-close" onClick={() => setSuccess({success: false})}/>
    </div>}
    <div className={"edit-profile-container"} id={"edit-profile-container"}>
        <EditProfile selectedProfile={selectedProfile}
                     setSelectedProfile={setSelectedProfile}
                     setSuccess={handleSetSuccess}
                     handleCancel={handleCloseCreation}/>
        <div>
            <button className="delete" onClick={openModal}>Eliminar Cuenta</button>

            <GenericModal styles={style} title={"Eliminar Cuenta"} isOpen={ModalIsOpen} onClose={closeModal}>
                <div>
                    <p className="text">¿Estas seguro que quieres eliminar de forma permanente tu cuenta?</p>
                    <p className="text">Ten en cuenta que esta acción no se puede revertir</p>
                    <CreateAndCancelButtons onCreate={deleteUser} createLabel={"Confirmar"} onCancel={closeModal}/>
                </div>
            </GenericModal>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
            />

        </div>
        <div>
            <ul></ul>
        </div>
    </div>

</>);

export default Profile;