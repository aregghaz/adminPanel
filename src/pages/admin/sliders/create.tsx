import React from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";



interface IUserCreate {
    path: string;
}


const SliderCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "sliders";
    const fields: Array<any> = [
        {name: "image", type: "file", label: "image", placeholder: "image"},
        {name: 'position', type: 'input', inputType:'number', label: 'position'},
        // {name: 'status', type: 'select', label: 'status'},
    ];

    const requiredFields = [
        "image",
    ];

    return <Create
        crudKey={crudKey}
        fields={fields}
        requiredFields={requiredFields}
        title={""}
        children={t("create")}
        selectRange
    />;

};

export default SliderCreate;
