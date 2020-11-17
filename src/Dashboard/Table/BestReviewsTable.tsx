import React from 'react'
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import Rating from "react-rating";
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

const BestReviewsTable = (props : Props) => {

    const columns: Column[] = [
        ...constColumns,
        {
            header: 'Calificación',
            component: (row => (
                <div className={'view-star'}>
                    <Rating emptySymbol={"far fa-star empty-star"} fractions={1} fullSymbol={"fas fa-star full-star"}
                        initialRating={row.avgScore} readonly={true}/>
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

export default BestReviewsTable;