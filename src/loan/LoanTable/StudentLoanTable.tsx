import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import "./StudentLoanTable.css";
import {Loan} from "../LoanScreen";
import ReactTooltip from "react-tooltip";

type Props = {
    data: Loan[];
    handleRequestExtension: (row: Loan)=>void,
}

const statusTypes = [
    {key: 'PENDING_EXTENSION', class: 'pending-approval', translation: 'Prórroga Pend.'},
    {key: 'APPROVED_EXTENSION', class: 'approved', translation: 'Prórroga Acp.'},
    {key: 'REJECTED_EXTENSION', class: 'rejected', translation: 'Prórroga Rech.'},
    {key: 'DELAYED', class: 'delayed', translation: 'Atrasado'},
    {key: 'WITHDRAWN', class: 'withdrawn', translation: 'Retirado'},
    {key: 'READY_FOR_WITHDRAWAL', class: 'ready-for-withdrawal', translation: 'No retirado'},
    {key: 'RETURNED', class: 'returned', translation: 'Devuelto'},
]

const StudentLoanTable = (props: Props) => {

    const columns: Column[] = [
        {
            header: "Libro",
            component: row => <>
                <ReactTooltip/>
                <span className={'loan-book-title-and-author'} data-tip={`${row.bookTitle} - ${row.bookAuthor}`}>{row.bookTitle} - {row.bookAuthor}</span>
            </>
        },
        {
            header: "Fecha de devolución",
            accessor: "expectedReturnDate",
        },
        {
            header: "Estado",
            component: row => <>{getStatusComponent(row.loanStatus)}</>
        },
        {
            header: "Acciones",
            component: row => {
                return row.loanStatus === 'WITHDRAWN' ?
                    <button className={"loan-table-button"} onClick={() => props.handleRequestExtension(row)}>Solicitar
                        Prórroga</button> : <></>
            }
        }
    ]
    return (
            <GenericTable columns={columns}
                          className={"table--4cols"}
                          noDataText={"No hay reservas"}
                          data={props.data}/>
    )
}

export const getStatusComponent = (loanStatus: string) => {
    const statusObject = statusTypes.find(o => o.key === loanStatus);
    return (<div className={`loan-${statusObject?.class}-chip`}>{statusObject?.translation}</div>)
}

export default StudentLoanTable;
