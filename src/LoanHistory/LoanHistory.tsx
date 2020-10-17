import React, {useEffect} from 'react';
import "./LoanHistory.css";
import LoanHistoryTable from "./LoanHistoryTable/LoanHistoryTable";
import {PaginationData} from "../Book/SearchBook/SearchBook";
import {Loan} from "../loan/LoanScreen";
import {get, post} from "../utils/http";
import {Review} from "./ReviewModal/ReviewModal";
import {notifyError, notifySuccess} from "../router/Routes";

const LoanHistory = () => {

    const [paginationData, setPaginationData] = React.useState<PaginationData<Loan> | undefined>(undefined);

    useEffect(() => {
        getData(0);
    }, [])

    const getData = (page: number) => {
        get(`loan/history?page=${page}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => {
                notifyError(err);
            })
    }

    const changePage = (selected: number) => {
        getData(selected);
    }

    const createReview = (bookId: number, review: Review, callBack: () => void) => {
        post(`review/create/${bookId}`, review)
            .then(() => {
                if (callBack) callBack();
                getData(0);
                notifySuccess('La reseña fue guardada exitosamente');
            })
            .catch(err => notifyError(err))
    }

    return (
        <div className={"loan-history-screen"}>
            <div className={"loan-history-table-container"}>
                <LoanHistoryTable paginationData={paginationData}
                                  changePage={changePage} createReview={createReview}/>
            </div>
        </div>
    )
}

export default LoanHistory;
