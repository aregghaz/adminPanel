import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";
import {AdminApi} from "../../../api/admin-api/admin-api";


interface IUserCreate {
    path: string;
}


const BrandsCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "brands";
    const redirectKey = "brands";
    const [data, setData] = useState(null);
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

export default BrandsCreate;
