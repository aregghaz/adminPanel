import React, {useRef} from "react";
import useLocalStorage from "../../hooks/use-local-storage";
import Checkbox from "../checkbox/checkbox";
import ReactSelect, {components} from "react-select";
import {useTranslation} from "react-i18next";
import {selectStylesFunction} from "../../utils/cssUtils";
import s from "./select.module.scss";
import Button from "../button/button";
import {ReactComponent as RemoveIcon} from "../../svgs/removeIcon.svg"
import {JSX} from "react/jsx-runtime";

export interface IOption {
    id: number;
    value: string;
    label: string;
    slug?: string;
}


interface ISelect {
    styles?: any,
    allowValueClear?: boolean
    isCheckbox?: boolean
    isSearchable?: boolean
    placeholder?: string
    options?: Array<IOption>
    /////FIXME FIX TIS PART
    onChange: any
    getOptionLabel: (option: IOption) => string
    getOptionValue: (option: IOption) => string
    value?: Array<IOption> | IOption
    name?: string
    label?: string
    isShow?: boolean
    isMulti?: boolean
    authCheckboxLabelStyle?: string
    labelStyle?: any
    error?: any
    handlerMenuOpen?: () => void
    handlerMenuClose?: () => void
    hideSelectedOptions?: boolean
    isDisabled?: boolean
}


const SelectGroup: React.FC<ISelect> = (
    {
        allowValueClear = true,
        styles = {},
        isShow = false,
        isSearchable = true,
        placeholder = "",
        options,
        onChange,
        getOptionLabel,
        getOptionValue,
        value,
        name,
        label,
        isMulti = true,
        authCheckboxLabelStyle,
        labelStyle,
        handlerMenuClose,
        handlerMenuOpen,
        hideSelectedOptions = false,
        isDisabled = false,
        //   handlerAdd,
        error,
    }
) => {
    const {t} = useTranslation();
    const [themeType] = useLocalStorage("theme", "light");
    //  const [value, setValue] = useState([]);
    const selectRef: any = useRef(null)
    const markAll = () => {
        onChange(options);
    };
    const Menu = () => {

        const asd: { label: JSX.Element; options: any; }[] = []
        options && options.map((item: any) => {
            asd.push({
                label: (() => {
                    return (
                        <div
                            onClick={() => onChange(item.value)}
                        >
                            {item.label}
                        </div>
                    );
                })(),
                options: item.options
            })
        })
        return asd;

    };

    const unMarkAll = () => {
        onChange([]);
    };
    const handleOptionRemove: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
        e.preventDefault()
        selectRef.current.clearValue()
    }
    return (
        <>
            {error && !value && <div className={s.error}>{error}</div>}

            {label && <label className={`${s.label} ${labelStyle}`} style={{
                color: error && !value ? "crimson" : value ? "#194b76" : "#757575",
            }} htmlFor={name}>{t(label)}</label>}
            <div className={s.wrapper}>
                {isShow && <div className={s.buttonsSelect}>
                    {isMulti && <><Button
                        type={"green"}
                        onClick={markAll}
                        key={"one"}
                        className={s.selectButton}
                    >

                        {t(`admin:mark_all`)}
                    </Button>
                        <Button
                            type={"green"}
                            onClick={unMarkAll}
                            key={"two"}
                            className={s.selectButton}
                        >
                            {t(`admin:remove_all`)}
                        </Button></>}
                </div>}
                <div className={s.selectWrapper}>
                    <ReactSelect
                        ref={selectRef}
                        isMulti={isMulti}
                        styles={selectStylesFunction(styles, error)}
                        className={s.select}
                        placeholder={t(`admin:${placeholder}`)}
                        components={{
                            IndicatorSeparator: () => null
                        }
                        }
                        options={Menu()}
                        name={name}
                        isSearchable={true}
                        onChange={onChange}
                        isDisabled={isDisabled}
                        getOptionLabel={getOptionLabel}
                        getOptionValue={getOptionValue}
                        value={value}
                        authCheckboxLabelStyle={authCheckboxLabelStyle}
                        onMenuOpen={handlerMenuOpen}
                        onMenuClose={handlerMenuClose}
                        hideSelectedOptions={hideSelectedOptions}
                    />
                    {(allowValueClear && !isMulti) && <>
                        <div className={s.selectRemove}>
                            <button
                                onClick={handleOptionRemove}
                                style={{
                                    display: value ? "flex" : "none",
                                    alignItems: "center",
                                }}
                            >
                                <RemoveIcon/>
                            </button>
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    );
};

export default SelectGroup;
