import React from 'react';
import "./GenericTable.css";
import ReactTooltip from "react-tooltip";

type Props = {
    columns: Column[],
    data: any[],
    className?: string,
    noDataText?: string,
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
                    {props.columns.map((column, index) => <div key={index} className={"generic-table-header-text generic-table-column"}>{column.header}</div>)}
                </div>
                {props.data.length > 0 ? props.data.map((row, index1) => (
                    <div key={index1} className={"generic-table-row"}>
                        {props.columns.map((col, index2) => (
                            <div key={index2} className={"generic-table-column"}>
                                {col.component ? col.component(row) : (col.accessor ? <>
                                    <ReactTooltip/>
                                    <span className={"table-column-text"} data-tip={row[col.accessor]}>{row[col.accessor]}</span>
                                </> : undefined) }
                            </div>
                            )
                        )}
                    </div>
                )) :
                    (
                        <div className={"no-data-text-container"}>{props.noDataText ?? "No hay información"}</div>
                    )
                }
            </div>
    )
}

export default GenericTable;
