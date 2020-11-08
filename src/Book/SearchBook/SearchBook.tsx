import React, {MouseEvent, useEffect} from 'react';
import "./SearchBook.css";
import SearchBookTable from "./SearchBookTable";
import {Book, Tag} from "../Book";
import {get, put} from "../../utils/http";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import {toast} from "react-toastify";
import {isAdmin} from "../../router/Routes";
import ReactTooltip from "react-tooltip";

type Props = {
    openBookDetails: (id: number) => void,
    handleOpenCreation: (e: MouseEvent) => void,
    handleOpenFilter: (e: MouseEvent) => void,
    searchForm: SearchForm,
    setSearchForm: (s: SearchForm) => void,
    callAdvancedSearch: boolean,
    callSearch: boolean,
    setCallAdvancedSearch: (b: boolean) => void
    setCallSearch: (b: boolean) => void
}

export type PaginationData<T> = {
    content: T[],
    totalPages: number,
    pageable: Pageable,
}

type Pageable = {
    pageNumber: number,
}

export type SearchForm = {
    title: string,
    publisher: string,
    author: string,
    tags: Tag[],
    year: string
}


const SearchBook = (props: Props) => {
    const admin = isAdmin();

    const [searchFilter, setSearchFilter] = React.useState<string>("");
    const [paginationData, setPaginationData] = React.useState<PaginationData<Book> | undefined>(undefined);

    const notifyError = (message: String) => {
        toast.dismiss()
        toast.error(message)
    }

    useEffect(() => {
        getBooksByFilter(0, "");
    }, [])

    useEffect(() => {
        if (props.callAdvancedSearch) {
            getBooksByAdvancedFilter(0);
            props.setCallAdvancedSearch(false);
        }
    }, [props.callAdvancedSearch])

    useEffect(() => {
        if (props.callSearch) {
            getBooksByFilter(0, searchFilter);
            props.setCallSearch(false);
        }
    }, [props.callSearch])

    const handleFilterChange = (event: any) => {
        getBooksByFilter(0, event.target.value);
        setSearchFilter(event.target.value);
    }

    const changePage = (page: number) => {
        if (props.searchForm.title !== "" ||
            props.searchForm.author !== "" ||
            props.searchForm.publisher !== "" ||
            props.searchForm.year !== "" ||
            props.searchForm.tags.length !== 0) {
            getBooksByAdvancedFilter(page);
        } else {
            getBooksByFilter(page, searchFilter);
        }
    }

    const getBooksByFilter = (page: number, search: string) => {
        props.setSearchForm({title: "", author: "", publisher: "", tags: [], year: ""})
        get(`book/search?page=${page}&search=${search}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch((error) => {
                notifyError(error);
            })
    }

    const getBooksByAdvancedFilter = (page: number) => {
        const tagNames = props.searchForm.tags.map(i => i.name)
        put(`book/advancedSearch?page=${page}`, {...props.searchForm, tags: tagNames, title: searchFilter})
            .then(res => {
                setPaginationData(res);
            })
            .catch((error) => {
                notifyError(error);
            });
    }

    return (
        <div className="search-book-screen">
            <ReactTooltip/>
            <div className={"book-search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={searchFilter}
                               onChange={handleFilterChange}
                               placeholder={"Busque algún libro"}/>
                {admin &&
                <i className={'fas fa-plus-circle add-button'} onClick={props.handleOpenCreation} data-tip={"Crear"}/>
                }
                {!admin &&
                <i className="fas fa-filter add-button" onClick={props.handleOpenFilter} data-tip={"Filtros"}/>
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
