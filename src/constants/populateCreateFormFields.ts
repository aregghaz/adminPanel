import { IItem } from "../pages/layouts/templates/formik-handler/formik-handler";

const populateCreateFormFields = (fields: Array<IItem>, data: any) => {

    const values: any = {};

    fields
        .forEach((field) => {
            switch (field.type) {
                case "input":
                    //   values[''] = data['']
                    break;
                case "file":
                    //    values[''] = data['']
                    break;
                case "hidden":
                    //  values[''] = data['']
                    break;
                case "select":
                    /// values.selectOptions[field.name] = data[field.name]
                    break;
                case "multiSelect":
                    // values[field.name]= data[field.name]
                    break;
                case "datepicker":
                    // values.selectOptions[''] = data['']
                    break;
                case "attributes":

                    // data.data[field.name].map((item: { label: string, value: string, id: string }, index: number) => {
                    //
                    //     values[item.id] = item.value
                    //
                    // })
                    // values["origin"] = data.data["origin"];
                    // values["destination"] = data.data["destination"];
                    break;
                default:
                    //       values[field.name] = []
                    break;
            }
        });
    return values;
};

export default populateCreateFormFields;
