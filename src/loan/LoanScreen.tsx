import React, {useEffect} from 'react';
import "./LoanScreen.css";
import LoanTable from "./LoanTable/LoanTable";
import {get} from "../utils/http";
import StudentLoanScreen from "./StudentLoanScreen/StudentLoanScreen";

export type Loan = {
    id: number,
    returnDate: string,
    expectedReturnDate: string,
    loanStatus: string,
    bookTitle: string,
    bookAuthor: string,
}

const LoanScreen = () => {

    return(
        <div className={"loan-screen-container"}>
            <StudentLoanScreen/>
        </div>
    )
}

export default LoanScreen;
