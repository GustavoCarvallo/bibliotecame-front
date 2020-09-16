import React from 'react';
import GenericModal from "../../common/GenericModal/GenericModal";
import {Book} from "../Book";
import "./BookDetails.css";
import TagContainer from "../../common/TagContainer/TagContainer";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    selectedBook: Book,
}

const rows = [
    {
        label: 'Nombre',
        component: (book: Book) => (
            <h1 className={'book-details-component'}>{book.title}</h1>
        ),
    },
    {
        label: 'Autor',
        component: (book: Book) => (
            <h1 className={'book-details-component'}>{book.author}</h1>
        ),
    },
    {
        label: 'Editorial',
        component: (book: Book) => (
            <h1 className={'book-details-component'}>{book.publisher}</h1>
        ),
    },
    {
        label: 'Año',
        component: (book: Book) => (
            <h1 className={'book-details-component'}>{book.year}</h1>
        ),
    },
    {
        label: 'Etiquetas',
        component: (book: Book) => {
            return (
                <div className={'book-details-tag-container'}>
                    <TagContainer tags={book.tags}/>
                </div>
            )
        },
    }
]

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-33.5%, -60%)',
        width: '40vw',
        border: 'solid 1px #707070',
        borderRadius: '18px',
        boxShadow: '10px 10px 6px 0 rgba(0, 0, 0, 0.16)',
        padding: 0,
    }
}

const BookDetails = (props: Props) => {
    return (
        <GenericModal isOpen={props.isOpen} onClose={props.onClose} title={'Detalles'} styles={styles}>
            <div className={'book-details-container'}>
                {rows.map(row => (
                    <div className={'book-details-row'}>
                        <h1 className={'book-details-label'}>{row.label}:</h1>
                        {row.component(props.selectedBook)}
                    </div>
                ))}
                <div className={'request-loan-container'}>
                    <button className="request-loan-button">
                        <p className="request-loan-button-label">Solicitar Prestamo</p>
                    </button>
                    <h3 className={'available-copies-text'}>Ejemplares disponibles: {props.selectedBook.copies?.filter(copy => !copy.isBooked).length}</h3>
                </div>
            </div>
        </GenericModal>
    )
}

export default BookDetails;
