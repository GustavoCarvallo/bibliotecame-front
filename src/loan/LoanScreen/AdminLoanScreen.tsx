import React, {useEffect} from 'react';
import AdminLoanTable from "../LoanTable/AdminLoanTable";
import {PaginationData} from "../../Book/SearchBook/SearchBook";
import {get} from "../../utils/http";
import {Loan} from "../LoanScreen";
import InputWithIcon from "../../common/InputWithIcon/InputWithIcon";
import "./AdminLoanScreen.css";

const AdminLoanScreen = () => {
    const [search, setSearch] = React.useState("");
    const [paginationData, setPaginationData] = React.useState<PaginationData<Loan> | undefined>(undefined);

    useEffect(() => {
        getData(0, search);
    }, [])

    const getData = (page: number, search: string) => {
        get(`loan/admin?page=${page}&search=${search}`)
            .then(res => {
                setPaginationData(res);
            })
            .catch(err => {
            })
    }

    const changePage = (selected: number) => {
        getData(selected, search);
    }

    const changeSearch = (value: string) => {
        setSearch(value);
        getData(0, value);
    }

    return (
        <div className={"admin-loan-screen"}>
            <div className={"admin-loan-search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={search}
                               onChange={(e) => changeSearch(e.target.value)}
                               placeholder={"Busque un préstamo"}/>
            </div>
            <div className={"admin-loan-table-container"}>
                <AdminLoanTable search={search}
                                changePage={changePage}
                                paginationData={paginationData}/>
            </div>
        </div>
    )
}

export default AdminLoanScreen;
