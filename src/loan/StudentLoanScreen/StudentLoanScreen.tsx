import React, {useEffect} from 'react';
import {Loan} from "../LoanScreen";
import {get, post} from "../../utils/http";
import LoanTable from "../LoanTable/LoanTable";
import MessageBox from "../../common/MessageBox/MessageBox";
import "./StudentLoanScreen.css";

const StudentLoanScreen = () => {
    const [loans, setLoans] = React.useState<Loan[]>([]);
    const [successMessage, setSuccessMessage] = React.useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    const closeSuccessMessage = () => {
        setSuccessMessage(undefined);
    }

    const closeErrorMessage = () => {
        setErrorMessage(undefined);
    }

    useEffect(() => {

        getActiveLoans();

        return () => {
            closeSuccessMessage();
            closeErrorMessage();
        }
    }, [])

    const getActiveLoans = () => {
        get(`loan/actives`)
            .then(res => {
                setLoans(res);
            })
            .catch(err => {
            })
    }

    const handleRequestExtension = (row: Loan) => {
        const valid = checkStudentCanMakeExtension();
        if (valid) {
            post(`extension/${row.id}`, {})
                .then(() => {
                    setSuccessMessage("Has solicitado la prórroga correctamente");
                    getActiveLoans();
                })
        } else {
            setErrorMessage("No debes tener préstamos atrasados para solicitar una prórroga")
        }
    }

    const checkStudentCanMakeExtension = () => {
        return !loans.some((loan: Loan) => loan.loanStatus === "DELAYED");
    }

    return (
        <div className={"student-loan-screen"}>
            {successMessage && <div className={"loan-message-container"}>
                <MessageBox message={successMessage} severity={"success"} handleClose={closeSuccessMessage}/>
            </div>}
            {errorMessage && <div className={"loan-message-container"}>
                <MessageBox message={errorMessage} severity={"error"} handleClose={closeErrorMessage}/>
            </div>}
            <div className={"loan-table-container"}>
                <LoanTable data={loans} handleRequestExtension={handleRequestExtension}/>
            </div>
        </div>
    )
}

export default StudentLoanScreen;
