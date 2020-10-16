import React, {MouseEvent, useEffect} from 'react';
import "./SearchBook.css";
import SearchBookTable from "./SearchBookTable";
import {Book} from "../Book";
import {get} from "../../utils/http";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import {toast} from "react-toastify";
import {isAdmin} from "../../router/Routes";

type Props = {
    openBookDetails: (id: number) => void,
    handleOpenCreation: (e: MouseEvent) => void,
}

export type PaginationData<T> = {
    content: T[],
    totalPages: number,
    pageable: Pageable,
}

type Pageable = {
    pageNumber: number,
}


const SearchBook = (props: Props) => {
    const admin = isAdmin();

    const [searchFilter, setSearchFilter] = React.useState<string>("");
    const [paginationData, setPaginationData] = React.useState<PaginationData<Book> | undefined>(undefined);

    const notifySuccess = (message: String) => {
        toast.dismiss()
        toast.success(message)
    }

    const notifyError = (message: String) => {
        toast.dismiss()
        toast.error(message)
    }

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
            .catch((error) => {
                    notifyError(error);
            })
    }

    return (
        <div className="search-book-screen">
            <div className={"book-search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={searchFilter}
                               onChange={handleFilterChange}
                               placeholder={"Busque algún libro"}/>
                {admin &&
                <i className={'fas fa-plus-circle add-button'} onClick={props.handleOpenCreation}/>
                }
            </div>
            <div className={"search-book-table-container"}>
                <SearchBookTable paginationData={paginationData}
                                 openBookDetails={props.openBookDetails}
                                 changePage={changePage}/>
            </div>
        </div>
    )
}

export default SearchBook;
