import React from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";



interface IUserCreate {
    path: string;
}


const BrandsCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "brands";
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: 'image', type: 'file', label: 'image'},
        {name: 'meta_title', type: 'input', label: 'meta_title'},
        {name: 'meta_key', type: 'input', label: 'meta_key'},
        {name: "meta_desc", type: "textarea", label: "meta_desc", placeholder: "meta_desc"},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
    ];

    const requiredFields = [
        "title",
        "image",
        "description",
        "meta_title",
        "meta_desc",
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

export default BrandsCreate;
