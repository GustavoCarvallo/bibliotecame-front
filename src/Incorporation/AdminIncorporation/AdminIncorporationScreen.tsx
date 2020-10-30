import React, {useEffect} from 'react';
import "./AdminIncorporationScreen.css"
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import GenericPagination from "../../common/Pagination/GenericPagination";
import {get, put} from "../../utils/http";
import {notifyError, notifySuccess} from "../../router/Routes";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import GenericModal from "../../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";

type IncorporationRequest = {
    id: number,
    date: string,
    userEmail: string,
    title: string,
    status: string,
    author: string,
}

type AcceptRejectModalInfo = {
    open: boolean,
    incorporationRequest?: IncorporationRequest,
}

const statusLabels = [
    {status: 'PENDING', label: "A revisar"},
    {status: 'APPROVED', label: "Aprobada"},
    {status: 'REJECTED', label: "Rechazada"},
]

const AdminIncorporationScreen = () => {
    const [paginationData, setPaginationData] = React.useState<PaginationData<IncorporationRequest> | undefined>(undefined);
    const [acceptRejectModalInfo, setAcceptRejectModalInfo] = React.useState<AcceptRejectModalInfo>({
        open: false,
    });

    useEffect(() => {
        getData(0);
    }, [])

    const getData = (page: number) => {
        get(`request?page=${page}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => notifyError(err));
    }

    const changePage = (page: number) => {
        getData(page);
    }

    const columns: Column[] = [
        {
            header: "Libro",
            component: row => <div className={'loan-book-title-and-author'}>{row.title} - {row.author}</div>
        },
        {
            header: "Fecha",
            accessor: 'date'
        },
        {
            header: "Usuario",
            accessor: 'userEmail'
        },
        {
            header: "Estado",
            component: row => <div
                className={`admin-incorporation-${row.status?.toLowerCase()}-chip`}>{statusLabels.find(statusObject => statusObject.status === row.status)?.label}</div>
        },
        {
            header: "Acciones",
            component: row => (<div className={"admin-incorporation-actions"}>
                <button className={"admin-incorporation-table-button"}>Ver</button>
                {row.status === "PENDING" && <button className={"admin-incorporation-table-button"}
                                                     onClick={() => openAcceptRejectModal(row)}>Aceptar/Rechazar</button>}
            </div>)
        }
    ]

    const openAcceptRejectModal = (incorporationRequest: IncorporationRequest) => {
        setAcceptRejectModalInfo({
            open: true,
            incorporationRequest,
        })
    }

    const closeAcceptRejectModal = () => {
        setAcceptRejectModalInfo({
            open: false,
        })
    }

    const approveIncorporationRequest = (id?: number) => {
        put(`request/approve/${id}`, {})
            .then(() => {
                notifySuccess("La incorporación ha sido aceptada correctamente!");
                getData(0);
                closeAcceptRejectModal();
            })
            .catch(err => notifyError(err));
    }

    const rejectIncorporationRequest = (id?: number) => {
        put(`request/reject/${id}`, {})
            .then(() => {
                notifySuccess("La incorporación ha sido rechazada correctamente!");
                getData(0);
                closeAcceptRejectModal();
            })
            .catch(err => notifyError(err));
    }


    return (
        <div className={"admin-incorporation-screen"}>
            <GenericModal isOpen={acceptRejectModalInfo.open} title={"Solicitud de Incorporación"}
                          onClose={closeAcceptRejectModal}>
                <div className={"accept-reject-incorporation-modal-body"}>
                    <div className={"accept-reject-incorporation-modal-text"}>
                        <p>El alumno {acceptRejectModalInfo.incorporationRequest?.userEmail} ha solicitado
                            la incorporación del libro {acceptRejectModalInfo.incorporationRequest?.title}
                            de {acceptRejectModalInfo.incorporationRequest?.author}.</p>
                        <p>¿Desea aceptar o rechazar la solicitud?</p>
                    </div>
                    <CreateAndCancelButtons
                        onCancel={() => rejectIncorporationRequest(acceptRejectModalInfo.incorporationRequest?.id)}
                        onCreate={() => approveIncorporationRequest(acceptRejectModalInfo.incorporationRequest?.id)}
                        createLabel={'Aceptar'}
                        cancelLabel={'Rechazar'}
                        isActivated={true}/>
                </div>
            </GenericModal>
            <div className={"admin-incorporation-card"}>
                <div className={"admin-incorporation-table-container"}>
                    <GenericTable columns={columns} data={paginationData?.content ?? []} className={"table--5cols"}/>
                </div>
                <GenericPagination pageCount={paginationData?.totalPages ?? 0}
                                   forcePage={paginationData?.pageable.pageNumber ?? 0}
                                   onPageChange={(selected) => changePage(selected)}/>
            </div>
        </div>
    )
}

export default AdminIncorporationScreen;
