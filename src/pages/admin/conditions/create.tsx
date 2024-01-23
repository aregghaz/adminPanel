import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";


interface IUserCreate {
    path: string;
}


const ConditionsCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "conditions";
    const redirectKey = "conditions";
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
    ];
    const requiredFields = [
        "title",
    ];

    return <Create
        crudKey={crudKey}
        redirectKey={redirectKey}
        fields={fields}
        isAdmin={false}
        requiredFields={requiredFields}
        title={""}
        children={t("create")}
        selectRange
    />;

};

export default ConditionsCreate;
