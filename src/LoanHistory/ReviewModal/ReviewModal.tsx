import React from 'react';
import "./ReviewModal.css";
import GenericModal from "../../common/GenericModal/GenericModal";
import Rating from "react-rating";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";;

type Props = {
    open: boolean,
    id: number,
    closeModal: () => void,
    onSave: (id: number, review: Review)=>void,
    review?: Review
}

export type Review = {
    id?: number,
    value: number,
    description?: string,
    userModel?: {
        email?: string
    },
}

const ReviewModal = (props: Props) => {

    const [review, setReview] = React.useState<Review>({
        value: props.review?.value ?? 1,
        description: props.review?.description ?? '',
        id: props.review?.id ?? undefined,
    })

    const isActive = () => {
        return review.value >= 1;
    }

    return (
        <GenericModal isOpen={props.open} title={"Nueva Reseña"} onClose={props.closeModal} withHeader={true}>
            <div className={"review-modal-body"}>
                <div className={"review-modal-value-container"}>
                    <span className={"review-modal-label"}>Calificación: </span>
                    <Rating emptySymbol={"far fa-star empty-star"} fractions={1} fullSymbol={"fas fa-star full-star"}
                            initialRating={review.value} onChange={(rating) => setReview({...review, value: rating})}/>
                </div>
                <div className={"review-modal-description-container"}>
                    <span className={"review-modal-label"}>Descripción: </span>
                    <textarea className={"review-modal-description"}
                              rows={4} cols={70}
                              value={review.description}
                              onChange={event => setReview({...review, description: event.target.value})}
                              placeholder={"Escriba una breve reseña"}/>
                </div>
                <CreateAndCancelButtons onCancel={props.closeModal} onCreate={() => props.onSave(props.id, review)} isActivated={isActive()}/>
            </div>
        </GenericModal>
    )
}

export default ReviewModal;
