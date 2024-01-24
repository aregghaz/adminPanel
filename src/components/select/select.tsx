import React, {useRef} from "react";
import useLocalStorage from "../../hooks/use-local-storage";
import Checkbox from "../checkbox/checkbox";
import ReactSelect, {components, MenuProps, OptionProps, OptionTypeBase} from "react-select";
import {useTranslation} from "react-i18next";
import {selectStylesFunction} from "../../utils/cssUtils";
import s from "./select.module.scss";
import Button from "../button/button";
import {ReactComponent as RemoveIcon} from "../../svgs/removeIcon.svg"

export interface IOption {
    id: number;
    value: string;
    label: string;
    slug?: string;
}

export interface IOptionMultiselect {
    id: number;
    value: string;
    label?: string;
    slug?: string;
}

interface IMenu {
    props: any;
    handlerAdd: () => void;
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
    isMulti?: boolean
    authCheckboxLabelStyle?: string
    labelStyle?: string
    error?: any
    handlerMenuOpen?: () => void
    handlerMenuClose?: () => void
    hideSelectedOptions?: boolean
    isDisabled?: boolean
    isMenuAdd?: boolean,
    ///  handlerAdd: any

}


const Option = (props: any) => {
    const {t} = useTranslation();
    return (<components.Option {...props}>
        <Checkbox
            label={t(props.label)}
            checked={props.isSelected}
            labelStyle={props.selectProps.authCheckboxLabelStyle}
        />
    </components.Option>);
};

const Menu: React.FC<IMenu> = ({props, handlerAdd}: any) => {
    const {t} = useTranslation();
    return (
        <components.Menu {...props} >
            <>
                <ul className={s.customMenuList}>
                    {
                        props.options
                            .map((item:any, index:number) => (
                                    <li
                                        key={index}
                                        onClick={() => props.selectOption(item)}
                                    >
                                        {t(item.label)}
                                    </li>
                                )
                            )
                    }
                </ul>
                <div className={s.addBtn} onClick={handlerAdd}>
                    {t("add_new_type")} +
                </div>
            </>
        </components.Menu>
    );
};

const Select: React.FC<ISelect> = (
    {
        allowValueClear = true,
        styles = {},
        isCheckbox = false,
        isSearchable = false,
        placeholder = "",
        options,
        onChange,
        getOptionLabel,
        getOptionValue,
        value,
        name,
        label,
        isMulti = false,
        authCheckboxLabelStyle,
        labelStyle,
        handlerMenuClose,
        handlerMenuOpen,
        hideSelectedOptions = false,
        isMenuAdd = false,
        isDisabled = false,
        //   handlerAdd,
        error,
    }
) => {
    const {t} = useTranslation();
    const [themeType] = useLocalStorage("theme", "light");
    const selectRef: any = useRef(null)
    const markAll = () => {
        onChange(options);
    };

    const unMarkAll = () => {
        onChange([]);
    };
    const handleOptionRemove: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
        e.preventDefault()
        selectRef.current.select.clearValue()
    }
    return (
        <>
            {error && !value && <div className={s.error}>{error}</div>}

            {label && <label style={{
                color: error && !value ? "crimson" : value ? "#194b76" : "#757575",
            }} htmlFor={name}>{t(label)}</label>}
            <div className={s.wrapper}>
                <div className={s.buttonsSelect}>
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
                </div>
                <div className={s.selectWrapper}>
                    <ReactSelect
                        ref={selectRef}
                        isMulti={isMulti}
                        styles={selectStylesFunction(styles, error)}
                        className={s.select}
                        placeholder={t(`admin:${placeholder}`)}
                        components={isCheckbox ? {
                                Option,
                                IndicatorSeparator: () => null
                            }
                            :
                            isMenuAdd ?
                                {
                                    IndicatorSeparator: () => null

                                    // Menu: (props) => <Menu props={props} handlerAdd={handlerAdd}/>,
                                    // IndicatorSeparator: () => null
                                }
                                :
                                {IndicatorSeparator: () => null}}
                        options={options}
                        name={name}
                        isSearchable={isSearchable}
                        onChange={onChange}
                        ///FIXME: ADD THIS PART
                        isDisabled={isDisabled}
                        /// isOptionDisabled={() => 5 >= 3}
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

export default Select;
