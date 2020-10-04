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
                setLoans(res.filter((loan: Loan) => !loan.returnDate).sort((a: Loan, b: Loan) => {
                    return dateDiffInDays(new Date(b.expectedReturnDate), new Date(a.expectedReturnDate));
                }));
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

export function dateDiffInDays(a: Date, b: Date) {

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export default LoanScreen;
