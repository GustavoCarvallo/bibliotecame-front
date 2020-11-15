import React from 'react';
import GenericModal from "../../common/GenericModal/GenericModal";
import {Book} from "../Book";
import "./BookDetails.css";
import TagContainer from "../../common/TagContainer/TagContainer";
import Rating from "react-rating";
import ReviewsContainer from "../BookReviews/ReviewsContainer";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    selectedBook: Book,
    handleLoan: (book :Book) => void
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
                    <TagContainer tags={book.tags} reverse={true} alignCenter={true}/>
                </div>
            )
        },
    },
    {
        label: 'Calificación',
        component: (book: Book) => {
            let score = 0;
            let total = 0;
            if(book.reviews !== []){
                book.reviews?.forEach(review => {
                    score= score + review.value;
                    total= total + 1;
                });
                score = score / total;
            }
            return (
                <div className={"book-review-value-container"}>
                    <Rating emptySymbol={"far fa-star empty-star"} fractions={1} fullSymbol={"fas fa-star full-star"}
                            initialRating={score} readonly={true}/>
                            ({total})
                </div>
            )
        }
    },

]


const BookDetails = (props: Props) => {
    return (
        <GenericModal isOpen={props.isOpen} onClose={props.onClose} title={'Detalles'} withHeader>
            <div className={'book-details-container'}>
                {rows.map((row, index) => (
                    <div key={index} className={'book-details-row'}>
                        <h1 className={'book-details-label'}>{row.label}:</h1>
                        {row.component(props.selectedBook)}
                    </div>
                ))}
                <h1 className={'book-details-label'}>Reseñas:</h1>
                <ReviewsContainer reviews={props.selectedBook.reviews}/>
                <div className={'request-loan-container'}>
                    <button className="request-loan-button" onClick={() => props.handleLoan(props.selectedBook)}>
                        <p className="request-loan-button-label">Solicitar Prestamo</p>
                    </button>
                    <h3 className={'available-copies-text'}>Ejemplares disponibles: {props.selectedBook.copies?.filter(copy => !copy.booked).length}</h3>
                </div>
            </div>
        </GenericModal>
    )
}

export default BookDetails;
