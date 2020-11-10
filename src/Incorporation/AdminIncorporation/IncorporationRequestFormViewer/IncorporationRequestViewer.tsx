import React, {useEffect} from 'react';
import {get} from "../../../utils/http";
import {notifyError} from "../../../router/Routes";
import GenericModal from "../../../common/GenericModal/GenericModal";
import "./IncorporationRequestViewer.css"
import { Profile } from '../../../Profile/Profile';
import GreyAndBlueButton from "../../../common/Buttons/GreyAndBlueButton/GreyAndBlueButton";
import Button from "../../../common/Button/Button";

type Props = {
    onCancel: ()=>void,
    isOpen: boolean,
    onClose: ()=>void,
    id: number,
}

export type IncorporationRequest = {
    title: string,
    author: string,
    publisher?: string,
    year?: string,
    reason: string,
    user: Profile,
}

const initialState:IncorporationRequest = {
    title: "",
    author: "",
    reason: "",
    publisher: "",
    year: "",
    user: {},
}

const IncorporationRequestViewer = (props: Props) => {
    const [selectedIncorporationRequest,setSelectedIncorporationRequest] = React.useState<IncorporationRequest>(initialState)

    const openRequestInformation = (id: number) => {
        get(`request/${id}`)
            .then(res => {
                setSelectedIncorporationRequest({
                    ...res,
                    publisher: res.publisher === "" ? "-" : res.publisher,
                    year: res.year === 0 ? "-" : res.year.toString(),
                });
            })
            .catch(err => notifyError(err));
    }

    useEffect(() => openRequestInformation(props.id),[props.isOpen])


    const rows = [
        {
            label: 'Usuario',
            component: (request: IncorporationRequest) => (
                <h1 className={'incorporation-request-details-component'}>{request.user.email}</h1>
            ),
        },
        {
            label: 'Libro',
            component: (request: IncorporationRequest) => (
                <h1 className={'incorporation-request-details-component'}>{request.title}</h1>
            ),
        },
        {
            label: 'Autor',
            component: (request: IncorporationRequest) => (
                <h1 className={'incorporation-request-details-component'}>{request.author}</h1>
            ),
        },
        {
            label: 'Editorial',
            component: (request: IncorporationRequest) => (
                <h1 className={'incorporation-request-details-component'}>{request.publisher}</h1>
            ),
        },
        {
            label: 'Año',
            component: (request: IncorporationRequest) => (
                <h1 className={'incorporation-request-details-component'}>{request.year}</h1>
            ),
        },
    ]


    return (
            <GenericModal isOpen={props.isOpen} onClose={props.onClose} title={`Solicitud de incorporación`} withHeader>
                <div className={'incorporation-request-details-container'}>
                    {rows.map(row => (
                        <div className={'incorporation-request-details-row'}>
                            <h1 className={'incorporation-request-details-label'}>{row.label}:</h1>
                            {row.component(selectedIncorporationRequest)}
                        </div>
                    ))}
                    <div className={'incorporation-request-details-row'}>
                        <h1 className={'incorporation-request-details-label'}>Razón:</h1>
                        <h3 className={'incorporation-request-reason'}>{selectedIncorporationRequest.reason}</h3>
                    </div>
                </div>
                <div className={'incorporation-request-button-container'}>
                    <Button label={"Volver"} className={"generic-red-button"} onClick={props.onCancel}/>
                </div>
            </GenericModal>
    )
}

export default IncorporationRequestViewer;
