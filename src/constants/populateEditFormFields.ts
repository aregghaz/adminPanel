import {IItem} from "../pages/layouts/templates/formik-handler/formik-handler";


const populateEditFormFields = (fields: Array<IItem>, data: { [key: string]: { [key: string]: any } }) => {
    const values: { [key: string]: Object | any } = {};
    fields
        .forEach((field) => {

            switch (field.type) {
                case "input":
                    values[field.name] = data.data[field.name];
                    break;
                case "file":
                    values[field.name] = data.data[field.name];
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
                case "attributes":

                    data.data[field.name].map((item: { label: string, value: string, id: string }, index: number) => {

                        values[item.id] = item.value

                    })
                    // values["origin"] = data.data["origin"];
                    // values["destination"] = data.data["destination"];
                    break;

                default:
                    values[field.name] = data.data[field.name];
                    break;
            }
        });

    return values;
};

export default populateEditFormFields;
