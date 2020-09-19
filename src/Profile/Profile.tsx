import React, {useState} from 'react';
import "./DeleteButton.css";
import "../common/Notify.css";
import "./Profile.css";
import {toast, ToastContainer} from "react-toastify";
import {del} from "../utils/http";
import GenericModal from "../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../common/CreateAndCancelButtons/CreateAndCancelButtons";

interface Props {
    pathVariable: number;
}

function Profile(props: Props) {

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

    const deleteUser = () => {
        const promise = del("deleteUser/" + props.pathVariable,
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

export default Profile;