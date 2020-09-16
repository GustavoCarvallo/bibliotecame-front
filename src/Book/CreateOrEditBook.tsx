import React from 'react';
import "./CreateOrEditBook.css";
import {Book, CREATE, Tag} from "./Book";
import CreateAndCancelButtons from "../common/CreateAndCancelButtons/CreateAndCancelButtons";
import TagContainer from "../common/TagContainer/TagContainer";

type Props = {
    book: Book,
    setBook: Function,
    handleSubmit: Function,
    type: string,
    handleCancel: ()=>void,
    setSuccess: Function,
    openNewCopyModal?: Function,
    newCopyError?: boolean,
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

const initialBook = {
    title: undefined,
    author: undefined,
    publisher: undefined,
    year: undefined,
    tags: [],
}
const initialErrors = {
    titleError: false,
    authorError: false,
    publisherError: false,
    yearErrors: {
        yearHigher: false,
        yearLower: false,
        yearUndefined: false,
    },
};

const CreateOrEditBook = (props: Props) => {
    const isCreate = props.type === CREATE;
    const MAX_YEAR = (new Date()).getFullYear();
    const MIN_YEAR = 800;

    const [errors, setErrors] = React.useState<Errors>({...initialErrors})

    const [tagToAdd, setTagToAdd] = React.useState<Tag>({
        name: "",
    });

    const handleSubmit = () => {
        let newErrors = validateBook(props.book);
        let valid = !newErrors.titleError && !newErrors.authorError && !newErrors.publisherError && !newErrors.yearErrors.yearHigher && !newErrors.yearErrors.yearLower && !newErrors.yearErrors.yearUndefined;
        if (valid) {
            props.handleSubmit(props.book, handleSuccess, (status: number) => setErrors({...newErrors, serverError: status}))
        }else {
            setErrors(newErrors);
        }
    }

    const handleSuccess = () => {
        props.setSuccess(true);
        setErrors({...errors, serverError: undefined})
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
            yearErrors,
        }

        return newErrors;
    }

    const addTag = (tag: Tag) => {
        if (tag.name !== "") {
            props.setBook({
                ...props.book,
                tags: [...props.book.tags, tag],
            });
            setTagToAdd({name: ""});
        }
    }

    const deleteTag = (tagToDelete: Tag) => {
        props.setBook({
            ...props.book,
            tags: props.book.tags.splice(0).filter(tag => tag.name !== tagToDelete.name)
        })
    }

    const renderTags = (tags: Tag[]) => {
        return (
            <div className={"creat-or-edit-tags-container"}>
                <TagContainer tags={tags} deleteTag={deleteTag}/>
            </div>
            )
    }

    return (
        <div className={"create-book"}>
            <div className={"create-book-title"}>{isCreate ? 'Nuevo Libro' : 'Editar Libro'}</div>
            {(props.newCopyError && renderError("Error al crear ejemplar")) ||
            (errors.titleError && renderError("Completar título")) ||
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
                        <input className="input" placeholder="Titulo" value={props.book.title}
                               onChange={event => props.setBook({...props.book, title: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" placeholder="Editorial" value={props.book.publisher}
                               onChange={event => props.setBook({...props.book, publisher: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" placeholder="Autor" value={props.book.author}
                               onChange={event => props.setBook({...props.book, author: event.target.value})}/>
                    </div>
                    <div className="rectangle-2">
                        <input className="input" type={"number"} placeholder="Año" value={props.book.year} min={MIN_YEAR}
                               max={MAX_YEAR}
                               onChange={event => props.setBook({...props.book, year: parseInt(event.target.value)})}/>
                    </div>
                    <div className="rectangle-2 tags-field">
                        <input className={"input"} placeholder="Etiquetas" value={tagToAdd.name}
                               onKeyUp={event => {
                                   if (event.key === 'Enter'){
                                       addTag(tagToAdd);
                                   }
                               }}
                               maxLength={35} onChange={event => setTagToAdd({name: event.target.value})}/>
                        <i className="fas fa-plus icon" onClick={event => addTag(tagToAdd)}/>
                    </div>
                    {renderTags(props.book.tags)}
                    {!isCreate && (
                        <div className={"copies-container"}>
                            <div className="copies-table">
                                <div className={"copies-header-row"}>
                                    <div className={"copies-header"}>ID de Ejemplar</div>
                                    <div/>
                                    <div className={"copies-header"}>Acciones</div>
                                </div>
                                {props.book?.copies?.map(copy => (
                                    <div className={"copies-row"}>
                                        <div className={"copies-col"}>{copy.id}</div>
                                        <div/>
                                        <div className={"copies-col"}>
                                            <i className={copy.isBooked ? "far fa-check-circle copies-check" : "fas fa-ban copies-ban"}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <i className={'fas fa-plus-circle copies-add-button'} onClick={() => {props.openNewCopyModal && props.openNewCopyModal()}}/>
                        </div>
                    )}
                </div>
                <CreateAndCancelButtons onCancel={props.handleCancel} onCreate={handleSubmit}/>
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
