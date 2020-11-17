import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {Loan} from "../LoanScreen";
import {getStatusComponent} from "./StudentLoanTable";
import "./AdminLoanTable.css";
import GenericPagination from "../../common/Pagination/GenericPagination";
import ReactTooltip from "react-tooltip";


type Props = {
    search: string,
    changePage: (page: number)=>void,
    paginationData?: PaginationData<Loan>,
    handleAction: (info: Loan)=>void
}

const AdminLoanTable = (props: Props) => {

    const columns: Column[] = [
        {
            header: "Ejemplar",
            component: row => <>
                <ReactTooltip/>
                <span className={'loan-book-title-and-author'} data-tip={`${row.bookTitle} - ${row.bookAuthor}`}>{row.bookTitle} - {row.bookAuthor}</span>
            </>
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
            component: row => <span className={"table-column-text"}>{row.returnDate !== null ? row.returnDate : row.expectedReturnDate}</span>
        },
        {
            header: "Acciones",
            component: row => {
                const onClick = () => props.handleAction(row);
                switch (row.loanStatus) {
                    case "PENDING_EXTENSION":
                        return <button className={"loan-table-button"} onClick={onClick}>Aceptar/Rechazar</button>
                    case "APPROVED_EXTENSION":
                    case "REJECTED_EXTENSION":
                    case "WITHDRAWN":
                    case "DELAYED":
                        return <button className={"loan-table-button"} onClick={onClick}>Confirmar devoluc.</button>
                    case "READY_FOR_WITHDRAWAL":
                        return <button className={"loan-table-button"} onClick={onClick}>Confirmar retiro</button>
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
