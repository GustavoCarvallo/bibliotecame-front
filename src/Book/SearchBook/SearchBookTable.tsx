import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import "./SearchBookTable.css";
import ActivateOrDeactivateButton from "./ActivateOrDeactivateButton";
import ReactPaginate from 'react-paginate';
import {PaginationData} from "./SearchBook";

type Props = {
    isAdmin: boolean,
    openBookDetails: (id: number) => void,
    paginationData?: PaginationData,
    changePage: (page: number) => void;
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
    {
        header: 'Editorial',
        accessor: 'publisher'
    },
]

const SearchBookTable = (props: Props) => {
    const columns: Column[] =
        [
            ...constColumns,
            {
                header: 'Acciones',
                component: props.isAdmin ?
                    (row => (
                        <div className={'admin-search-actions'}>
                            <ActivateOrDeactivateButton defaultValue={row.active} id={row.id}/>
                            <i className={"fas fa-edit search-book-green-icon"}
                               onClick={() => props.openBookDetails(row.id)}/>
                        </div>
                    ))
                    :
                    (row => (<i className={"fas fa-eye search-book-eye"}
                                onClick={() => props.openBookDetails(row.id)}/>))
            }
        ];


    return (
        <>
            <div className={"search-book-table"}>
                <GenericTable columns={columns}
                              className={"table--4cols"}
                              data={props.paginationData?.content ?? []}/>
            </div>
            <div className={"search-book-pagination-container"}>
            <ReactPaginate pageCount={props.paginationData?.totalPages ?? 0}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={4}
                           forcePage={props.paginationData?.pageable.pageNumber ?? 0}
                           onPageChange={(data) => props.changePage(data.selected)}
                           nextLabel={"Próximo"}
                           previousLabel={"Anterior"}
                           breakLabel={'...'}
                           pageClassName={"pagination-page"}
                           nextClassName={"pagination-next"}
                           previousClassName={"pagination-previous"}
                           breakClassName={"pagination-break"}
                           activeClassName={"pagination-active-page"}
                           containerClassName={"pagination-container"}/>
            </div>
        </>
    )
}

export default SearchBookTable;
