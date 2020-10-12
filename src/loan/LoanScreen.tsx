import React from 'react';
import "./LoanScreen.css";
import StudentLoanScreen from "./StudentLoanScreen/StudentLoanScreen";
import AdminLoanScreen from "./LoanScreen/AdminLoanScreen";
import {clearLoans} from "../utils/http";

export type Loan = {
    id: number,
    returnDate: string,
    expectedReturnDate: string,
    loanStatus: string,
    bookTitle: string,
    bookAuthor: string,
    userEmail?: string,
}

type Props = {
    isAdmin: boolean,
}

const LoanScreen = (props: Props) => {

    clearLoans(props.isAdmin);

    return (
        <div className={"loan-screen-container"}>
            {props.isAdmin ?
                <AdminLoanScreen/>
                :
                <StudentLoanScreen/>
            }
        </div>
    )
}

export default LoanScreen;
