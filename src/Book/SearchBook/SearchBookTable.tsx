import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import "./SearchBookTable.css";
import ActivateOrDeactivateButton from "./ActivateOrDeactivateButton";
import ReactPaginate from 'react-paginate';
import {PaginationData} from "./SearchBook";
import GenericModal from "../../common/GenericModal/GenericModal";
import {post} from "../../utils/http";
import ActivateOrDeactivateModal from "./ActivateOrDeactivateModal";

type Props = {
    isAdmin: boolean,
    openBookDetails: (id: number) => void,
    paginationData?: PaginationData,
    changePage: (page: number) => void;
}

export type ActivateInformation = {
    id: number,
    active: boolean,
    callBack: (active: boolean)=>void,
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
    const [modalOpen, setModalOpen] = React.useState(false);
    const [activateInformation, setActivateInformation] = React.useState<ActivateInformation | undefined>(undefined);

    const columns: Column[] =
        [
            ...constColumns,
            {
                header: 'Acciones',
                component: props.isAdmin ?
                    (row => (
                        <div className={'admin-search-actions'}>
                            <ActivateOrDeactivateButton defaultValue={row.active}
                                                        openModal={openModal}
                                                        id={row.id}/>
                            <i className={"fas fa-edit search-book-green-icon"}
                               onClick={() => props.openBookDetails(row.id)}/>
                        </div>
                    ))
                    :
                    (row => (<i className={"fas fa-eye search-book-eye"}
                                onClick={() => props.openBookDetails(row.id)}/>))
            }
        ];

    const openModal = (id: number, active: boolean, callBack: (active:boolean)=>void) => {
        setModalOpen(true);
        setActivateInformation({id, active, callBack});
    }


    return (
        <>
            <ActivateOrDeactivateModal open={modalOpen}
                                       setOpen={setModalOpen}
                                       activateInformation={activateInformation}/>
            <div className={"search-book-table"}>
                <GenericTable columns={columns}
                              className={"table--4cols"}
                              noDataText={"Libro no encontrado"}
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
