import { IItem } from "../pages/layouts/templates/formik-handler/formik-handler";


const populateEditFormFields = (fields: Array<IItem>, data: { [key: string]: { [key: string]: any } }) => {
    const values: { [key: string]: Object } = {};
    fields
        .forEach((field) => {
            console.log( data.data[field.name],'12323ss')
            switch (field.type) {
                case "input":
                    values[field.name] = data.data[field.name];
                    break;
                case "file":
                    values[field.name] = data.data[field.name];
                    values[`${field.name}_exp`] = data.data[`${field.name}_exp`];
                    break;
                case "hidden":
                    values[field.name] = data.data[field.name];
                    break;
                case "select":
                    values[field.name] = data.data[field.name];
                    break;
                case "datepicker":
                    values[field.name] = data.data[field.name];
                    break;
                case "autocomplete":
                    values["origin"] = data.data["origin"];
                    values["destination"] = data.data["destination"];
                    break;

                default:
                    values[field.name] = data.data[field.name];
                    break;
            }
        });

    return values;
};

export default populateEditFormFields;
