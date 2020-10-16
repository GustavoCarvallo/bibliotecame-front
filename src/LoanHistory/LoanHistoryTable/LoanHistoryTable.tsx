import React from 'react';
import "./LoanHistoryTable.css";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {Loan} from "../../loan/LoanScreen";
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import GenericPagination from "../../common/Pagination/GenericPagination";

type Props = {
    paginationData?: PaginationData<Loan>,
    handleAction: (row: Loan)=>void,
    changePage: (page: number)=>void,
}

const LoanHistoryTable = (props: Props) => {
    const columns: Column[] = [
        {
            header: "Libro",
            component: row => <span className={'loan-book-title-and-author'}>{row.bookTitle} - {row.bookAuthor}</span>
        },
        {
            header: "Fecha de devolución",
            accessor: "expectedReturnDate",
        },
        {
            header: "Fecha en que fue devuelto",
            accessor: "returnDate"
        },
        {
            header: "Acciones",
            component: row => {
                const onClick = () => props.handleAction(row);
                switch (row.loanStatus) {
                    case "RATED":
                        return <button className={"loan-history-table-button"} onClick={onClick}>Mod. Calif</button>
                    default:
                        return <button className={"loan-table-button"} onClick={onClick}>Calificar</button>
                }
            }
        }
    ]

    return (
        <>
            <GenericTable columns={columns}
                          className={"table--4cols"}
                          noDataText={"No hay reservas"}
                          data={props.paginationData?.content ?? []}/>
            <GenericPagination pageCount={props.paginationData?.totalPages ?? 0}
                               forcePage={props.paginationData?.pageable.pageNumber ?? 0}
                               onPageChange={(selected) => props.changePage(selected)}/>
        </>
    )
}

export default LoanHistoryTable;
