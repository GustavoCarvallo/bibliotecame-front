import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {Loan} from "../LoanScreen";
import {getStatusComponent} from "./StudentLoanTable";
import "./AdminLoanTable.css";
import GenericPagination from "../../common/Pagination/GenericPagination";


type Props = {
    search: string,
    changePage: (page: number)=>void,
    paginationData?: PaginationData<Loan>,
}

const AdminLoanTable = (props: Props) => {

    const columns: Column[] = [
        {
            header: "Ejemplar",
            component: row => <span className={'loan-book-title-and-author'}>{row.bookTitle} - {row.bookAuthor}</span>
        },
        {
            header: "Alumno",
            accessor: "userEmail",
        },
        {
            header: "Estado",
            component: row => <>{getStatusComponent(row.loanStatus)}</>
        },
        {
            header: "Fecha de devolución",
            accessor: "expectedReturnDate",
        },
        {
            header: "Acciones",
            component: row => {
                switch (row.loanStatus) {
                    case "PENDING_EXTENSION":
                        return <button className={"loan-table-button"}>Aceptar/Rechazar</button>
                    case "DELAYED":
                        return <button className={"loan-table-button"}>Confirmar devolución</button>
                    case "READY_FOR_WITHDRAWAL":
                        return <button className={"loan-table-button"}>Confirmar retiro</button>
                    default:
                        return <></>
                }
            }
        }
    ]

    return (
        <>
            <GenericTable columns={columns}
                          className={"table--5cols"}
                          noDataText={"No hay reservas"}
                          data={props.paginationData?.content ?? []}/>
            <GenericPagination pageCount={props.paginationData?.totalPages ?? 0}
                               forcePage={props.paginationData?.pageable.pageNumber ?? 0}
                               onPageChange={(selected) => props.changePage(selected)}/>
        </>
    )
}

export default AdminLoanTable;
