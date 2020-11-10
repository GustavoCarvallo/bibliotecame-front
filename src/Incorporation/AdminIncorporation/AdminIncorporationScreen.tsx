import React, {useEffect} from 'react';
import "./AdminIncorporationScreen.css"
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import GenericPagination from "../../common/Pagination/GenericPagination";
import {get, put} from "../../utils/http";
import {notifyError, notifySuccess} from "../../router/Routes";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import GenericModal from "../../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import ReactTooltip from "react-tooltip";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import IncorporationRequestViewer from "./IncorporationRequestFormViewer/IncorporationRequestViewer";

export type AdminIncorporationRequest = {
    id: number,
    date: string,
    userEmail?: string,
    title: string,
    status: string,
    author: string,
}

type AcceptRejectModalInfo = {
    open: boolean,
    incorporationRequest?: AdminIncorporationRequest,
}

export const incorporationStatusLabels = [
    {status: 'PENDING', label: "A revisar"},
    {status: 'APPROVED', label: "Aprobada"},
    {status: 'REJECTED', label: "Rechazada"},
]

const AdminIncorporationScreen = () => {
    const [paginationData, setPaginationData] = React.useState<PaginationData<AdminIncorporationRequest> | undefined>(undefined);
    const [acceptRejectModalInfo, setAcceptRejectModalInfo] = React.useState<AcceptRejectModalInfo>({
        open: false,
    });
    const [searchFilter, setSearchFilter] = React.useState<string>("");
    const [requestModal, setRequestModal] = React.useState<boolean>(false)
    const [selectedId, setSelectedId] = React.useState<number>(0)

    useEffect(() => {
        getData(0, searchFilter);
    }, [])

    const getData = (page: number, searchFilter: string) => {
        get(`request?page=${page}&search=${searchFilter}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => notifyError(err));
    }

    const changePage = (page: number) => {
        getData(page, searchFilter);
    }

    const handleFilterChange = (e: any) => {
        setSearchFilter(e.target.value);
        getData(0, e.target.value);
    }

    const columns: Column[] = [
        {
            header: "Libro",
            component: row => <>
                <ReactTooltip/>
                <div className={'loan-book-title-and-author'} data-tip={`${row.title} - ${row.author}`}>{row.title} - {row.author}</div>
            </>
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
            component: row => <div className={`admin-incorporation-${row.status?.toLowerCase()}-chip`}>{incorporationStatusLabels.find(statusObject => statusObject.status === row.status)?.label}</div>
        },
        {
            header: "Acciones",
            component: row => (<div className={"admin-incorporation-actions"}>
                <i className={"fas fa-eye search-book-eye"} data-tip={"Ver"} onClick={() => openRequestModal(row.id)}/>
                {/*<button className={"admin-incorporation-table-button"} onClick={()=>openRequestModal(row.id)}>Ver</button>*/}
                {row.status === "PENDING" && <button className={"admin-incorporation-table-button"}
                                                     onClick={() => openAcceptRejectModal(row)}>Aceptar/Rechazar</button>}
            </div>)
        }
    ]

    const openAcceptRejectModal = (incorporationRequest: AdminIncorporationRequest) => {
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
                getData(0, searchFilter);
                closeAcceptRejectModal();
            })
            .catch(err => notifyError(err));
    }

    const rejectIncorporationRequest = (id?: number) => {
        put(`request/reject/${id}`, {})
            .then(() => {
                notifySuccess("La incorporación ha sido rechazada correctamente!");
                getData(0, searchFilter);
                closeAcceptRejectModal();
            })
            .catch(err => notifyError(err));
    }

    function closeRequestModal(){
        setRequestModal(false)
    }

    function openRequestModal(id:number){
        setSelectedId(id)
        setRequestModal(true)
    }

    return (
        <>
            {requestModal && <IncorporationRequestViewer onCancel={closeRequestModal} isOpen={requestModal} onClose={closeRequestModal} id={selectedId}/>}
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
            <div className={"book-search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={searchFilter}
                               onChange={handleFilterChange}
                               placeholder={"Busque una solicitud"}/>
            </div>
            <div className={"admin-incorporation-card"}>
                <div className={"admin-incorporation-table-container"}>
                    <GenericTable columns={columns} data={paginationData?.content ?? []} className={"table--5cols"}/>
                </div>
                <GenericPagination pageCount={paginationData?.totalPages ?? 0}
                                   forcePage={paginationData?.pageable.pageNumber ?? 0}
                                   onPageChange={(selected) => changePage(selected)}/>
            </div>
        </div>
            </>
    )
}

export default AdminIncorporationScreen;
