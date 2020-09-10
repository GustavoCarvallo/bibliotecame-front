import React from 'react';
import "./CreateOrEditBook.css";
import {Book, CREATE, Tag} from "./Book";

type Props = {
    selectedBook?: Book,
    handleSubmit: Function,
    type: string,
    handleCancel: Function,
    setSuccess: Function,
}
type Errors = {
    titleError: boolean,
    authorError: boolean,
    publisherError: boolean,
    yearErrors: YearErrors,
    serverError?: number,
}

type YearErrors = {
    yearHigher: boolean,
    yearLower: boolean,
    yearUndefined: boolean,
}

const CreateOrEditBook = (props: Props) => {
    const isCreate = props.type === CREATE;
    const MAX_YEAR = (new Date()).getFullYear();
    const MIN_YEAR = 800;


    const [book, setBook] = React.useState<Book>(props.selectedBook ?? {
        title: undefined,
        authorName: undefined,
        authorSurname: undefined,
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
        },
    })

    const [tagToAdd, setTagToAdd] = React.useState<Tag>({
        name: "",
    });

    const handleSubmit = () => {
        let newErrors = validateBook(book);
        let valid = !newErrors.titleError && !newErrors.authorError && !newErrors.publisherError && !newErrors.yearErrors.yearHigher && !newErrors.yearErrors.yearLower && !newErrors.yearErrors.yearUndefined;
        if (valid) {
            props.handleSubmit({
                ...book,
                author: {firstName: book.authorName, lastName: book.authorSurname},
                publisher: {name: book.publisher}
            }, () => props.setSuccess(true), (status: number) => setErrors({...errors, serverError: status}))
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
        if (!book.authorName || book.authorName === "") {
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
            yearErrors,
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
            <div className={"create-book-title"}>{isCreate ? 'Nuevo Libro' : 'Editar Libro'}</div>
            {(errors.titleError && renderError("Completar título")) ||
            (errors.authorError && renderError("Completar autor")) ||
            (errors.publisherError && renderError("Completar editorial")) ||
            (errors.yearErrors.yearUndefined && renderError("Completar año")) ||
            (errors.yearErrors.yearHigher && renderError("Año debe ser menor a " + MAX_YEAR)) ||
            (errors.yearErrors.yearLower && renderError("Año debe ser mayor a " + MIN_YEAR)) ||
            (errors.serverError && renderStatusError(errors.serverError))
            }
            <div>
                <div className="box">
                    <div className="rectangle-2">
                        <input className="input" placeholder="Titulo" value={book.title}
                               onChange={event => setBook({...book, title: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" placeholder="Editorial" value={book.publisher}
                               onChange={event => setBook({...book, publisher: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" placeholder="Nombre de autor" value={book.authorName}
                               onChange={event => setBook({...book, authorName: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" placeholder="Apellido de autor" value={book.authorSurname}
                               onChange={event => setBook({...book, authorSurname: event.target.value})}/>
                    </div>
                    <div className="rectangle-2 tags-field">
                        <input className={"input"} placeholder="Etiquetas" value={tagToAdd.name}
                               maxLength={35} onChange={event => setTagToAdd({name: event.target.value})}/>
                        <i className="fas fa-plus icon" onClick={event => addTag(tagToAdd)}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" type={"number"} placeholder="Año" value={book.year} min={MIN_YEAR}
                               max={MAX_YEAR}
                               onChange={event => setBook({...book, year: parseInt(event.target.value)})}/>
                    </div>
                    {renderTags(book.tags)}
                    {!isCreate && (
                        <div className={"copies-container"}>
                            <div className="copies-table">
                                <div className={"copies-header-row"}>
                                    <div className={"copies-header"}>ID de Ejemplar</div>
                                    <div/>
                                    <div className={"copies-header"}>Acciones</div>
                                </div>
                                {props.selectedBook?.copies?.map(copy => (
                                    <div className={"copies-row"}>
                                        <div className={"copies-col"}>{copy.id}</div>
                                        <div/>
                                        <div className={"copies-col"}>
                                            <i className={copy.check ? "far fa-check-circle copies-check" : "fas fa-ban copies-ban"}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <i className={'fas fa-plus-circle copies-add-button'} onClick={() => {
                            }}/>
                        </div>
                    )}
                </div>
                <div className={"save-and-cancel-buttons"}>
                    <button className="rectangle-6-red" onClick={event => props.handleCancel()}>
                        <p className="cancel-button">Cancelar</p>
                    </button>
                    <button className="rectangle-6" onClick={handleSubmit}>
                        <p className="save-button">Guardar</p>
                    </button>
                </div>

            </div>
        </div>
    )
}

const renderStatusError = (status: number) => {
    switch (status) {
        case 400:
            return renderError("Comprobar que el autor y la editorial hayan sido cargados")
        case 406:
            return renderError("El libro ya existe en el sistema")
        default:
            return renderError("Error del servidor")
    }
}

const renderError = (message: string) => {
    return (
        <div className={"error-box"}>
            <div className={"error-message"}>{message}</div>
        </div>
    )
}

export default CreateOrEditBook;
