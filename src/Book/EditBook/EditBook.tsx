import React, {useState} from 'react';
import {Book, EDIT} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";
import {put} from "../../utils/http";
import GenericModal from "../../common/GenericModal/GenericModal";

type Props = {
    selectedBook: Book,
    setSelectedBook: Function,
    setSuccess: Function,
    handleCancel: Function,
}

const EditBook = (props: Props) => {

    const [openNewCopy, setOpenNewCopy] = useState<boolean>(false);

    const handleSubmit = (book: Book, thenCallback: Function, catchCallback: Function) => {
        put(`book/${book.id}`, book, {headers: {"Content-Type": "application/json"}})
            .then(res => thenCallback())
            .catch(err => catchCallback(err.status));
    }

    const openNewCopyModal = () => {
        setOpenNewCopy(true);
    }

    const closeNewCopyModal = () => {
        setOpenNewCopy(false);
    }


    return (
        <>
            <GenericModal isOpen={openNewCopy} title={"Nuevo Ejemplar"} onClose={closeNewCopyModal}/>
            <CreateOrEditBook handleCancel={props.handleCancel}
                              setSuccess={props.setSuccess}
                              type={EDIT} handleSubmit={handleSubmit}
                              selectedBook={props.selectedBook} openNewCopyModal={openNewCopyModal}/>
        </>
    )
}

export default EditBook;
