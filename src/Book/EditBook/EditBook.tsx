import React, {useState} from 'react';
import {Book, EDIT} from "../Book";
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

    const onCreateCopySuccess = () => {
        props.setSuccess(true, "Ejemplar añadido satisfactoriamente");
    }

    const onCreateCopyError = () => {
        setNewCopyError(true);
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
                              selectedBook={props.selectedBook}
                              newCopyError={newCopyError}
                              openNewCopyModal={openNewCopyModal}/>
        </>
    )
}

export default EditBook;
