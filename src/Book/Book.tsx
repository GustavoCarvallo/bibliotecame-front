import React from 'react';
import "./Book.css";
import CreateBook from "./CreateBook/CreateBook";
import EditBook from "./EditBook/EditBook";

const SEARCH = "SEARCH";
export const CREATE = "CREATE";
export const EDIT = "EDIT";

export type Book = {
    id?: number,
    copies?: Copy[],
    title?: string,
    author?: string,
    publisher?: string,
    year?: number,
    tags: Tag[],
}

export type Tag = {
    name: string,
}

export type Copy = {
    id: string,
    check: boolean,
}

type Success = {
    success: boolean,
    message?: string,
}



const Book = () => {
    const [status, setStatus] = React.useState(EDIT);

    const [selectedBook, setSelectedBook] = React.useState<Book>({
        id: 2,
        title: "Titulo del libro",
        author: "Facundo Bocalandro",
        publisher: "Editorial",
        year: 2010,
        tags: [{name: "tag1"}],
        copies: [],
    })

    const handleOpenCreation = () => {
        setStatus(CREATE);
    }

    const handleCloseCreation = () => {
        setSuccess({success: false});
        setStatus(SEARCH);
    }

    const [success, setSuccess] = React.useState<Success>({
        success: false,
    });

    const handleSetSuccess = (success: boolean, message?: string) => {
        setSuccess({
            success,
            message
        })
    }

    const renderView = (status: string) => {
        switch (status){
            case CREATE:
                return (<>
                    {success.success && <div className={'success-message-container'}>
                        <span className={'success-text'}>El libro se ha cargado correctamente</span>
                        <i className="fas fa-times success-close" onClick={() => setSuccess({success: false})}/>
                    </div>}
                    <div className={"create-book-container"}>
                        <CreateBook handleCancel={handleCloseCreation} setSuccess={handleSetSuccess}/>
                    </div>
                </>)
            case SEARCH:
                return (
                    <>
                        <div className={"book-search-container"}>
                            <input type={"text"} className={"search-field"}
                                   placeholder={"Busque algún libro"}
                            />
                            <i className={'fas fa-plus-circle add-button'} onClick={handleOpenCreation}/>
                        </div>
                    </>)
            case EDIT:
                return (<>
                    {success.success && <div className={'success-message-container'}>
                        <span className={'success-text'}>{success.message ?? 'El libro se ha modificado correctamente'}</span>
                        <i className="fas fa-times success-close" onClick={() => setSuccess({success: false})}/>
                    </div>}
                    <div className={"edit-book-container"} id={"edit-book-container"}>
                        <EditBook selectedBook={selectedBook}
                                  setSelectedBook={setSelectedBook}
                                  setSuccess={handleSetSuccess}
                                  handleCancel={handleCloseCreation}/>
                    </div>
                </>)
            default: return null;
        }
    }

    return (
        <div className={"book-main-container"}>
            {renderView(status)}
        </div>
    )
}

export default Book;
