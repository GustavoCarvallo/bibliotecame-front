import React from 'react';
import {post} from "../../utils/http";
import {Book, CREATE} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";

type Props = {
    handleCancel: ()=>void,
    setSuccess: Function,
}

const initialBook = {
    title: undefined,
    author: undefined,
    publisher: undefined,
    year: undefined,
    tags: [],
}

const CreateBook = (props: Props) => {
    const [key, setKey] = React.useState<number>(0);
    const [book, setBook] = React.useState<Book>({...initialBook});

    const handleSubmit = (book: Book, thenCallback: Function, catchCallback: Function) => {
        post("book", book, {headers: {"Content-Type": "application/json"}})
            .then(res =>
            {
                setBook({...initialBook})
                setKey(key + 1);
                thenCallback();
            })
            .catch(err => catchCallback(err.status));
    }

    return <CreateOrEditBook handleCancel={props.handleCancel}
                             book={book}
                             setBook={setBook}
                             setSuccess={props.setSuccess}
                             type={CREATE}
                             key={key}
                             handleSubmit={handleSubmit}/>
}

export default CreateBook;