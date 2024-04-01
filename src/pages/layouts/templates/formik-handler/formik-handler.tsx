import React from "react";
import Select, {IOption, IOptionMultiselect} from "../../../../components/select/select";
import {FormikValues} from "formik";
import TextField from "../../../../components/text-field/text-field";
import Textarea from "../../../../components/textarea/textarea";
import Input from "../../../../components/input/input";
import Checkbox from "../../../../components/checkbox/checkbox";
import RichText from "../../../../components/rich-text/rich-text";
import {useTranslation} from "react-i18next";
///import DataPicker from "../../../../components/data-picker/data-picker";
import SingleFileUpload from "../../../../components/single-file-upload/single-file-upload";
import getFieldLabel from "../../../../utils/getFieldLabel";
import TimePickers from "../../../../components/time-picker/timepicker";
import DataPicker from "../../../../components/data-picker/data-picker";
import Autocomplete from "../../../../components/autocomplate/autocomplete";
import Password from "../../../../components/password/password";

export interface IItem {
    type: "input" | "password" | "selectGroup" | "autocomplete" | "address" | "timePicker" | "checkbox" | "richText" | "textarea" | "select" | "file" | "textField" | "radio" | "datepicker" | "multiSelect" | "attributes" | "hidden";
    inputType: string;
    name: string;
    value?: string | boolean | File | IOption;
    placeholder?: string;
    label: string;
    selectOptions?: Array<IOption> | Array<IOptionMultiselect>;
    allowValueClear?: boolean,

    autoComplete?: string,
}

interface IFormikHandler {
    item: IItem;
    handleChange: (e: React.ChangeEvent<any>) => void;
    values: FormikValues;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    selectOptions?: any;
    requiredFields: Array<string>;
    errors?: any;
    handleDrawMap?: any;
    autoCompleteRef?: any;
    selectRange: boolean;
    className?: string;
}

const FormikHandler: React.FC<IFormikHandler> = (
    {
        item,
        errors,
        values,
        handleChange,
        setFieldValue,
        selectOptions,
        className,
        selectRange,
        autoCompleteRef,
        handleDrawMap,
        requiredFields,
    }) => {
    const {t} = useTranslation();
    switch (item.type) {
        case "input":
            return (
                <>
                    {/* {errors[item.name] && <div >{errors[item.name] }</div>} */}

                    <Input
                        name={item.name}
                        value={values[item.name]}
                        type={item.inputType}
                        className={className}
                        onChange={handleChange}
                        placeholder={item.placeholder ? t(`admin:${item.placeholder}`) : t(`admin:${item.name}`)}
                        label={getFieldLabel(t, item.label, item.name, requiredFields)}
                        error={errors[item.name]}
                    />
                </>
            );
        case "password":
            return (
                <Password
                    name={item.name}
                    value={values[item.name]}
                    type={item.inputType}
                    className={className}
                    onChange={handleChange}
                    placeholder={item.placeholder ? t(`admin:${item.placeholder}`) : t(`admin:${item.name}`)}
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    error={errors[item.name]}
                    autoComplete={item.autoComplete}
                />
            );
        case "checkbox":
            return (
                <Checkbox
                    className={className}
                    name={item.name}
                    label={item.label}
                    checked={values[item.name]}
                    handlerCheckbox={() => setFieldValue(item.name, !values[item.name])}
                />
            );
        case "richText":
            return (
                // TODO:  type in function handlerEditorChange
                <RichText
                    handleEditorChange={(content: string, editor: any) => {
                        setFieldValue(item.name, content)
                    }}
                    label={t(`admin:${item.label}`)}
                    initialValue={values[item.name]}
                />
            );
        case "textarea":
            return (
                <Textarea
                    name={item.name}
                    onChange={handleChange}
                    value={values[item.name]}
                    label={t(`admin:${item.label}`)}
                    placeholder={t(`admin:${item.placeholder}`)}
                />
            );
        case "select":
            return (
                <Select
                    value={values[item.name]}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    options={selectOptions ? selectOptions[item.name] : selectOptions}
                    /// options={selectOptions}
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    onChange={(option: IOption) => setFieldValue(item.name, option)}
                    /// label={t(item.label)}
                    isSearchable={false}
                    name={item.name}
                    placeholder={t(item.label)}
                    allowValueClear={item.allowValueClear}
                    error={errors[item.name]}
                />
            );
        case "selectGroup":
            return (
                <Select
                    value={values[item.name]}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    options={values.selectOptions ? values.selectOptions[item.name] : selectOptions[item.name]}
                    onChange={(option: IOption) => setFieldValue(item.name, option)}
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    isSearchable={true}
                    name={item.name}
                    isMulti={true}
                    placeholder={item.placeholder ? t(item.placeholder) : item.name}
                    allowValueClear={item.allowValueClear}
                    error={errors[item.name]}
                />
            );
        case "file":
            return (
                <div style={{width: "100%"}}>
                    <SingleFileUpload
                        name={item.name}
                        oldImage={values[item.name]}
                        onChange={(event) => {
                            setFieldValue(item.name, event.currentTarget.files[0]);
                        }}
                        type={item.inputType}
                        label={getFieldLabel(t, item.label, item.name, requiredFields)}
                        value={values}
                        error={errors[item.name]}
                    />
                </div>
            );
        case "textField":
            return (
                <TextField
                    name={item.name}
                    value={values[item.name]}
                    type={item.inputType}
                    onChange={handleChange}
                    label={t(`admin:${item.label}`)}
                    placeholder={t(`admin:${item.placeholder}`)}
                />
            );
        case "multiSelect":

            return (
                <Select
                    value={values[item.name]}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    options={values.selectOptions ? values.selectOptions[item.name] : selectOptions[item.name]}
                    onChange={(option: IOption) => setFieldValue(item.name, option)}
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    isSearchable={true}
                    name={item.name}
                    isMulti={true}
                    placeholder={item.placeholder ? t(item.placeholder) : item.name}
                    allowValueClear={item.allowValueClear}
                    error={errors[item.name]}
                />
            );
        case "datepicker":
            return (
                <DataPicker
                    name={item.name}
                    setFieldValue={setFieldValue}
                    selectRange={selectRange}
                    value={values[item.name]}
                    error={errors[item.name]}
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                />
            );
        case "timePicker":
            return (
                <TimePickers
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    error={errors[item.name]}
                    name={item.name}
                    setFieldValue={setFieldValue}
                    value={values[item.name]}
                />
            );
        case "autocomplete":
            return (
                <Autocomplete
                    label={getFieldLabel(t, item.label, item.name, requiredFields)}
                    name={item.name}
                    setFieldValue={setFieldValue}
                    values={values}
                    requiredFields={requiredFields}
                    handleDrawMap={handleDrawMap}
                    handleChange={handleChange}
                    error={errors[item.name]}
                />
            );
        case "attributes":
            return (
                <div style={{paddingLeft: 40, paddingRight: 40}}>
                    <div>{getFieldLabel(t, item.label, item.name, requiredFields)}</div>
                    {values['attributes'] && values[item.name].map((i: { label: string, value: string, id: string }, index: number) => {
                        /// console.log(i,111111)
                        return <span key={index}>
                            <Input
                                onChange={handleChange}
                                name={i.id}
                                placeholder={i.label}
                                label={i.label}
                                type={'text'}
                                value={values[i.id]}/>
                            {/*<span>{item.label +' '+item.value}</span><br/>*/}
                        </span>
                    })}
                </div>
            );
        default:
            return (
                <Input
                    name={item.name}
                    value={values[item.name]}
                    type={'hidden'}
                    onChange={handleChange}
                    // placeholder={item.placeholder}
                    /// label={item.label}
                />
            );
    }
};

export default FormikHandler;
