import React from 'react';
import {Book, CREATE, EDIT} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";
import {put} from "../../utils/http";

type Props = {
    selectedBook: Book,
    setSelectedBook: Function,
    setSuccess: Function,
    handleCancel: Function,
}

const EditBook = (props: Props) => {
    const handleSubmit = (book: Book, thenCallback: Function, catchCallback: Function) => {
        put(`book/${book.id}`, book, {headers: {"Content-Type": "application/json"}})
            .then(res => thenCallback())
            .catch(err => catchCallback());
    }

    return <CreateOrEditBook handleCancel={props.handleCancel}
                             setSuccess={props.setSuccess}
                             type={EDIT} handleSubmit={handleSubmit}
                             selectedBook={props.selectedBook}/>
}

export default EditBook;
