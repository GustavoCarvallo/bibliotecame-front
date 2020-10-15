import React, {ChangeEvent, useState} from 'react'
import "./DropDownInput.css";

type Props = {
    placeholder?: string,
    onChange:  (event: any)=>void,
    onSelect: (event: any)=>void,
    list: string[]
}

const DropdownInput = (props: Props) => {

    const [showDropdown, setShowDropdown] = useState<boolean>()
    const [selected, setSelected] = useState<string>()

    const flipDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleSelect = (row: string) => {
        setSelected(row)
        setShowDropdown(false);
        props.onSelect(row)
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
        setShowDropdown(selected !== "");
        changeInputState(e.target.value)
    }

    const changeInputState = (value: string) => {
        setSelected(value)
        props.onChange(value)
    }

    return(
        <div className={ "dropdown-container"}>
            <div className={"dropdown-input-container"}>
                <input className={"input"}
                       value={selected}
                       type={'text'}
                       onChange={e => handleChange(e)}
                       placeholder={props.placeholder}/>
                <i className={`fas fa-times icon`} onClick={() => changeInputState("")} style={{color: selected && selected !== "" ? '#030303' : '#a4a8ad'}}/>
                <span className="drop-icon icon" onClick={flipDropdown}><i className="fas fa-chevron-down"> </i></span>
            </div>
            <div className={"drop-list"}>
            {(props.list.length > 0 && showDropdown) ? props.list.map(row => (
                    <div className={"generic-drop-row"}>
                        <span onClick={e => handleSelect(row)}>{row}</span>
                    </div>
                )) :
                (
                    <div className={"no-drop-container"}> </div>
                )
            }
            </div>
        </div>
    )
}

export default DropdownInput;