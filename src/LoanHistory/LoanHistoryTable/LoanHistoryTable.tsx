import React from 'react';
import "./LoanHistoryTable.css";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {Loan} from "../../loan/LoanScreen";
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import GenericPagination from "../../common/Pagination/GenericPagination";
import ReviewModal, {Review} from "../ReviewModal/ReviewModal";
import {get} from "../../utils/http";

type Props = {
    paginationData?: PaginationData<Loan>,
    changePage: (page: number) => void,
    createReview: (bookId: number, review: Review, callBack: ()=>void)=>void,
    editReview: (reviewId: number, review: Review, callBack: ()=>void)=>void,
}

type ReviewModalInfo = {
    open: boolean,
    id: number,
    onEdit?: boolean,
    review?: Review
}

const LoanHistoryTable = (props: Props) => {
    const [reviewModalInfo, setReviewModalInfo] = React.useState<ReviewModalInfo>({
        open: false,
        id: -1
    })

    const columns: Column[] = [
        {
            header: "Libro",
            component: row => <span className={'loan-book-title-and-author'}>{row.bookTitle} - {row.bookAuthor}</span>
        },
        {
            header: "Fecha de vencimiento",
            accessor: "expectedReturnDate",
        },
        {
            header: "Fecha de devolución",
            accessor: "returnDate"
        },
        {
            header: "Acciones",
            component: row => {
                return row.reviewId ?
                    <button className={"loan-table-button"} onClick={() => openReviewModal(row.reviewId, true)}>Mod. Calif</button>
                    :
                    <button className={"loan-table-button"} onClick={() => openReviewModal(row.bookId)}>Calificar</button>
            }
        }
    ]

    const openReviewModal = (id: number, onEdit?: boolean) => {
        if (onEdit) {
            get(`review/${id}`)
                .then(review => {
                    setReviewModalInfo({
                        open: true,
                        id,
                        onEdit,
                        review
                    })
                })
        } else {
            setReviewModalInfo({
                open: true,
                id
            })
        }
    }

    const closeReviewModal = () => {
        setReviewModalInfo({
            open: false,
            id: -1
        })
    }

    const createReview = (bookId: number, review: Review) => {
        props.createReview(bookId, review, closeReviewModal);
    }

    const editReview = (reviewId: number, review: Review) => {
        props.editReview(reviewId, review, closeReviewModal);
    }

    return (
        <>
            <ReviewModal open={reviewModalInfo.open} id={reviewModalInfo.id}
                         closeModal={closeReviewModal} onSave={reviewModalInfo.onEdit ? editReview : createReview}
                         key={reviewModalInfo.id} review={reviewModalInfo.review}/>
            <GenericTable columns={columns}
                          className={"table--4cols"}
                          noDataText={"No hay reservas"}
                          data={props.paginationData?.content ?? []}/>
            <GenericPagination pageCount={props.paginationData?.totalPages ?? 0}
                               forcePage={props.paginationData?.pageable.pageNumber ?? 0}
                               onPageChange={(selected) => props.changePage(selected)}/>
        </>
    )
}

export default LoanHistoryTable;
