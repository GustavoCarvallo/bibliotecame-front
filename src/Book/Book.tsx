import React from 'react';
import "./Book.css";
import CreateBook from "./CreateBook/CreateBook";
import EditBook from "./EditBook/EditBook";
import BookDetails from "./BookDetails/BookDetails";
import {get, post} from "../utils/http";
import SearchBook from "./SearchBook/SearchBook";
import {toast, ToastOptions} from "react-toastify";

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
    active?: boolean,
}

export type Tag = {
    name: string,
}

export type Copy = {
    id: string,
    booked?: boolean,
    active?: boolean
}

type Success = {
    success: boolean,
    message?: string,
}

type Props = {
    isAdmin: boolean,
}

const Book = (props: Props) => {

    const BAD_REQUEST = 400;
    const UNAUTHORIZED = 401;
    const TOO_MANY_REQUESTS = 429;
    const EXPECTATION_FAILED = 417;
    const NOT_ACCEPTABLE = 406;

    const [status, setStatus] = React.useState(SEARCH);

    const [selectedBook, setSelectedBook] = React.useState<Book | undefined>(undefined)

    const handleOpenCreation = () => {
        setStatus(CREATE);
    }

    const handleCloseCreation = () => {
        setSuccess({success: false});
        setStatus(SEARCH);
    }

    const handleCloseEdit = () => {
        handleCloseCreation();
        setSelectedBook(undefined);
    }

    const [success, setSuccess] = React.useState<Success>({
        success: false,
    });

    const openBookDetails = (id: number) => {
        get(`book/${id}`)
            .then(res => {
                setSelectedBook(res);
                props.isAdmin && setStatus(EDIT);
            })
            .catch(err => console.log(err))
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifySuccess = (expirationDate : string) => {
        toast.dismiss();
        toast.success('Solicitud de prestamo satisfactoria. Recuerde que debe devolverlo antes del ' + expirationDate, toastifyConfiguration);
    }

    const notifyError = (message : string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
    }

    const handleLoan = (book : Book) => {
        const promise =  post(`loan/${book.id}`, {});
        promise.then(res => {
            notifySuccess(res.expirationDate);
        })
            .catch((error) => {
                    notifyError(error);
            })
            .finally(()=> {
                setSelectedBook(undefined);
            })
    }


    const renderView = (status: string) => {
        switch (status) {
            case CREATE:
                return (<>
                    {success.success && <div className={'success-message-container'}>
                        <span className={'success-text'}>El libro se ha cargado correctamente</span>
                        <i className="fas fa-times success-close" onClick={() => setSuccess({success: false})}/>
                    </div>}
                    <div className={"create-book-container"}>
                        <CreateBook handleCancel={handleCloseCreation}/>
                    </div>
                </>)
            case SEARCH:
                return (
                    <>
                        <SearchBook isAdmin={props.isAdmin} handleOpenCreation={handleOpenCreation}
                                    openBookDetails={openBookDetails}/>
                        {selectedBook &&
                        <BookDetails isOpen={true} onClose={() => setSelectedBook(undefined)} selectedBook={selectedBook} handleLoan={handleLoan}/>}
                    </>
                )
            case EDIT:
                return (<>
                    {success.success && <div className={'success-message-container'}>
                        <span
                            className={'success-text'}>{success.message ?? 'El libro se ha modificado correctamente'}</span>
                        <i className="fas fa-times success-close" onClick={() => setSuccess({success: false})}/>
                    </div>}
                    <div className={"edit-book-container"}>
                        {selectedBook && (<EditBook selectedBook={selectedBook}
                                                    setSelectedBook={setSelectedBook}
                                                    handleCancel={handleCloseEdit}/>)
                        }
                    </div>
                </>)
            default:
                return null;
        }
    }

    return (
        <div className={"book-main-container"}>
            {renderView(status)}
        </div>
    )
}

export default Book;
