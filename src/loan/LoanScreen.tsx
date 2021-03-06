import React from 'react';
import "./LoanScreen.css";
import StudentLoanScreen from "./StudentLoanScreen/StudentLoanScreen";
import AdminLoanScreen from "./LoanScreen/AdminLoanScreen";
import {clearLoans} from "../utils/http";
import {isAdmin} from "../router/Routes";

export type Loan = {
    id: number,
    returnDate: string,
    expectedReturnDate: string,
    loanStatus: string,
    bookTitle: string,
    bookAuthor: string,
    userEmail?: string,
    reviewId?: number,
    bookId?: number,
}

const LoanScreen = () => {

    const admin = isAdmin();

    clearLoans(admin).then();

    return (
        <div className={"loan-screen-container"}>
            {admin ?
                <AdminLoanScreen/>
                :
                <StudentLoanScreen/>
            }
        </div>
    )
}

export default LoanScreen;
