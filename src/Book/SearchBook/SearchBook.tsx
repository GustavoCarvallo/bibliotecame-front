import React, {MouseEvent, useEffect} from 'react';
import "./SearchBook.css";
import SearchBookTable from "./SearchBookTable";
import {Book} from "../Book";
import {get} from "../../utils/http";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";

type Props = {
    isAdmin: boolean,
    openBookDetails: (id: number) => void,
    handleOpenCreation: (e: MouseEvent) => void,
}

export type PaginationData = {
    content: Book[],
    totalPages: number,
    pageable: Pageable,
}

type Pageable = {
    pageNumber: number,
}


const SearchBook = (props: Props) => {
    const [searchFilter, setSearchFilter] = React.useState<string>("");
    const [paginationData, setPaginationData] = React.useState<PaginationData | undefined>(undefined);

    useEffect(() => {
        getBooksByFilter(0, "");
    }, [])

    const handleFilterChange = (event: any) => {
        getBooksByFilter(0, event.target.value);
        setSearchFilter(event.target.value);
    }

    const changePage = (page: number) => {
        getBooksByFilter(page, searchFilter);
    }

    const getBooksByFilter = (page: number, search: string) => {
        get(`book/search?page=${page}&search=${search}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(() => alert("Error de servidor"));
    }

    return (
        <>
            <div className={"book-search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={searchFilter}
                               onChange={handleFilterChange}
                               placeholder={"Busque algún libro"}/>
                {props.isAdmin &&
                <i className={'fas fa-plus-circle add-button'} onClick={props.handleOpenCreation}/>
                }
            </div>
            <div className={"search-book-table-container"}>
                <SearchBookTable isAdmin={props.isAdmin}
                                 paginationData={paginationData}
                                 openBookDetails={props.openBookDetails}
                                 changePage={changePage}/>
            </div>
        </>
    )
}

export default SearchBook;
