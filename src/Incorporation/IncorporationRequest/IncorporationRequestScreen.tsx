import React from 'react';
import "./IncorporationRequestScreen.css";
import CreateIncorporationRequest from "./CreateIncorporationRequest/CreateIncorporationRequest";

const SEARCH = "SEARCH";
const CREATE = "CREATE";

const IncorporationRequestScreen = () => {
    const [status, setStatus] = React.useState(SEARCH);

    const openCreateScreen = () => {
        setStatus(CREATE);
    }

    const openSearchScreen = () => {
        setStatus(SEARCH);
    }

    return(
        <div className={"incorporation-request-screen"}>
            {status === SEARCH && <i className={'fas fa-plus-circle add-button'} onClick={openCreateScreen}/>
            }
            {status === CREATE && <CreateIncorporationRequest onCancel={openSearchScreen}/>}
        </div>
    )
}

export default IncorporationRequestScreen;
