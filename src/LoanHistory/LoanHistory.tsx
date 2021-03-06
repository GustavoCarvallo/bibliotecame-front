import React, {useEffect} from 'react';
import "./LoanHistory.css";
import LoanHistoryTable from "./LoanHistoryTable/LoanHistoryTable";
import {PaginationData} from "../Book/SearchBook/SearchBook";
import {Loan} from "../loan/LoanScreen";
import {del, get, post, put} from "../utils/http";
import {Review} from "./ReviewModal/ReviewModal";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";
import {toast, ToastOptions} from "react-toastify";

const LoanHistory = () => {

    const [paginationData, setPaginationData] = React.useState<PaginationData<Loan> | undefined>(undefined);
    const [searchFilter, setSearchFilter] = React.useState<string>("")

    useEffect(() => {
        getData(0, "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = (page: number, search: string) => {
        get(`loan/history?page=${page}&search=${search}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => {
                notifyError(err);
            })
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifyError = (message: string) => {
        toast.dismiss()
        toast.error(message, toastifyConfiguration)
    }

    const notifySuccess = (message: string) => {
        toast.dismiss();
        toast.success(message, toastifyConfiguration);
    }

    const changePage = (selected: number) => {
        getData(selected, searchFilter);
    }

    const handleFilterChange = (event: any) => {
        getData(0, event.target.value);
        setSearchFilter(event.target.value);
    }

    const createReview = (bookId: number, review: Review, callBack: () => void) => {
        post(`review/create/${bookId}`, review)
            .then(() => {
                if (callBack) callBack();
                getData(0, "");
                notifySuccess('La reseña fue guardada exitosamente');
            })
            .catch(err => notifyError(err))
    }

    const editReview = (reviewId: number, review: Review, callBack: () => void) => {
        put(`review/${reviewId}`, review)
            .then(() => {
                if (callBack) callBack();
                getData(0, "");
                notifySuccess('La reseña fue editada exitosamente')
            })
            .catch(err => notifyError(err));
    }

    const deleteReview = (reviewId: number, callBack: () => void) => {
        del(`review/${reviewId}`)
            .then(() => {
                callBack();
                getData(0, "");
                notifySuccess('La reseña se ha eliminado correctamente!')
            })
            .catch(err => notifyError(err));
    }

    return (
        <div className={"loan-history-screen"}>
            <div className={"search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={searchFilter}
                               onChange={handleFilterChange}
                               placeholder={"Busque algún préstamo"}/>
            </div>

            <div className={"loan-history-table-container"}>
                <LoanHistoryTable paginationData={paginationData}
                                  changePage={changePage} createReview={createReview}
                                  editReview={editReview}
                                  deleteReview={deleteReview}/>
            </div>
        </div>
    )
}

export default LoanHistory;
