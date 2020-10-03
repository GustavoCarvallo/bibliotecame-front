import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {dateDiffInDays, Extension, Loan} from "../LoanScreen";
import "./LoanTable.css";

type Props = {
    data: Loan[];
}

const translations = [
    {key: 'PENDING-APPROVAL',value: 'Prórroga Pend.'},
    {key: 'ACCEPTED', value: 'Prórroga Rech.'},
    {key: 'REJECTED', value: 'Prórroga Acp.'},
    {key: 'DUE', value: 'Atrasado'},
    {key: 'WITHDRAWN', value: 'Retirado'}
]

const LoanTable = (props: Props) => {
    const getStatusComponent = (expirationDate: string, extension: Extension) => {
        const status = getStatus(expirationDate, extension);
        const translation = translations.find(o => o.key === status);
        return <div className={`loan-${status.toLowerCase()}-chip`}>{translation?.value ?? ''}</div>
    }

    const getStatus = (expirationDate: string, extension: Extension) => {
        if (extension !== null){
            if (extension.status === "PENDING_APPROVAL") return 'PENDING-APPROVAL';
            return extension.status;
        }else {
            return dateDiffInDays(new Date(expirationDate), new Date()) > 0 ? 'DUE' : 'WITHDRAWN';
        }
    }

    const columns: Column[] = [
        {
            header: "Libro",
            component: row => <span>{row.bookTitle} - {row.bookAuthor}</span>
        },
        {
            header: "Fecha de devolución",
            accessor: "expirationDate",
        },
        {
            header: "Estado",
            component: row => <>{getStatusComponent(row.expirationDate, row.extension)}</>,
        },
        {
            header: "Acciones",
            component: row => {return getStatus(row.expirationDate, row.extension) === 'WITHDRAWN' ? <button className={"request-extension-button"}>Solicitar Prórroga</button> : <></>}
        }
    ]
    return(
        <GenericTable columns={columns}
                      className={"table--4cols"}
                      noDataText={"No hay reservas"}
                      data={props.data}/>
    )
}

export default LoanTable;
