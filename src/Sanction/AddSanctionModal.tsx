import React, {useState} from 'react'
import {Sanction} from "./SanctionsView";
import GenericModal from "../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../common/CreateAndCancelButtons/CreateAndCancelButtons";
import DropdownInput from "../common/DropDownInput/DropDownInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {get, post} from "../utils/http";
import "./AddSanctionModal.css"
import ErrorBox from "../common/ErrorBox/ErrorBox";

type Props = {
    isOpen: boolean,
    onClose: ()=>void,
    onSuccess: Function
}

type User = {
    email: string
}

const AddSanctionModal = (props: Props) => {

    const EXPECTATION_FAILED = 417;
    const UNPROCESSABLE_ENTITY = 422;
    const BAD_REQUEST = 400;


    const [sanction, setSanction] = useState<Sanction>({
        userEmail:"", endDate: new Date(), reason: ""
    })

    const [userList, setUserList] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [showError, setShowError] = useState<boolean>(false)

    const handleAdd = () => {
        post("sanction", {email: sanction.userEmail, reason: sanction.reason, endDate:sanction.endDate })
        .then(res => {
            props.onSuccess("Se ha sancionado al alumno/a exitosamente!")
            props.onClose();
            setSanction({userEmail:"", endDate: new Date(), reason: ""})
        })
            .catch(err => {
                setErrorMessage(err);
                setShowError(true);
            })
    }

    const cancel = () => {
        props.onClose()
        setSanction({userEmail:"", endDate: new Date(), reason: ""})
    }

    const setList = (search: string) => {
        get("users?search="+ search).then(res => {
            const users : User[] = res
           setUserList(users.map(user => user.email))
        })
    }

    return(
        <GenericModal title={"Nueva Sanción"} isOpen={props.isOpen} onClose={props.onClose}>
            <div className={"add-sanction-body"}>
                <ErrorBox error={errorMessage} show={showError} hideErrorBox={()=> setShowError(false)} />
                <DropdownInput list={userList}
                               onChange={e => {setSanction({...sanction, userEmail: e.target.value}); setList(e.target.value)}}
                               onSelect={row => setSanction({...sanction, userEmail: row})}
                               placeholder={"Seleccione un alumno/a"}/>
                <textarea className={"reason-input"}
                          value={sanction.reason}
                          onChange={e => setSanction({...sanction, reason: e.target.value})}
                          placeholder={"Ingrese una breve descripción del motivo de la sanción" }> </textarea>
                <DatePicker className={"date-picker"}
                            selected={sanction.endDate}
                            onChange={()=> {}}
                            onSelect={date => setSanction({...sanction, endDate: date})}
                            placeholderText="Sancionado hasta"> </DatePicker>
                <CreateAndCancelButtons onCreate={() => handleAdd()} onCancel={cancel} createLabel={"Guardar"}/>
            </div>
        </GenericModal>
    )
}

export default AddSanctionModal;
