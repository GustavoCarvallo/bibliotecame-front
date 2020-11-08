import React from 'react';
import "./LoanHistoryTable.css";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {Loan} from "../../loan/LoanScreen";
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import GenericPagination from "../../common/Pagination/GenericPagination";
import ReviewModal, {Review} from "../ReviewModal/ReviewModal";
import {get} from "../../utils/http";
import GenericModal from "../../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import ReactTooltip from "react-tooltip";

type Props = {
    paginationData?: PaginationData<Loan>,
    changePage: (page: number) => void,
    createReview: (bookId: number, review: Review, callBack: () => void) => void,
    editReview: (reviewId: number, review: Review, callBack: () => void) => void,
    deleteReview: (reviewId: number, callBack: () => void) => void,
}

type ReviewModalInfo = {
    open: boolean,
    id: number,
    onEdit?: boolean,
    review?: Review
}

type DeleteReviewModalInfo = {
    open: boolean,
    id: number,
}

const LoanHistoryTable = (props: Props) => {
    const [reviewModalInfo, setReviewModalInfo] = React.useState<ReviewModalInfo>({
        open: false,
        id: -1
    })

    const [deleteReviewModalInfo, setDeleteReviewModalInfo] = React.useState<DeleteReviewModalInfo>({
        open: false,
        id: -1
    })

    const columns: Column[] = [
        {
            header: "Libro",
            component: row => <>
                <ReactTooltip/>
                <span className={'loan-book-title-and-author'} data-tip={`${row.bookTitle} - ${row.bookAuthor}`}>{row.bookTitle} - {row.bookAuthor}</span>
            </>
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
                return (
                    <div className={"edit-review-button-container"}>
                        {row.reviewId ?
                            <>
                                <button className={"loan-history-table-button"}
                                        onClick={() => openReviewModal(row.reviewId, true)}>Mod. Calif
                                </button>
                                <button className={"loan-history-table-button"}
                                        onClick={() => openDeleteReviewModal(row.reviewId)}>Elim. Calif
                                </button>
                            </>
                            :
                            <button className={"loan-history-table-button"}
                                    onClick={() => openReviewModal(row.bookId)}>Calificar</button>}
                    </div>)
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

    const openDeleteReviewModal = (id: number) => {
        setDeleteReviewModalInfo({
            open: true,
            id
        })
    }

    const closeDeleteReviewModal = () => {
        setDeleteReviewModalInfo({
            open: false,
            id: -1
        })
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

    const deleteReview = (reviewId: number) => {
        props.deleteReview(reviewId, closeDeleteReviewModal);
    }

    return (
        <>
            <ReviewModal open={reviewModalInfo.open} id={reviewModalInfo.id}
                         closeModal={closeReviewModal} onSave={reviewModalInfo.onEdit ? editReview : createReview}
                         key={reviewModalInfo.id} review={reviewModalInfo.review}/>
            <GenericModal onClose={closeDeleteReviewModal} title={"Eliminar Reseña"}
                          isOpen={deleteReviewModalInfo.open}>
                <div className={"delete-review-modal-body"}>
                    <p className={"delete-review-modal-text"}>¿ Esta seguro que desea eliminar esta reseña?</p>
                    <p className={"delete-review-modal-text"}>Tenga en cuenta que esta acción no se puede revertir.</p>
                    <div className={"delete-review-modal-buttons"}>
                        <CreateAndCancelButtons greenConfirm={true}
                                                onCreate={() => deleteReview(deleteReviewModalInfo.id)}
                                                onCancel={closeDeleteReviewModal} createLabel={"Eliminar"}
                                                isActivated={true}/>
                    </div>
                </div>
            </GenericModal>
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
