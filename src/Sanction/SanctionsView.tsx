import React, {useEffect, useState} from 'react';
import IconButton from "../common/IconButton";
import AddSanctionModal from "./AddSanctionModal/AddSanctionModal";
import "./SanctionsView.css"
import {toast, ToastOptions} from "react-toastify";
import InputWithIcon from "../common/InputWithIcon/InputWithIcon";
import {get} from "../utils/http";
import {PaginationData} from "../Book/SearchBook/SearchBook";
import SearchSanctionTable from "./SearchSanctionTable/SearchSanctionTable";
import EditSanctionModal from "./EditSanctionModal/EditSanctionModal";

export type Sanction = {
    userEmail: string,
    endDate: Date,
    reason: string
}

export type SanctionDisplay = {
    id: number,
    email: string,
    creationDate: string,
    endDate: string,
    reason: string
}

const SanctionsView = () => {

    const [sanctionModalState, setSanctionModalState] = useState<boolean>(false)
    const [editModalState, setEditModalState] = useState<boolean>(false)
    const [searchFilter, setSearchFilter] = useState<string>("")
    const [paginationData, setPaginationData] = React.useState<PaginationData<SanctionDisplay> | undefined>(undefined);
    const [selectedSanction, setSelectedSanction] = React.useState<SanctionDisplay>({id:0, email:"", creationDate:"", endDate:"", reason:""})

    const onAddSanctionSuccess = (message: string) => {
        notifySuccess(message)
    }

    useEffect(() => {
        getSanctionsByFilter(0, "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getSanctionsByFilter = (page: number, search: string) => {
            get(`sanction?page=${page}&search=${search}`)
                .then(res => {
                    setPaginationData(res);
                })
                .catch((error) => {
                    notifyError(error);
                })
    }

    const handleFilterChange = (event: any) => {
        getSanctionsByFilter(0, event.target.value);
        setSearchFilter(event.target.value);
    }

    const changePage = (page: number) => {
        getSanctionsByFilter(page, searchFilter);
    }

    const openEditSanction = (row: SanctionDisplay) => {
        setSelectedSanction(row);
        setEditModalState(true);
    }

    const closeEditSanction = () => {
        setSelectedSanction({id:0, email:"", creationDate:"", endDate:"", reason:""});
        setEditModalState(false);
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifySuccess = (message: string) => {
        toast.dismiss();
        toast.success(message, toastifyConfiguration);
    }
    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message);
    }

    return(
        <div className={"sanctions-view"}>
            <div className={"sanction-search-container"}>
                <InputWithIcon icon={'fas fa-search'}
                               value={searchFilter}
                               onChange={handleFilterChange}
                               placeholder={"Busque alguna sanción"}/>
                <IconButton icon={"fas fa-plus-circle"} onClick={()=>setSanctionModalState(true)} tooltip={"Crear"}/>
            </div>
            <div className={"search-book-table-container"}>
                <SearchSanctionTable paginationData={paginationData}
                                     changePage={changePage}
                                     openEditSanction={openEditSanction}/>
            </div>
            <AddSanctionModal isOpen={sanctionModalState}
                              getList={()=> changePage(0)}
                              onClose={()=>setSanctionModalState(false)}
                              onSuccess={onAddSanctionSuccess}
                              onError={notifyError}/>
            <EditSanctionModal sanction={selectedSanction}
                               isOpen={editModalState}
                               onClose={closeEditSanction}
                               onSuccess={notifySuccess}
                               onError={notifyError}
                               getList={()=> changePage(0)}/>
        </div>
    )
}

export default SanctionsView;
