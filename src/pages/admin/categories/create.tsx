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
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: "categories", type: "select", label: "categories", placeholder: "categories"},
        {name: "image", type: "file", label: "image", placeholder: "image"},
        {name: "banner", type: "file", label: "banner", placeholder: "banner"},
        {name: 'attributes', type: 'multiSelect', label: 'attributes'},
        {name: "meta_title", type: "input", label: "meta_title", placeholder: "meta_title"},
        {name: "meta_key", type: "input", label: "meta_key", placeholder: "meta_key"},
        {name: "meta_desc", type: "textarea", label: "meta_desc", placeholder: "meta_desc"},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
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
        "description",
        "meta_title",
        "meta_desc",
    ];

    return data && <Create
        crudKey={crudKey}
        data={data}
        fields={fields}
        requiredFields={requiredFields}
        title={""}
        children={t("create")}
        selectRange
    />;

};

export default CategoryCreate;
