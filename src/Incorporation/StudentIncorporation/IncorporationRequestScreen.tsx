import React, {useEffect} from 'react';
import "./IncorporationRequestScreen.css";
import CreateIncorporationRequest from "./CreateIncorporationRequest/CreateIncorporationRequest";
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {IncorporationRequest, incorporationStatusLabels} from "../AdminIncorporation/AdminIncorporationScreen";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {get} from "../../utils/http";
import {notifyError} from "../../router/Routes";
import GenericPagination from "../../common/Pagination/GenericPagination";
import ReactTooltip from "react-tooltip";

const SEARCH = "SEARCH";
const CREATE = "CREATE";

const IncorporationRequestScreen = () => {
    const [status, setStatus] = React.useState(SEARCH);
    const [paginationData, setPaginationData] = React.useState<PaginationData<IncorporationRequest> | undefined>(undefined);

    useEffect(() => {
        getData(0);
    }, [])

    const getData = (page: number) => {
        get(`request/user?page=${page}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => notifyError(err));
    }

    const changePage = (page: number) => {
        getData(page);
    }

    const openCreateScreen = () => {
        setStatus(CREATE);
    }

    const openSearchScreen = () => {
        setStatus(SEARCH);
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
            header: "Estado",
            component: row => <div
                className={`admin-incorporation-${row.status?.toLowerCase()}-chip`}>{incorporationStatusLabels.find(statusObject => statusObject.status === row.status)?.label}</div>
        },
        {
            header: "Acciones",
            component: row => (<>
                <ReactTooltip/>
                <i className={"fas fa-eye search-book-eye"} data-tip={"Ver"}/>
                </>)
        }
    ]

    return (
        <div className={"incorporation-request-screen"}>
            {status === SEARCH && (
                <>
                    <ReactTooltip/>
                    <i className={'fas fa-plus-circle add-button'} onClick={openCreateScreen} data-tip={"Crear"}/>
                    <div className={"student-incorporation-card"}>
                        <div className={"student-incorporation-table-container"}>
                            <GenericTable columns={columns} data={paginationData?.content ?? []}
                                          className={"table--4cols"}/>
                        </div>
                        <GenericPagination pageCount={paginationData?.totalPages ?? 0}
                                           forcePage={paginationData?.pageable.pageNumber ?? 0}
                                           onPageChange={(selected) => changePage(selected)}/>
                    </div>
                </>
            )
            }
            {status === CREATE && <CreateIncorporationRequest onCancel={openSearchScreen}/>}
        </div>
    )
}

export default IncorporationRequestScreen;
