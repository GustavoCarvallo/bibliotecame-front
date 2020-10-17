import React from 'react';
import "./LoanHistoryTable.css";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {Loan} from "../../loan/LoanScreen";
import GenericTable, {Column} from "../../common/GenericTable/GenericTable";
import GenericPagination from "../../common/Pagination/GenericPagination";
import ReviewModal, {Review} from "../ReviewModal/ReviewModal";

type Props = {
    paginationData?: PaginationData<Loan>,
    changePage: (page: number) => void,
    createReview: (bookId: number, review: Review, callBack: ()=>void)=>void,
}

type ReviewModalInfo = {
    open: boolean,
    bookId: number,
}

const LoanHistoryTable = (props: Props) => {
    const [reviewModalInfo, setReviewModalInfo] = React.useState<ReviewModalInfo>({
        open: false,
        bookId: 0
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
                    <button className={"loan-table-button"} onClick={() => {}}>Mod. Calif</button>
                    :
                    <button className={"loan-table-button"} onClick={() => openReviewModal(row.bookId)}>Calificar</button>
            }
        }
    ]

    const openReviewModal = (bookId: number) => {
        setReviewModalInfo({
            open: true,
            bookId: bookId
        })
    }

    const closeReviewModal = () => {
        setReviewModalInfo({
            open: false,
            bookId: 0
        })
    }

    const createReview = (bookId: number, review: Review) => {
        props.createReview(bookId, review, closeReviewModal);
    }

    return (
        <>
            <ReviewModal open={reviewModalInfo.open} bookId={reviewModalInfo.bookId}
                         closeModal={closeReviewModal} createReview={createReview} key={reviewModalInfo.bookId}/>
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
