import React, {useEffect} from 'react';
import "./IncorporationRequestScreen.css";
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {incorporationStatusLabels} from "../AdminIncorporation/AdminIncorporationScreen";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {get} from "../../utils/http";
import GenericPagination from "../../common/Pagination/GenericPagination";
import ReactTooltip from "react-tooltip";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import IncorporationRequestForm, {IncorporationRequest} from "./CreateIncorporationRequest/IncorporationRequestForm";
import {toast, ToastOptions} from "react-toastify";


const SEARCH = "SEARCH";
const CREATE = "CREATE";
const VIEW = "VIEW";

const IncorporationRequestScreen = () => {
    const [status, setStatus] = React.useState(SEARCH);
    const [paginationData, setPaginationData] = React.useState<PaginationData<IncorporationRequest> | undefined>(undefined);
    const [searchFilter, setSearchFilter] = React.useState<string>("");
    const [selectedIncorporationRequest, setSelectedIncorporationRequest] = React.useState<IncorporationRequest | undefined>(undefined);

    useEffect(() => {
        if (status === SEARCH) getData(0, searchFilter);
    }, [status])

    const getData = (page: number, search: string) => {
        get(`request/user?page=${page}&search=${search}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => notifyError(err));
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifyError = (message: string) => {
        toast.dismiss()
        toast.error(message, toastifyConfiguration)
    }

    const changePage = (page: number) => {
        getData(page, searchFilter);
    }

    const openCreateScreen = () => {
        setStatus(CREATE);
    }

    const openSearchScreen = () => {
        setStatus(SEARCH);
    }

    const handleFilterChange = (e: any) => {
        setSearchFilter(e.target.value);
        getData(0, e.target.value);
    }

    const onAddRequestSuccess = () => {
        getData(0, "");
        openSearchScreen()
    }

    const columns: Column[] = [
        {
            header: "Libro",
            accessor: 'title'
        },
        {
            header: "Autor",
            accessor: 'author'
        },
        {
            header: "Fecha",
            accessor: 'date'
        },
        {
            header: "Estado",
            component: row => <div
                className={`admin-incorporation-${row.status?.toLowerCase()}-chip`}>{incorporationStatusLabels.find(statusObject => statusObject.status === row.status)?.label}</div>
        },
        {
            header: "Acciones",
            component: row => (<>
                <ReactTooltip/>
                <i className={"fas fa-eye search-book-eye"} data-tip={"Ver"} onClick={() => openRequestInformation(row.id)}/>
                </>)
        }
    ]

    const openRequestInformation = (id: number) => {
        get(`request/${id}`)
            .then(res => {
                setSelectedIncorporationRequest({
                    ...res,
                    year: res.year === 0 ? null : res.year,
                });
                setStatus(VIEW);
            })
            .catch(err => notifyError(err));
    }

    return (
        <>
            {status === SEARCH ? (
                <div className={"incorporation-request-screen"}>
                    <ReactTooltip/>
                    <div className={"book-search-container"}>
                        <InputWithIcon icon={'fas fa-search'}
                                       value={searchFilter}
                                       onChange={handleFilterChange}
                                       placeholder={"Busque una solicitud"}/>
                        <ReactTooltip/>
                        <i className={'fas fa-plus-circle add-button'} onClick={() => {
                            openCreateScreen();
                            ReactTooltip.hide();
                        }} data-tip={"Crear"}/>
                    </div>
                    <div className={"student-incorporation-card"}>
                        <div className={"student-incorporation-table-container"}>
                            <GenericTable columns={columns} data={paginationData?.content ?? []}
                                          className={"table--5cols"}/>
                        </div>
                        <GenericPagination pageCount={paginationData?.totalPages ?? 0}
                                           forcePage={paginationData?.pageable.pageNumber ?? 0}
                                           onPageChange={(selected) => changePage(selected)}/>
                    </div>
                </div>
            ) : (
                <div className={"incorporation-request-form-screen"}>
                    {status === CREATE && <IncorporationRequestForm onCancel={openSearchScreen} onSuccess={onAddRequestSuccess}/>}
                    {status === VIEW &&
                    <IncorporationRequestForm form={selectedIncorporationRequest} onCancel={openSearchScreen}
                                              disabled={true}/>}
                </div>
            )}
        </>
    )
}

export default IncorporationRequestScreen;
