import React from 'react';
import "./CreateOrEditBook.css";
import {Book, CREATE, Tag} from "./Book";
import CreateAndCancelButtons from "../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import ActivateDeactivateButton from "../common/ActivateDeactivateButton/ActivateDeactivateButton";
import TagContainer from "../common/TagContainer/TagContainer";
import GenericTable, {Column} from "../common/GenericTable/GenericTable";
import {toast, ToastOptions} from "react-toastify";
import ReactTooltip from "react-tooltip";

type Props = {
    book: Book,
    setBook: Function,
    handleSubmit: Function,
    type: string,
    handleCancel: ()=>void,
    openNewCopyModal?: Function,
    activateCopy: Function,
    deactivateCopy: Function,
    newCopyError?: boolean,
    successMessage: string
}
type Errors = {
    titleError: boolean,
    authorError: boolean,
    publisherError: boolean,
    yearErrors: YearErrors,
    serverError?: string,
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

    const [tagToAdd, setTagToAdd] = React.useState<Tag>({
        name: "",
    });

    const handleSubmit = () => {
        let newErrors = validateBook(props.book);
        let valid = !newErrors.titleError && !newErrors.authorError && !newErrors.publisherError && !newErrors.yearErrors.yearHigher && !newErrors.yearErrors.yearLower && !newErrors.yearErrors.yearUndefined;
        if (valid) {
            props.handleSubmit(props.book, handleSuccess, (status: string) => notifyError(status))
        }
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const handleSuccess = () => {
        toast.dismiss();
        toast.success(props.successMessage, toastifyConfiguration);
    }

    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
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
            notifyError("Completar título");
        }
        if (!book.author || book.author === "") {
            authorError = true;
            notifyError("Completar autor")
        }
        if (!book.publisher || book.publisher === "") {
            publisherError = true;
            notifyError("Completar editorial")
        }
        if (!book.year) {
            yearErrors.yearUndefined = true;
            notifyError("Completar año")
        } else if (book.year > MAX_YEAR) {
            yearErrors.yearHigher = true;
            notifyError("Año debe ser menor a " + MAX_YEAR)
        } else if (book.year < MIN_YEAR) {
            yearErrors.yearLower = true;
            notifyError("Año debe ser mayor a " + MIN_YEAR)
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
            <div className={"create-or-edit-tags-container"}>
                <TagContainer tags={tags} deleteTag={deleteTag}/>
            </div>
        )
    }

    const copiesTableColumns: Column[] = [
        {
            header: 'ID de Ejemplar',
            accessor: 'id'
        },
        {
            header: 'Acciones',
            component: copy => <ActivateDeactivateButton isActive={copy.active || false}
                                                         activateFunction={()=>props.activateCopy(copy)}
                                                         deactivateFunction={()=>props.deactivateCopy(copy)}/>
        }
    ]

    function isActive() {
        return (props.book.title !== undefined && props.book.title !== "") &&
            (props.book.publisher !== "" && props.book.publisher !== undefined)&&
            (props.book.author !== "" && props.book.author !== undefined) &&
            props.book.year !== undefined && !isNaN(props.book.year)
    }


    return (
        <div className={"create-book"}>
            <div className={"create-book-title"}>{isCreate ? 'Nuevo Libro' : 'Editar Libro'}</div>
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
                        <i className="fas fa-plus icon" onClick={() => addTag(tagToAdd)}/>
                    </div>
                    {renderTags(props.book.tags)}
                    {!isCreate &&
                        <h3 className={'available-copies-text'}>Ejemplares reservados: {props.book.copies?.filter(copy => copy.booked).length}</h3>}
                    {!isCreate && (
                        <div className={"copies-container"}>
                            <div className={"copies-table-container"}>
                                <GenericTable columns={copiesTableColumns} data={props.book?.copies ?? []} className={"table--2cols"}/>
                            </div>
                            <ReactTooltip/>
                            {props.book.active && <i className={'fas fa-plus-circle copies-add-button'} data-tip={"Agregar"} onClick={() => {
                                props.openNewCopyModal && props.openNewCopyModal()
                            }}/>}
                        </div>
                    )}
                </div>
                <CreateAndCancelButtons onCancel={props.handleCancel} onCreate={handleSubmit} isActivated={isActive()}/>
            </div>
        </div>
    )
}


export default CreateOrEditBook;
