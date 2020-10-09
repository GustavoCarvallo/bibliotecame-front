import React from 'react';
import "./LoanScreen.css";
import StudentLoanTable from "./LoanTable/StudentLoanTable";
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
                (<AdminLoanScreen/>)
                :
                (<div className={"student-loan-table-container"}>
                    <StudentLoanTable/>
                </div>)
            }
        </div>
    )
}

export default LoanScreen;
