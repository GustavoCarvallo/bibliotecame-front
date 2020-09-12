import React from 'react';
import {post} from "../../utils/http";
import {Book, CREATE} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";

type Props = {
    handleCancel: Function,
    setSuccess: Function,
}

const CreateBook = (props: Props) => {
    const handleSubmit = (book: Book, thenCallback: Function, catchCallback: Function) => {
        post("book", book, {headers: {"Content-Type": "application/json"}})
            .then(res => thenCallback())
            .catch(err => catchCallback(err.status));
    }

    return <CreateOrEditBook handleCancel={props.handleCancel}
                             setSuccess={props.setSuccess}
                             type={CREATE} handleSubmit={handleSubmit}/>
}

export default CreateBook;
