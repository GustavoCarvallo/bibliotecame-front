import React, {useEffect, useState} from 'react'
import {SanctionDisplay} from "../SanctionsView";
import GenericModal from "../../common/GenericModal/GenericModal";
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import DropdownInput from "../../common/DropDownInput/DropDownInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {put} from "../../utils/http";
import {addDays} from "../../utils/AddDays";

type Props = {
    sanction: SanctionDisplay,
    isOpen: boolean,
    onClose: ()=>void,
    onSuccess: Function,
    onError: Function,
    getList: Function
}

const EditSanctionModal = (props: Props) => {

    const [newEndDate, setNewEndDate] = useState<Date>(new Date());

    useEffect(()=>{
        if(props.sanction.endDate !== "") setNewEndDate(new Date(`${props.sanction.endDate} 00:00`));
    }, [props.sanction])

    let today = new Date()
    today.setHours(0,0,0,0);

    const handleEdit = () => {

        if(newEndDate.getTime() < today.getTime()){
            props.onError("La sancion no puede terminar antes que hoy!")
        } else {
            today.setMonth(today.getMonth()+3);
            if(newEndDate.getTime() >= today.getTime()){
                props.onError("La sancion no puede terminar dentro de más de 3 meses.")
            }
            else {
                put("sanction", {...props.sanction, endDate: new Date(newEndDate.getTime()).toJSON().slice(0, 10)}) //exact opposite happens here
                    .then(() => {
                        props.onSuccess("Se ha modificado la sanción exitosamente!")
                        props.getList();
                        cancel()
                    })
                    .catch(err => {
                        props.onError(err)
                    })
            }
        }
    }

    const cancel = () => {
        props.onClose()
    }

    return(
        <GenericModal title={"Modificar Sanción"} isOpen={props.isOpen} onClose={props.onClose} titleClassName={"sanction-modal-title"}>
            <div className={"add-sanction-body"}>
                <DropdownInput value={props.sanction.email} readonly={true}/>
                <textarea className={"reason-input readonly"}
                          value={props.sanction.reason} readOnly={true}> </textarea>
                <DatePicker className={"date-picker"}
                            selected={newEndDate}
                            onChange={()=> {}}
                            onSelect={date => setNewEndDate(date)}
                            minDate={today}
                            maxDate={addDays(new Date(), 90)}
                            placeholderText="Sancionado hasta"> </DatePicker>
                <CreateAndCancelButtons onCreate={() => handleEdit()} onCancel={cancel} createLabel={"Guardar"}
                                        isActivated={true}/>
            </div>
        </GenericModal>
    )
}

export default EditSanctionModal;
