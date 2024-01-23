import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";
import {AdminApi} from "../../../api/admin-api/admin-api";


interface IUserCreate {
    path: string;
}


const AttributesCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "attributes";
    const redirectKey = "users";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
         {name: "types", type: "select", label: "types", placeholder: "types"},
    ];
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.create(crudKey)

                setData(data);
            }
        )();

    }, []);
    const requiredFields = [
        "title",
    ];

    return data && <Create
        crudKey={crudKey}
        redirectKey={redirectKey}
        data={data}
        fields={fields}
        isAdmin={false}
        requiredFields={requiredFields}
        title={""}
        children={t("create")}
        selectRange
    />;

};

export default AttributesCreate;
