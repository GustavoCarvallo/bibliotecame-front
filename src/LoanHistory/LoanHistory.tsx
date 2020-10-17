import React, {useEffect} from 'react';
import "./LoanHistory.css";
import LoanHistoryTable from "./LoanHistoryTable/LoanHistoryTable";
import {PaginationData} from "../Book/SearchBook/SearchBook";
import {Loan} from "../loan/LoanScreen";
import {get, post} from "../utils/http";
import {toast} from "react-toastify";
import {Review} from "./ReviewModal/ReviewModal";
import MessageBox from "../common/MessageBox/MessageBox";

const LoanHistory = () => {
    const [success, setSuccess] = React.useState<string | undefined>(undefined);

    const notifyError = (message: string) => {
        toast.dismiss()
        toast.error(message)
    }

    const [paginationData, setPaginationData] = React.useState<PaginationData<Loan> | undefined>(undefined);

    useEffect(() => {
        getData(0);
        return () => {
            closeSuccessMessage();
        }
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
                setSuccess('La reseña fue guardada exitosamente');
            })
            .catch(err => notifyError(err))
    }

    const closeSuccessMessage = () => {
        setSuccess(undefined);
    }

    return (
        <div className={"loan-history-screen"}>
            <div className={"loan-history-success-container"}>
                {success && <MessageBox severity={"success"} message={success} handleClose={closeSuccessMessage}/>}
            </div>
            <div className={"loan-history-table-container"}>
                <LoanHistoryTable paginationData={paginationData}
                                  changePage={changePage} createReview={createReview}/>
            </div>
        </div>
    )
}

export default LoanHistory;
