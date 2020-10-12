import React, {ReactElement, useEffect} from 'react';
import AdminLoanTable from "../LoanTable/AdminLoanTable";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {put, get} from "../../utils/http";
import {Loan} from "../LoanScreen";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import "./AdminLoanScreen.css";
import GenericModal from "../../common/GenericModal/GenericModal";
import {toast, ToastOptions} from "react-toastify";

type ModalInfo = {
    open: boolean,
    title?: string,
    body?: ReactElement<any>
}

const AdminLoanScreen = () => {
    const [search, setSearch] = React.useState("");
    const [paginationData, setPaginationData] = React.useState<PaginationData<Loan> | undefined>(undefined);
    const [modalInfo, setModalInfo] = React.useState<ModalInfo>({
        open: false,
    });

    useEffect(() => {
        getData(0, search);
    }, [])

    const getData = (page: number, search: string) => {
        get(`loan/admin?page=${page}&search=${search}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => {
                console.log(err)
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
                            un prórroga del libro “${info.bookTitle} - ${info.bookAuthor}”
                            con fecha de devolución el ${expectedReturnDate.toLocaleDateString()}.\n
                            Si acepta la prórroga la nueva fecha de devolución será
                            el ${addDays(expectedReturnDate, 3)?.toLocaleDateString()}`;
                cancelButton = {text: "Rechazar prórroga", onClick: () => {}};
                acceptButton = {text: "Aceptar prórroga", onClick: () => {}};
                break;
            case "WITHDRAWN":
            case "DELAYED":
                title = "Solicitud de devolución";
                bodyText = `Confirmar que el alumno ${info.userEmail} ha devuelto
                            el libro “${info.bookTitle} - ${info.bookAuthor}”`
                cancelButton = {text: "Cancelar", onClick: () => {closeModal()}}
                acceptButton = {text: "Confirmar devolución", onClick: () => {
                        put(`loan/${info.id}/return`, {})
                            .then(() => {
                                successfulRequest("Se ha confirmado la devolución correctamente")
                            })
                            .catch(err => {
                                failedRequest("No se pudo confirmar el devolución. Intente nuevamente")
                            })
                    }};
                break;
            case "READY_FOR_WITHDRAWAL":
                title = "Solicitud de retiro";
                bodyText = `Confirmar que el alumno ${info.userEmail} ha retirado
                            el libro “${info.bookTitle} - ${info.bookAuthor}”`
                cancelButton = {text: "Cancelar", onClick: () => {closeModal()}}
                acceptButton = {text: "Confirmar retiro", onClick: () => {
                        put(`loan/${info.id}/withdraw`, {})
                            .then(() => {
                                successfulRequest("Se ha confirmado el retiro correctamente")
                            })
                            .catch(err => {
                                failedRequest("No se pudo confirmar el retiro. Intente nuevamente")
                            })
                    }};
                break;
        }

        const body = (
            <div className={"loan-modal-body"}>
                <p>{bodyText}</p>
                <div className={"loan-modal-button-container"}>
                    <button className={"loan-modal-red-button"} onClick={cancelButton?.onClick}>{cancelButton?.text}</button>
                    <button className={"loan-modal-green-button"} onClick={acceptButton?.onClick}>{acceptButton?.text}</button>
                </div>
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
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "bookToast",
        toastId: 1                  // con el id no se repiten
    }

    const notifyError = (message: string) => toast.error(message, toastifyConfiguration);
    const notifySuccess = (message: string) => toast.success(message, toastifyConfiguration);

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

function addDays(date: Date | undefined, days: number) {
    if (!date) return;
    let newDay = new Date(date);
    newDay.setDate(date.getDate() + days);
    return newDay;
}

export default AdminLoanScreen;
