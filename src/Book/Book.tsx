import React from 'react';
import "./Book.css";
import CreateBook from "./CreateBook";
import EditBook from "./EditBook/EditBook";

const SEARCH = "SEARCH";
export const CREATE = "CREATE";
export const EDIT = "EDIT";

export type Book = {
    id?: number,
    title: string | undefined,
    authorName: string | undefined,
    authorSurname: string | undefined,
    publisher: string | undefined,
    year: number | undefined,
    tags: Tag[],
}

export type Tag = {
    name: string,
}


const Book = () => {
    const [status, setStatus] = React.useState(SEARCH);

    const [selectedBook, setSelectedBook] = React.useState<Book>({
        id: 1,
        title: "Title",
        authorName: "Author name",
        authorSurname: "Author surname",
        publisher: "Publisher name",
        year: 2015,
        tags: [{name: "Tag1"}],
    })

    const handleOpenCreation = () => {
        setStatus(CREATE);
    }

    const handleCloseCreation = () => {
        setSuccess(false);
        setStatus(SEARCH);
    }

    const [success, setSuccess] = React.useState<boolean>(false);

    const renderView = (status: string) => {
        switch (status){
            case CREATE:
                return (<>
                    {success && <div className={'success-message-container'}>
                        <span className={'success-text'}>El libro se ha cargado correctamente</span>
                        <i className="fas fa-times success-close" onClick={() => setSuccess(false)}/>
                    </div>}
                    <div className={"create-book-container"}>
                        <CreateBook handleCancel={handleCloseCreation} setSuccess={setSuccess}/>
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
                    <div className={"create-book-container"}>
                        <EditBook selectedBook={selectedBook}
                                  setSelectedBook={setSelectedBook}
                                  setSuccess={setSuccess}
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
