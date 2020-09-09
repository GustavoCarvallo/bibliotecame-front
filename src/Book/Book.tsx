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

    const [success, setSuccess] = React.useState<boolean>(false);

    return (
        <div className={"book-main-container"}>
            {status === CREATE ?
                (<>
                    {success && <div className={'success-message-container'}>
                        <span className={'success-text'}>El libro se ha cargado correctamente</span>
                        <i className="fas fa-times success-close" onClick={() => setSuccess(false)}/>
                    </div>}
                    <div className={"create-book-container"}>
                        <CreateBook handleCancel={handleCloseCreation} setSuccess={setSuccess}/>
                    </div>
                </>) : (
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
