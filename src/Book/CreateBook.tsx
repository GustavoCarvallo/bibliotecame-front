import React from 'react';
import "./CreateBook.css";
import {post} from "../utils/http";

type Props = {
    handleCancel: Function,
}

type Book = {
    title: string | undefined,
    author: string | undefined,
    publisher: string | undefined,
    year: number | undefined,
    tags: Tag[],
}

type Tag = {
    name: string,
}

type Errors = {
    titleError: boolean,
    authorError: boolean,
    publisherError: boolean,
    yearErrors: YearErrors,
}

type YearErrors = {
    yearHigher: boolean,
    yearLower: boolean,
    yearUndefined: boolean,
}


const CreateBook = (props: Props) => {
    const MAX_YEAR = (new Date()).getFullYear();
    const MIN_YEAR = 800;


    const [book, setBook] = React.useState<Book>({
        title: undefined,
        author: undefined,
        publisher: undefined,
        year: undefined,
        tags: [],
    });

    const [errors, setErrors] = React.useState<Errors>({
        titleError: false,
        authorError: false,
        publisherError: false,
        yearErrors: {
            yearHigher: false,
            yearLower: false,
            yearUndefined: false,
        }
    })

    const [tagToAdd, setTagToAdd] = React.useState<Tag>({
        name: "",
    });

    const handleSubmit = () => {
        let newErrors = validateBook(book);
        let valid = !newErrors.titleError && !newErrors.authorError && !newErrors.publisherError && !newErrors.yearErrors.yearHigher && !newErrors.yearErrors.yearLower && !newErrors.yearErrors.yearUndefined;
        if (valid) {
            post("book", {...book, author: {firstName: book.author, lastName: ""}, publisher: {name: book.publisher}}, {headers: {"Content-Type": "application/json"}})
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else {
            setErrors(newErrors);
        }
    }

    const validateBook = (book: Book) => {
        let titleError: boolean = false;
        let authorError: boolean = false;
        let publisherError: boolean = false;
        let yearErrors: YearErrors = {
            yearHigher: false,
            yearLower: false,
            yearUndefined: false,
        }

        if (!book.title || book.title === "") {
            titleError = true;
        }
        if (!book.author || book.author === "") {
            authorError = true;
        }
        if (!book.publisher || book.publisher === "") {
            publisherError = true;
        }
        if (!book.year) {
            yearErrors.yearUndefined = true;
        } else if (book.year > MAX_YEAR) {
            yearErrors.yearHigher = true;
        } else if (book.year < MIN_YEAR) {
            yearErrors.yearLower = true;
        }

        const newErrors: Errors = {
            titleError,
            authorError,
            publisherError,
            yearErrors
        }

        return newErrors;
    }

    const addTag = (tag: Tag) => {
        setBook({
            ...book,
            tags: [...book.tags, tag],
        })
    }

    const deleteTag = (tagToDelete: Tag) => {
        setBook({
            ...book,
            tags: book.tags.splice(0).filter(tag => tag.name !== tagToDelete.name)
        })
    }

    const renderTags = (tags: Tag[]) => {
        return (
            <div className={"tag-container"}>
                {tags.map(tag => (
                    <div className={"tag"}>
                        <div className={"tag-name"}>{tag.name}</div>
                        <div className={"tag-icon-container"}>
                            <i className="fas fa-times icon" onClick={() => deleteTag(tag)}/>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={"create-book"}>
            <div className={"create-book-title"}>Nuevo Libro</div>
            {(errors.titleError && renderError("Completar título")) ||
            (errors.authorError && renderError("Completar autor")) ||
            (errors.publisherError && renderError("Completar editorial")) ||
            (errors.yearErrors.yearUndefined && renderError("Completar año")) ||
            (errors.yearErrors.yearHigher && renderError("Año debe ser menor a " + MAX_YEAR)) ||
            (errors.yearErrors.yearLower && renderError("Año debe ser mayor a " + MIN_YEAR))}
            <div>
                <div className="box">
                    <div className="rectangle-2">
                        <input className="input" placeholder="Titulo" value={book.title}
                               onChange={event => setBook({...book, title: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" placeholder="Autor" value={book.author}
                               onChange={event => setBook({...book, author: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" placeholder="Editorial" value={book.publisher}
                               onChange={event => setBook({...book, publisher: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" type={"number"} placeholder="Año" value={book.year} min={MIN_YEAR}
                               max={MAX_YEAR}
                               onChange={event => setBook({...book, year: parseInt(event.target.value)})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className={"input"} placeholder="Etiquetas" value={tagToAdd.name}
                               maxLength={35} onChange={event => setTagToAdd({name: event.target.value})}/>
                        <i className="fas fa-plus icon" onClick={event => addTag(tagToAdd)}/>
                    </div>
                    {renderTags(book.tags)}
                </div>

                <button className="rectangle-6-red" onClick={event => props.handleCancel()}>
                    <p className="cancel-button">Cancelar</p>
                </button>
                <button className="rectangle-6" onClick={handleSubmit}>
                    <p className="save-button">Guardar</p>
                </button>

            </div>
        </div>
    )
}

const renderError = (message: string) => {
    return (
        <div className={"error-box"}>
            <div className={"error-message"}>{message}</div>
        </div>
    )
}

export default CreateBook;
