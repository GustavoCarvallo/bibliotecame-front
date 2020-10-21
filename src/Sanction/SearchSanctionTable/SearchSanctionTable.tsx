import React from "react";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import {isAdmin} from "../../router/Routes";
import GenericPagination from "../../common/Pagination/GenericPagination";
import {SanctionDisplay} from "../SanctionsView";

type Props = {
    paginationData?: PaginationData<SanctionDisplay>,
    changePage: (page: number) => void;
}

const constColumns: Column[] = [
    {
        header: 'Alumno',
        accessor: 'email'
    },
    {
        header: 'Sancionado Desde',
        accessor: 'creationDate'
    },
    {
        header: 'Sancionado Hasta',
        accessor: 'endDate'
    },
]

const SearchBookTable = (props: Props) => {
    const admin = isAdmin();
    const [modalOpen, setModalOpen] = React.useState(false);


    const columns: Column[] = [
        ...constColumns,
        {
            header: 'Acciones',
            component:
                (row => (
                    <div className={'admin-search-actions'}>
                        <i className={"fas fa-edit search-book-green-icon"}
                           onClick={()=> {}}/>
                    </div>
                ))
        }
    ];

    // const openModal = (id: number, active: boolean, callBack: (active:boolean)=>void) => {
    //     setModalOpen(true);
    //     setActivateInformation({id, active, callBack});
    // }


    return (
        <>
            <div className={"search-book-table"}>
                <GenericTable columns={columns}
                              className={"table--4cols"}
                              noDataText={"Sanción no encontrada"}
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