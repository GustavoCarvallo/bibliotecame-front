import React, {useEffect} from 'react';
import ReactTooltip from "react-tooltip";

type Props = {
    id: number,
    defaultValue: boolean,
    openModal: (id: number, active: boolean, callBack: (active:boolean)=>void)=>void
}

const ActivateOrDeactivateButton = (props: Props) => {
    const [active, setActive] = React.useState(props.defaultValue);

    const openActivateModal = () => {
        props.openModal(props.id, active, setActive);
    }

    return (
        <>
            <ReactTooltip/>
            <i className={active ?  "fas fa-ban search-book-red-icon" : "far fa-check-circle search-book-green-icon"}
               data-tip={active ? "Deshabilitar" : "Habilitar"}
               onClick={() => openActivateModal()}/>
        </>
    )
}

export default ActivateOrDeactivateButton;
