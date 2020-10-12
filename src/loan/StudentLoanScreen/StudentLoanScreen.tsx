import React, {useEffect} from 'react';
import {Loan} from "../LoanScreen";
import {get, post} from "../../utils/http";
import MessageBox from "../../common/MessageBox/MessageBox";
import "./StudentLoanScreen.css";
import StudentLoanTable from "../LoanTable/StudentLoanTable";
import {toast, ToastOptions} from "react-toastify";

const StudentLoanScreen = () => {
    const [loans, setLoans] = React.useState<Loan[]>([]);

    useEffect(() => {

        getActiveLoans();

        return () => {
            toast.dismiss();
        }
    }, [])

    const getActiveLoans = () => {
        get(`loan/actives`)
            .then(res => {
                setLoans(res);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast",
    }

    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
    }
    const notifySuccess = (message: string) => {
        toast.dismiss();
        toast.success(message, toastifyConfiguration);
    }

    const handleRequestExtension = (row: Loan) => {
        const valid = checkStudentCanMakeExtension();
        if (valid) {
            post(`extension/${row.id}`, {})
                .then(() => {
                    notifySuccess("Has solicitado la prórroga correctamente");
                    getActiveLoans();
                }).catch(err=>{
                    notifyError(err);
            })
        } else {
            notifyError("No debes tener préstamos atrasados para solicitar una prórroga")
        }
    }

    const checkStudentCanMakeExtension = () => {
        return !loans.some((loan: Loan) => loan.loanStatus === "DELAYED");
    }

    return (
        <div className={"student-loan-screen"}>
            <div className={"student-loan-table-container"}>
                <StudentLoanTable data={loans} handleRequestExtension={handleRequestExtension}/>
            </div>
        </div>
    )
}

export default StudentLoanScreen;
