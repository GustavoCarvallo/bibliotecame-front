import React from 'react';
import "./Book.css";
import CreateBook from "./CreateBook/CreateBook";
import EditBook from "./EditBook/EditBook";
import BookDetails from "./BookDetails/BookDetails";
import {get, post} from "../utils/http";
import SearchBook, {SearchForm} from "./SearchBook/SearchBook";
import {toast, ToastOptions} from "react-toastify";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import {isAdmin} from "../router/Routes";

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

const Book = () => {

    const admin = isAdmin();

    const [status, setStatus] = React.useState(SEARCH);
    const [searchForm, setSearchForm] = React.useState<SearchForm>({title:"", author:"", publisher:"", tags:[], year:""})
    const [selectedBook, setSelectedBook] = React.useState<Book | undefined>(undefined)
    const [filterModal, setFilterModal] = React.useState<boolean>(false);
    const [callSearch, setCallSearch] = React.useState<boolean>(false);

    const handleOpenCreation = () => {
        setStatus(CREATE);
    }

    const handleOpenFilter = () => {
        setFilterModal(true);
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
                admin && setStatus(EDIT);
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
                        <SearchBook callAdvancedSearch={callSearch} setCallAdvancedSearch={setCallSearch} handleOpenCreation={handleOpenCreation} handleOpenFilter={handleOpenFilter}
                                    openBookDetails={openBookDetails} searchForm={searchForm} setSearchForm={setSearchForm}/>
                        {selectedBook &&
                        <BookDetails isOpen={true} onClose={() => setSelectedBook(undefined)} selectedBook={selectedBook} handleLoan={handleLoan}/>}
                        {filterModal &&
                        <AdvancedSearch isOpen={true} setDone={setCallSearch} onClose={() => setFilterModal(false)} searchForm={searchForm} changeSearchForm={setSearchForm}/>
                        }
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
