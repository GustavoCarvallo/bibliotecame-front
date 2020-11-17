import React, {ChangeEvent, useEffect, useRef, useState} from 'react'
import "./DropDownInput.css";

type Props = {
    placeholder?: string,
    onChange?: (event: any) => void,
    onSelect?: (event: any) => void,
    list?: string[],
    value?: string,
    readonly?: boolean,
}

const DropdownInput = (props: Props) => {

    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    },[])

    const handleClick = (e: MouseEvent) => {
        // @ts-ignore
        if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)){
            setShowDropdown(false);
        }
    }

    const [showDropdown, setShowDropdown] = useState<boolean>()
    const [selected, setSelected] = useState<string>()

    const flipDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleSelect = (row: string) => {
        setSelected(row)
        setShowDropdown(false);
        if (props.onSelect) props.onSelect(row)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShowDropdown(e.target.value !== "");
        changeInputState(e.target.value)
    }

    const changeInputState = (value: string) => {
        setSelected(value)
        if (props.onChange) props.onChange(value)
    }

    return (
        <div className={"dropdown-container"} ref={dropdownRef}>
            <div className={`dropdown-input-container ${props.readonly ? 'readonly' : ''}`}>
                <input className={"input"}
                       value={(props.value) ? props.value : selected}
                       type={'text'}
                       readOnly={props.readonly}
                       onChange={e => handleChange(e)}
                       placeholder={props.placeholder}/>
                <i className={`fas fa-times icon`} onClick={() => changeInputState("")}
                   style={{color: selected && selected !== "" ? '#030303' : '#a4a8ad'}}/>
                <span className="drop-icon icon" onClick={flipDropdown}><i className="fas fa-chevron-down"> </i></span>
            </div>
            {(props.list && !props.readonly && props.list.length > 0 && showDropdown) ? (<div className={"drop-list"}>
                    {props.list.map((row, index) => (
                        <div key={index} className={"generic-drop-row"}>
                            <span onClick={() => handleSelect(row)}>{row}</span>
                        </div>
                    ))}
                </div>) :
                (
                    <div className={"no-drop-container"}/>
                )
            }
        </div>
    )
}

export default DropdownInput;
