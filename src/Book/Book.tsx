import React from 'react';
import "./Book.css";
import CreateBook from "./CreateBook";

const SEARCH = "SEARCH";
const CREATE = "CREATE";

const Book = () => {
    const [status, setStatus] = React.useState(SEARCH);

    const handleOpenCreation = () => {
        setStatus(CREATE);
    }

    const handleCloseCreation = () => {
        setStatus(SEARCH);
    }

    return (
        <div className={"book-main-container"}>
            {status === CREATE ? <div className={"create-book-container"}><CreateBook handleCancel={handleCloseCreation}/></div> : (
                <>
                    <div className={"book-search-container"}>
                        <input type={"text"} className={"search-field"}
                               placeholder={"Busque algún libro"}
                        />
                        <i className={'fas fa-plus-circle add-button'} onClick={handleOpenCreation}/>
                    </div>
                </>)}
        </div>
    )
}

export default Book;
