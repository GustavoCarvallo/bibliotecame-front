import React, {useState} from 'react'
import {Sanction} from "./SanctionsView";
import GenericModal from "../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../common/CreateAndCancelButtons/CreateAndCancelButtons";
import DropdownInput from "../common/DropDownInput/DropDownInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {get, post} from "../utils/http";
import "./AddSanctionModal.css"

type Props = {
    isOpen: boolean,
    onClose: ()=>void,
    onSuccess: Function,
    onError: Function
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

    const handleAdd = () => {
        const promise = post("sanction", {email: sanction.userEmail, reason: sanction.reason, endDate:sanction.endDate })
        promise.then(res => {
            props.onSuccess()
        })
            .catch(err => {
                if(err.status === EXPECTATION_FAILED) props.onError("Fecha invalidad, debe ser posterior al dia de hoy y no mas de 3 meses desde ahora.")
                else if(err.status === UNPROCESSABLE_ENTITY) props.onError("El alumno ya tiene una sancion activa.")
                else if(err.status === BAD_REQUEST) props.onError("El email no fue reconosido por el sistema.")
                else props.onError("Hubo un error. Intente de nuevo")
            })
        props.onClose();
        setSanction({userEmail:"", endDate: new Date(), reason: ""})
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
                <DropdownInput list={userList}
                               onChange={e => {setSanction({userEmail: e.target.value, endDate: sanction.endDate, reason: sanction.reason}); setList(e.target.value)}}
                               onSelect={row => setSanction({userEmail: row, endDate: sanction.endDate, reason: sanction.reason})}
                               placeholder={"Seleccione un alumno/a"}/>
                <textarea className={"reason-input"}
                          value={sanction.reason}
                          onChange={e => setSanction({userEmail: sanction.userEmail, endDate: sanction.endDate, reason: e.target.value})}
                          placeholder={"Ingrese una breve descripción del motivo de la sanción" }> </textarea>
                <DatePicker className={"date-picker"}
                            selected={sanction.endDate}
                            onChange={()=> {}}
                            onSelect={date => setSanction({userEmail: sanction.userEmail, endDate: date, reason: sanction.reason})}
                            placeholderText="Sancionado hasta"> </DatePicker>
                <CreateAndCancelButtons onCreate={() => handleAdd()} onCancel={cancel} createLabel={"Guardar"}/>
            </div>
        </GenericModal>
    )
}

export default AddSanctionModal;