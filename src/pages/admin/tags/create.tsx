import React from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";



interface ITagsCreate {
    path: string;
}


const TagsCreate: React.FC<ITagsCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "tags";
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: 'position', type: 'input', inputType:'number', label: 'position'},
    ];

    const requiredFields = [
        "image",
        "position",
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

export default TagsCreate;
