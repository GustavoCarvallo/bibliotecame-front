import React, {MouseEvent} from 'react';
import "./SearchBook.css";
import SearchBookTable from "./SearchBookTable";

type Props = {
    isAdmin: boolean,
    openBookDetails: (id: number) => void,
    handleOpenCreation: (e: MouseEvent) => void,
}

const SearchBook = (props: Props) => {
    return (
        <>
            <div className={"book-search-container"}>
                <input type={"text"} className={"search-field"}
                       placeholder={"Busque algún libro"}
                />
                {props.isAdmin &&
                <i className={'fas fa-plus-circle add-button'} onClick={props.handleOpenCreation}/>
                }
            </div>
            <div className={"search-book-table-container"}>
                <SearchBookTable isAdmin={props.isAdmin} openBookDetails={props.openBookDetails}/>
            </div>
        </>
    )
}

export default SearchBook;
