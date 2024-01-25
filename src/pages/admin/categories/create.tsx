import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";
import {AdminApi} from "../../../api/admin-api/admin-api";


interface IUserCreate {
    path: string;
}


const CategoryCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "categories";
    const redirectKey = "users";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: "categories", type: "select", label: "categories", placeholder: "categories"},
        {name: "meta_title", type: "input", label: "meta_title", placeholder: "meta_title"},
        {name: "meta_key", type: "input", label: "meta_key", placeholder: "meta_key"},
        {name: "status", type: "select", label: "status", placeholder: "status"},
        {name: "image", type: "file", label: "image", placeholder: "image"},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
        {name: "meta_desc", type: "richText", label: "meta_desc", placeholder: "meta_desc"},
    ];
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.create('categories')

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

export default CategoryCreate;
