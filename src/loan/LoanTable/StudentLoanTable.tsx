import React, {useEffect} from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import "./StudentLoanTable.css";
import {get} from "../../utils/http";
import {Loan} from "../LoanScreen";

const statusTypes = [
    {key: 'PENDING_EXTENSION', class: 'pending-approval', translation: 'Prórroga Pend.'},
    {key: 'APPROVED_EXTENSION', class: 'approved', translation: 'Prórroga Acp.'},
    {key: 'REJECTED_EXTENSION', class: 'rejected', translation: 'Prórroga Rech.'},
    {key: 'DELAYED', class: 'delayed', translation: 'Atrasado'},
    {key: 'WITHDRAWN', class: 'withdrawn', translation: 'Retirado'},
    {key: 'READY_FOR_WITHDRAWAL', class: 'ready-for-withdrawal', translation: 'No retirado'},
    {key: 'RETURNED', class: 'returned', translation: 'Devuelto'},
]

const StudentLoanTable = () => {
    const [loans, setLoans] = React.useState<Loan[]>([]);

    useEffect(() => {
        get(`loan/actives`)
            .then(res => {
                setLoans(res);
            })
            .catch(err => {
            })
    }, [])

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
                return row.loanStatus === 'WITHDRAWN' ? <button className={"loan-table-button"}>Solicitar Prórroga</button> : <></>
            }
        }
    ]
    return (
        <GenericTable columns={columns}
                      className={"table--4cols"}
                      noDataText={"No hay reservas"}
                      data={loans}/>
    )
}

export const getStatusComponent = (loanStatus: string) => {
    const statusObject = statusTypes.find(o => o.key === loanStatus);
    return (<div className={`loan-${statusObject?.class}-chip`}>{statusObject?.translation}</div>)
}

export default StudentLoanTable;
