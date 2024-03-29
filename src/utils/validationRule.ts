import { FormikValues } from "formik";
import { IItem } from "../pages/layouts/templates/formik-handler/formik-handler";
//const validationRules = (values, requiredFields:Array<'string'>, fields:Array<IItem> , translatableFields, t) => {
const validationRules = (values: FormikValues, requiredFields: Array<string>, fields: Array<IItem>, t: any) => {
    const errors: any = {};

    requiredFields.map((field:string) => {
        const findItem = fields.find((f:any) => f.name === field);
        if (
            fields.length > 0 &&
            findItem && findItem.type === "file"
        ) {
            if (!values[field]) {
                errors[field] = t("admin:field_required");
            }
        } else
            if (
            (typeof values[field] === "undefined" || values[field] === "") &&
            fields.find((f) => f.name === field)
        ) {
            errors[field] = t("admin:field_required");
        }
    });
    console.log(errors, "errors");

    return errors;
};

export default validationRules;
