import React from 'react'
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import './tables.css'
import {Book} from "../Dashboard";
type Props = {
    data: Book[],
    title: string
}

const constColumns: Column[] = [
    {
        header: 'Titulo',
        accessor: 'title'
    },
    {
        header: 'Autor',
        accessor: 'author'
    },
]

const MostLoanedTable = (props : Props) => {

    const columns: Column[] = [
        ...constColumns,
        {
            header: 'Cantidad de Reservas',
            component: (row => (
                    <div className={'view-start'}>
                        <p>{row.amountOfLoans}</p>
                    </div>
                ))
        }
    ];

    return (
    <div className={"dashboard-table"}>
        <div className={'title'}>
            <h4 className={'title-text'}>{props.title}</h4>
        </div>
        <GenericTable columns={columns}
                      className={"table--3cols"}
                      noDataText={"No hay suficiente información"}
                      data={props.data ?? []}/>
    </div>
    )
}

export default MostLoanedTable;