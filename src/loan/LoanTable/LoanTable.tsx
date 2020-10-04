import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {Loan} from "../LoanScreen";
import "./LoanTable.css";

type Props = {
    data: Loan[];
}

const statusTypes = [
    {key: 'PENDING_EXTENSION', class: 'pending-approval', translation: 'Prórroga Pend.'},
    {key: 'APPROVED_EXTENSION', class: 'approved', translation: 'Prórroga Rech.'},
    {key: 'REJECTED_EXTENSION', class: 'rejected', translation: 'Prórroga Acp.'},
    {key: 'DELAYED', class: 'delayed', translation: 'Atrasado'},
    {key: 'WITHDRAWN', class: 'withdrawn', translation: 'Retirado'},
    {key: 'READY_FOR_WITHDRAWAL', class: 'withdrawn', translation: 'Listo para ret.'},
]

const LoanTable = (props: Props) => {
    const getStatusComponent = (loanStatus: string) => {
        const statusObject = statusTypes.find(o => o.key === loanStatus);
        return (<div className={`loan-${statusObject?.class}-chip`}>{statusObject?.translation}</div>)
    }

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
            header: "Estado",
            component: row => <>{getStatusComponent(row.loanStatus)}</>
        },
        {
            header: "Acciones",
            component: row => {
                return row.loanStatus === 'WITHDRAWN' ?
                    <button className={"request-extension-button"}>Solicitar Prórroga</button> : <></>
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

export default LoanTable;
