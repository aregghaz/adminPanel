import React, { useState, useRef} from "react";
import s from "./data-picker.module.scss";
import Calendar from "react-calendar";
import timestampToDate from "../../utils/timestampToDate";
import "react-calendar/dist/Calendar.css";
import useOnClickOutside from "../../hooks/use-on-click-outside";

interface IDataPicker {
    setFieldValue: (name: string, date: string) => void;
    ///value: (name: string, option: IOption) => void
    label?: string;
    selectRange: boolean,
    type?: boolean,
    name: string;
    value?: any;
    style?: any;
    className?: any;

    error?: any;

    singleFileUpload?: boolean
}

const DataPicker: React.FC<IDataPicker> = (
    {
        name,
        setFieldValue,
        selectRange = false,
        label,
        type = false,
        value,
        className,
        style = {},
        error ='',
        singleFileUpload = false,
    }) => {
    const [show, setShow] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement>(null)
    // const getDateValue = value ? new Date(value) : 'mm/dd/yyyy';
    const outsideClickHandler = (e: any) => {
        setShow(false)
    }
    console.log(show,'valuevaluevalue')
    useOnClickOutside(calendarRef, outsideClickHandler)
    return (
        <>
            {error && !value && <span className={s.error}>{error}</span>}
            {label && <label style={{color: error && !value ? "crimson" : value ? "#194b76" : "#757575"}} className={s.label}>{label}</label>}
            <input
                style={{
                    ...style,
                    color: value ? "grey" : "C4C4C4",
                    // border: !singleFileUpload && error && !value ? "1px solid crimson" : type ? "none" : "",
                }} type="text" className={`${s.input} ${error && !value && s.errorInput}`}
                value={(value && value[0] !== null ) ? `${timestampToDate(value[0])} - ${timestampToDate(value[1])}` : ""}
                onClick={() => setShow(!show)}
                readOnly={true}/>
            {show && <div className={`${s.dataPicker} ${className}`} ref={calendarRef}>
                <Calendar
                formats="MM-dd-yyyy"
                selected={new Date().toLocaleDateString()}
                // className={s.dataPicker}
                // className={s.dataPickerAlt}
                selectRange={selectRange}
                onKeyDown={(e: any) => {
                    e.preventDefault();
                }}
                onChange={(date: any) => {
                  ///  console.log(date,new Date(date).toISOString(),'123')
                    setFieldValue(name, date);
                    setShow(!show);
                }}
            /></div>}

        </>
    );
};


export default DataPicker;
