import React from 'react';
import "./GenericTable.css";

type Props = {
    columns: Column[],
    data: any[],
    className?: string,
}

export type Column = {
    header: string,
    accessor?: string,
    component?: (row: any)=>JSX.Element,
}


const GenericTable = (props: Props) => {
    return(
            <div className={"generic-table-container " + (props.className ?? "")}>
                <div className={"generic-table-header-row"}>
                    {props.columns.map(column => <div className={"generic-table-header-text generic-table-column"}>{column.header}</div>)}
                </div>
                {props.data.map(row => (
                    <div className={"generic-table-row"}>
                        {props.columns.map(col => (
                            <div className={"generic-table-column"}>
                                {col.component ? col.component(row) : (col.accessor ? row[col.accessor] : undefined) }
                            </div>
                            )
                        )}
                    </div>
                ))}
            </div>
    )
}

export default GenericTable;
