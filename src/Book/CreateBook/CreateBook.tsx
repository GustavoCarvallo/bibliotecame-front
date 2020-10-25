import React from 'react';
import {post} from "../../utils/http";
import {Book, CREATE} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";

type Props = {
    handleCancel: ()=>void,
}

const initialBook = {
    title: undefined,
    author: undefined,
    publisher: undefined,
    year: undefined,
    tags: [],
    reviews: [],
}

const CreateBook = (props: Props) => {
    const [key, setKey] = React.useState<number>(0);
    const [book, setBook] = React.useState<Book>({...initialBook});

    const handleSubmit = (book: Book, thenCallback: Function, catchCallback: Function) => {
        post("book", book)
            .then(res =>
            {
                setBook({...initialBook})
                setKey(key + 1);
                thenCallback();
                props.handleCancel();
            })
            .catch((e) => {
                    catchCallback(e);
            })
    }

    return <CreateOrEditBook handleCancel={props.handleCancel}
                             book={book}
                             setBook={setBook}
                             type={CREATE}
                             key={key}
                             handleSubmit={handleSubmit}
                             successMessage={'El libro se ha creado exitosamente.'}
                             activateCopy={()=>{}}
                             deactivateCopy={()=>{}}/>
}

export default CreateBook;
