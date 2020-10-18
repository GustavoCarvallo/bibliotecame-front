import React from 'react';
import {Review} from "../../LoanHistory/ReviewModal/ReviewModal";
import Rating from "react-rating";
import "./ReviewsContainer.css"

type Props = {
    reviews: Review[],
}
const ReviewsContainer = (props: Props) => {
    if(props.reviews.length==0) return (
        <h3> Este libro no tiene reseñas. </h3>
    )
    return(<div className={"review-container"}>
        {props.reviews.map(review => (
            <div className={"book-review-individual"}>
                <div className={"review-container-value-container"}>
                    <Rating emptySymbol={"far fa-star empty-star"} fractions={1} fullSymbol={"fas fa-star full-star"}
                            initialRating={review.value} readonly={true}/>
                </div>
                <div className={"email-review-containter"}>
                    {review.userModel?.email}
                </div>
                {description(review)}
            </div>
        ))}
    </div>)
}

function description(review:Review){
    if(review.description==""){
        return <div className={"email-review-containter"}>
            El usuario no agregó una descripción.
        </div>
    }
    else return <div className={"review-text-container"}>
        {review.description}
    </div>
}

export default ReviewsContainer;
