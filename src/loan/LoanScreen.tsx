import React from 'react';
import "./LoanScreen.css";
import LoanTable from "./LoanTable/LoanTable";
import {get} from "../utils/http";
import StudentLoanScreen from "./StudentLoanScreen/StudentLoanScreen";
import AdminLoanScreen from "./LoanScreen/AdminLoanScreen";

export type Loan = {
    id: number,
    returnDate: string,
    expectedReturnDate: string,
    loanStatus: string,
    bookTitle: string,
    bookAuthor: string,
    userEmail?: string,
}

const LoanScreen = ({isAdmin}: { isAdmin: boolean }) => {

    return (
        <div className={"loan-screen-container"}>
            {isAdmin ?
                <AdminLoanScreen/>
                :
                <StudentLoanScreen/>
            }
        </div>
    )
}

export default LoanScreen;
