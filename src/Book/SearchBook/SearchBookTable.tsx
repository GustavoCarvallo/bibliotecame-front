import React from 'react';
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import "./SearchBookTable.css";
import ActivateOrDeactivateButton from "./ActivateOrDeactivateButton";
import {PaginationData} from "./SearchBook";
import ActivateOrDeactivateModal from "./ActivateOrDeactivateModal";
import {Book} from "../Book";
import GenericPagination from "../../common/Pagination/GenericPagination";
import {isAdmin} from "../../router/Routes";

type Props = {
    openBookDetails: (id: number) => void,
    paginationData?: PaginationData<Book>,
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
    const admin = isAdmin();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [activateInformation, setActivateInformation] = React.useState<ActivateInformation | undefined>(undefined);

    const columns: Column[] = [
            ...constColumns,
            {
                header: 'Acciones',
                component: admin ?
                    (row => (
                        <div className={'admin-search-actions'}>
                            <ActivateOrDeactivateButton defaultValue={row.active}
                                                        openModal={openModal}
                                                        key={row.id}
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
                <GenericPagination pageCount={props.paginationData?.totalPages ?? 0}
                                   forcePage={props.paginationData?.pageable.pageNumber ?? 0}
                                   onPageChange={(selected) => props.changePage(selected)}/>
            </div>
        </>
    )
}

export default SearchBookTable;
