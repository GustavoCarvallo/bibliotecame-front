import React, {useState} from 'react'
import {Sanction} from "./SanctionsView";
import GenericModal from "../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
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

    const [sanction, setSanction] = useState<Sanction>({
        userEmail:"", endDate: new Date(), reason: ""
    })

    const [userList, setUserList] = useState<string[]>([])

    const handleAdd = () => {
        post("sanction", {email: sanction.userEmail, reason: sanction.reason, endDate:sanction.endDate })
        .then(() => {
            props.onSuccess("Se ha sancionado al alumno/a exitosamente!")
            cancel()
        })
            .catch(err => {
                props.onError(err)
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
                <DropdownInput list={userList}
                               onChange={val => {setSanction({...sanction, userEmail: val}); setList(val)}}
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
                <CreateAndCancelButtons onCreate={() => handleAdd()} onCancel={cancel} createLabel={"Guardar"}
                                        isActivated={sanction.userEmail !== "" && sanction.userEmail !== undefined &&
                                                    sanction.reason !== "" && sanction.reason !== undefined}/>
            </div>
        </GenericModal>
    )
}

export default AddSanctionModal;
