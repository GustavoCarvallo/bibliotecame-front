import React from 'react';
import "./CreateIncorporationRequest.css";
import CreateAndCancelButtons from "../../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";
import {post} from "../../../utils/http";
import {notifyError, notifySuccess} from "../../../router/Routes";

type Props = {
    onCancel: ()=>void,
}

type IncorporationRequest = {
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

const CreateIncorporationRequest = (props: Props) => {
    const [form, setForm] = React.useState<IncorporationRequest>({...initialForm})

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
        <div className={"create-incorporation-request"}>
            <h1 className={"create-incorporation-request-title"}>Solicitud de Incorporación</h1>
            <div className={"create-incorporation-body"}>
                <div className={"create-incorporation-form"}>
                    <input type="text" value={form.title} placeholder={"Título del libro"} onChange={changeTitle}
                           className={"create-incorporation-field"}/>
                    <input type="text" value={form.author} placeholder={"Autor del libro"} onChange={changeAuthor}
                           className={"create-incorporation-field"}/>
                    <input type="text" value={form.publisher ?? ''} placeholder={"Editorial del libro (opcional)"}
                           onChange={changePublisher} className={"create-incorporation-field"}/>
                    <input type="number" value={form.year ?? ''} placeholder={"Año del libro (opcional)"} onChange={changeYear}
                           className={"create-incorporation-field"}/>
                    <textarea className={"create-incorporation-reason"}
                              rows={4} cols={70}
                              value={form.reason}
                              onChange={changeReason}
                              placeholder={"Razón de la solicitud"}/>
                </div>
                <CreateAndCancelButtons onCancel={props.onCancel} onCreate={handleCreate} isActivated={checkIsActivated()}/>
            </div>
        </div>
    )
}

export default CreateIncorporationRequest;
