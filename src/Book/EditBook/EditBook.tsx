import React, {useState} from 'react';
import {Book, Copy, EDIT} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";
import {put} from "../../utils/http";
import CreateCopyModal from "../CreateCopy/CreateCopyModal";

type Props = {
    selectedBook: Book,
    setSelectedBook: Function,
    setSuccess: Function,
    handleCancel: ()=>void,
}

const EditBook = (props: Props) => {

    const [openNewCopy, setOpenNewCopy] = useState<boolean>(false);
    const [newCopyError, setNewCopyError] = useState<boolean>(false);

    const handleSubmit = (book: Book, thenCallback: Function, catchCallback: Function) => {
        put(`book/${book.id}`, book, {headers: {"Content-Type": "application/json"}})
            .then(res => thenCallback())
            .catch(err => catchCallback(err.status));
    }

    const openNewCopyModal = () => {
        setOpenNewCopy(true);
        setNewCopyError(false);
        props.setSuccess(false);
    }

    const closeNewCopyModal = () => {
        setOpenNewCopy(false);
    }

    const onCreateCopySuccess = (copy: Copy) => {
        props.setSuccess(true, "Ejemplar añadido satisfactoriamente");
        addCopy(copy);
    }

    const onCreateCopyError = () => {
        setNewCopyError(true);
    }

    const addCopy = (copy: Copy) => {
        const previousCopies = props.selectedBook.copies?.splice(0) ?? [];
        previousCopies.push(copy);
        props.setSelectedBook({...props.selectedBook, copies: previousCopies})
    }

    return (
        <>
            <CreateCopyModal isOpen={openNewCopy} onClose={closeNewCopyModal}
                             book={props.selectedBook}
                             onSuccess={onCreateCopySuccess}
                             onError={onCreateCopyError}/>
            <CreateOrEditBook handleCancel={props.handleCancel}
                              setSuccess={props.setSuccess}
                              type={EDIT} handleSubmit={handleSubmit}
                              book={props.selectedBook}
                              setBook={props.setSelectedBook}
                              newCopyError={newCopyError}
                              openNewCopyModal={openNewCopyModal}/>
        </>
    )
}

export default EditBook;
