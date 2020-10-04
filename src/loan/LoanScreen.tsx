import React, {useEffect} from 'react';
import "./LoanScreen.css";
import LoanTable from "./LoanTable/LoanTable";
import {get} from "../utils/http";

export type Loan = {
    returnDate: string,
    expectedReturnDate: string,
    loanStatus: string,
    bookTitle: string,
    bookAuthor: string,
}

const LoanScreen = () => {
    const [loans, setLoans] = React.useState<Loan[]>([]);

    useEffect(() => {
        get(`loan/actives`)
            .then(res => {
                setLoans(res);
            })
            .catch(err => {})
    }, [])

    return(
        <div className={"loan-screen-container"}>
            <div className={"loan-table-container"}>
                <LoanTable data={loans}/>
            </div>
        </div>
    )
}

export default LoanScreen;
