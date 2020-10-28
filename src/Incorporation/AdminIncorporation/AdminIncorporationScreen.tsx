import React, {useEffect} from 'react';
import "./AdminIncorporationScreen.css"
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import GenericPagination from "../../common/Pagination/GenericPagination";
import {get} from "../../utils/http";
import {notifyError} from "../../router/Routes";
import {PaginationData} from "../../Book/SearchBook/SearchBook";

type IncorporationRequest = {
    date: string,
    userEmail: string,
    title: string,
    status: string,
    author: string,
}

const statusLabels = [
    {status: 'PENDING', label: "A revisar"},
    {status: 'APPROVED', label: "Aprobada"},
    {status: 'REJECTED', label: "Rechazada"},
]

const AdminIncorporationScreen = () => {
    const [paginationData, setPaginationData] = React.useState<PaginationData<IncorporationRequest> | undefined>(undefined);

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
            component: row => <div className={`admin-incorporation-${row.status?.toLowerCase()}-chip`}>{statusLabels.find(statusObject => statusObject.status === row.status)?.label}</div>
        },
        {
            header: "Acciones",
            component: row => (<div className={"admin-incorporation-actions"}>
                <button className={"admin-incorporation-table-button"}>Ver</button>
                {row.status === "PENDING" && <button className={"admin-incorporation-table-button"}>Aceptar/Rechazar</button>}
            </div>)
        }
    ]


    return (
        <div className={"admin-incorporation-screen"}>
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
