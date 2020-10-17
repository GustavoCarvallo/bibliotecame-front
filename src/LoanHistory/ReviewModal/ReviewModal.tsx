import React from 'react';
import "./ReviewModal.css";
import GenericModal from "../../common/GenericModal/GenericModal";
import Rating from "react-rating";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";

type Props = {
    open: boolean,
    bookId: number,
    closeModal: () => void,
    createReview: (bookId: number, review: Review)=>void,
}

export type Review = {
    value: number,
    description?: string,
}

const ReviewModal = (props: Props) => {
    const [review, setReview] = React.useState<Review>({
        value: 1,
        description: ''
    })

    const isActive = () => {
        return review.value >= 1;
    }

    return (
        <GenericModal isOpen={props.open} title={"Nueva Reseña"} onClose={props.closeModal} withHeader={true}>
            <div className={"review-modal-body"}>
                <div className={"review-modal-value-container"}>
                    <span className={"review-modal-label"}>Calificación: </span>
                    <Rating emptySymbol={"far fa-star empty-star"} fractions={2} fullSymbol={"fas fa-star full-star"}
                            initialRating={review.value} onChange={(rating) => setReview({...review, value: rating})}/>
                </div>
                <div className={"review-modal-description-container"}>
                    <span className={"review-modal-label"}>Descripción</span>
                    <textarea className={"review-modal-description"}
                              rows={4} cols={70}
                              value={review.description}
                              onChange={event => setReview({...review, description: event.target.value})}
                              placeholder={"Escriba una breve reseña"}/>
                </div>
                <CreateAndCancelButtons onCancel={props.closeModal} onCreate={() => props.createReview(props.bookId, review)} isActivated={isActive()}/>
            </div>
        </GenericModal>
    )
}

export default ReviewModal;
