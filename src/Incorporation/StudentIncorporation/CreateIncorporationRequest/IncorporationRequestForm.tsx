import React from 'react';
import "./IncorporationRequestForm.css";
import CreateAndCancelButtons from "../../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import {post} from "../../../utils/http";
import {notifyError, notifySuccess} from "../../../router/Routes";
import RedButton from "../../../common/Buttons/RedButton/RedButton";

type Props = {
    onCancel: ()=>void,
    form?: IncorporationRequest,
    disabled?: boolean
}

export type IncorporationRequest = {
    title: string,
    author: string,
    publisher?: string,
    year?: number,
    reason: string,
}

const initialForm = {
    title: "",
    author: "",
    reason: "",
}

const MAX_YEAR = (new Date()).getFullYear();
const MIN_YEAR = 800;

const IncorporationRequestForm = (props: Props) => {
    const [form, setForm] = React.useState<IncorporationRequest>(props.form ?? {...initialForm})

    const changeTitle = (event: any) => {
        setForm({...form, title: event.target.value});
    }

    const changeAuthor = (event: any) => {
        setForm({...form, author: event.target.value});
    }

    const changePublisher = (event: any) => {
        setForm({...form, publisher: event.target.value});
    }

    const changeYear = (event: any) => {
        setForm({...form, year: event.target.value});
    }

    const changeReason = (event: any) => {
        setForm({...form, reason: event.target.value});
    }

    const handleCreate = () => {
        if (form.year && (form.year > MAX_YEAR || form.year < MIN_YEAR)){
            notifyError(`El año debe estar entre ${MIN_YEAR} y ${MAX_YEAR}`)
        }else {

            post('request', form)
                .then(() => {
                    notifySuccess("La solicitud se ha cargado correctamente!")
                    setForm({...initialForm});
                })
                .catch(err => notifyError(err));
        }
    }

    const checkIsActivated = () => {
        return form.title !== "" && form.author !== "" && form.reason !== "";
    }

    return (
        <div className={"incorporation-request-form"}>
            <h1 className={"incorporation-request-form-title"}>Solicitud de Incorporación</h1>
            <div className={"incorporation-request-form-container"}>
                <div className={"incorporation-request-form-body"}>
                    <input type="text" value={form.title} placeholder={"Título del libro"} onChange={changeTitle}
                           className={"incorporation-request-form-field"} disabled={props.disabled}/>
                    <input type="text" value={form.author} placeholder={"Autor del libro"} onChange={changeAuthor}
                           className={"incorporation-request-form-field"} disabled={props.disabled}/>
                    <input type="text" value={form.publisher ?? ''} placeholder={"Editorial del libro (opcional)"}
                           onChange={changePublisher} className={"incorporation-request-form-field"} disabled={props.disabled}/>
                    <input type="number" value={form.year ?? ''} placeholder={"Año del libro (opcional)"} onChange={changeYear}
                           className={"incorporation-request-form-field"} disabled={props.disabled}/>
                    <textarea className={"incorporation-request-form-reason"}
                              rows={4} cols={70}
                              value={form.reason}
                              onChange={changeReason}
                              placeholder={"Razón de la solicitud"} disabled={props.disabled}/>
                </div>
                {props.disabled?
                    <RedButton label={"Volver"} onClick={props.onCancel}/>
                    :
                    <CreateAndCancelButtons onCancel={props.onCancel} onCreate={handleCreate} isActivated={checkIsActivated()}/>}
            </div>
        </div>
    )
}

export default IncorporationRequestForm;
