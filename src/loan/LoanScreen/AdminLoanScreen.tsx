import React, {ReactElement, useEffect} from 'react';
import AdminLoanTable from "../LoanTable/AdminLoanTable";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {put, get} from "../../utils/http";
import {Loan} from "../LoanScreen";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import "./AdminLoanScreen.css";
import GenericModal from "../../common/GenericModal/GenericModal";
import {toast, ToastOptions} from "react-toastify";
import {addDays} from "../../utils/AddDays";
import ReminderButton from "../ReminderButton/ReminderButton";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";

type ModalInfo = {
    open: boolean,
    title?: string,
    body?: ReactElement
}

const AdminLoanScreen = () => {
    const [search, setSearch] = React.useState("");
    const [paginationData, setPaginationData] = React.useState<PaginationData<Loan> | undefined>(undefined);
    const [showReminderButton, setShowReminderButton] = React.useState(false);
    const [modalInfo, setModalInfo] = React.useState<ModalInfo>({
        open: false,
    });

    useEffect(() => {
        getData(0, search);
        checkDelayed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = (page: number, search: string) => {
        get(`loan/admin?page=${page}&search=${search}`)
            .then(res => {
                setPaginationData(res);
            })
    }

    const changePage = (selected: number) => {
        getData(selected, search);
    }

    const changeSearch = (value: string) => {
        setSearch(value);
        getData(0, value);
    }

    const closeModal = () => {
        setModalInfo({open: false})
    }

    function checkDelayed(){
        get("loan/delayed/check")
            .then(res => {
                setShowReminderButton(res)
            })
            .catch(err =>{
                notifyError(err);
            })
    }

    const handleAction = (info: Loan) => {
        const expectedReturnDate: Date = new Date(info.expectedReturnDate);
        let bodyText;
        let cancelButton: {text: string, onClick: ()=>void} | undefined;
        let acceptButton: {text: string, onClick: ()=>void} | undefined;
        let title;
        switch (info.loanStatus){
            case "PENDING_EXTENSION":
                title = "Solicitud de prórroga";
                bodyText = `El alumno ${info.userEmail} ha solicitado
                            una prórroga del libro “${info.bookTitle} - ${info.bookAuthor}”
                            con fecha de devolución el ${expectedReturnDate.toLocaleDateString()}.\n
                            Si acepta la prórroga la nueva fecha de devolución será
                            el ${addDays(expectedReturnDate, 3)?.toLocaleDateString()}`;
                cancelButton = {text: "Rechazar", onClick: () => {
                        put(`extension/${info.id}/reject`,{})
                            .then(() => {
                                successfulRequest("Se ha rechazado la prórroga correctamente.")
                            })
                            .catch(err => {
                                failedRequest(err)
                            })
                    }};
                acceptButton = {text: "Aceptar", onClick: () => {
                        put(`extension/${info.id}/approve`,{})
                            .then(() => {
                                successfulRequest("Se ha aceptado la prórroga correctamente.")
                            })
                            .catch(err => {
                                failedRequest(err)
                            })
                    }};
                break;
            case "APPROVED_EXTENSION":
            case "WITHDRAWN":
            case "REJECTED_EXTENSION":
            case "DELAYED":
                title = "Solicitud de devolución";
                bodyText = `Confirmar que el alumno ${info.userEmail} ha devuelto
                            el libro “${info.bookTitle} - ${info.bookAuthor}”`
                cancelButton = {text: "Cancelar", onClick: () => {closeModal()}}
                acceptButton = {text: "Confirmar", onClick: () => {
                        put(`loan/${info.id}/return`, {})
                            .then(() => {
                                successfulRequest("Se ha confirmado la devolución correctamente")
                            })
                            .catch(() => {
                                failedRequest("No se pudo confirmar el devolución. Intente nuevamente")
                            })
                    }};
                break;
            case "READY_FOR_WITHDRAWAL":
                title = "Solicitud de retiro";
                bodyText = `Confirmar que el alumno ${info.userEmail} ha retirado
                            el libro “${info.bookTitle} - ${info.bookAuthor}”`
                cancelButton = {text: "Cancelar", onClick: () => {closeModal()}}
                acceptButton = {text: "Confirmar", onClick: () => {
                        put(`loan/${info.id}/withdraw`, {})
                            .then(() => {
                                successfulRequest("Se ha confirmado el retiro correctamente")
                            })
                            .catch(() => {
                                failedRequest("No se pudo confirmar el retiro. Intente nuevamente")
                            })
                    }};
                break;
        }

        const body = (
            <div className={"loan-modal-body"}>
                <p>{bodyText}</p>
                <CreateAndCancelButtons onCreate={() => {if(acceptButton?.onClick) acceptButton.onClick()}}
                                        onCancel={() => {if (cancelButton?.onClick) cancelButton.onClick()}}
                                        cancelLabel={cancelButton?.text}
                                        createLabel={acceptButton?.text} isActivated={true}/>
            </div>
        )

        setModalInfo({
            open: true,
            title,
            body
        })
    }

    const successfulRequest = (successMessage: string) => {
        closeModal();
        getData(0, search);
        notifySuccess(successMessage);
    }

    const failedRequest = (errorMessage: string) => {
        closeModal();
        getData(0, search);
        notifyError(errorMessage);
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast",
    }

    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
    }
    const notifySuccess = (message: string) => {
        toast.dismiss();
        toast.success(message, toastifyConfiguration);
    }

    return (
        <div className={"admin-loan-screen"}>
            <GenericModal title={modalInfo.title ?? ""} withHeader={false} isOpen={modalInfo.open}
                          onClose={closeModal}>
                {modalInfo.body}
            </GenericModal>
            <div className={"admin-loan-search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={search}
                               onChange={(e) => changeSearch(e.target.value)}
                               placeholder={"Busque un préstamo"}/>
                <ReminderButton label={"Enviar Recordatorios"}
                                success={notifySuccess}
                                error={notifyError}
                                disabled={showReminderButton}/>
            </div>
            <div className={"admin-loan-table-container"}>
                <AdminLoanTable search={search}
                                handleAction={handleAction}
                                changePage={changePage}
                                paginationData={paginationData}/>
            </div>
        </div>
    )
}

export default AdminLoanScreen;
