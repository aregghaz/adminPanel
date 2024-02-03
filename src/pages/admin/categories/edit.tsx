import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
import {IPageEdit} from "../../../types/admin";


const CategoriesEdit: React.FC<IPageEdit> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "categories";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "id", type: "hidden", label: "id", placeholder: "id"},
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: "categories", type: "select", label: "categories", placeholder: "categories"},
        {name: "image", type: "file", label: "image", placeholder: "image"},
        {name: "banner", type: "file", label: "banner", placeholder: "banner"},
        {name: "meta_title", type: "input", label: "meta_title", placeholder: "meta_title"},
        {name: 'attributes', type: 'multiSelect', label: 'attributes'},
        {name: "meta_key", type: "input", label: "meta_key", placeholder: "meta_key"},
        {name: "status", type: "select", label: "status", placeholder: "status"},
        {name: "meta_desc", type: "textarea", label: "meta_desc", placeholder: "meta_desc"},
        {name: "description", type: "richText", label: "description", placeholder: "description"},

    ];


    useEffect(() => {
        (
            async () => {
                if (id) {
                    const data = await AdminApi.getItemData(crudKey, id);
                    setData(data);
                }


            }
        )();

    }, []);
    const requiredFields = [
        "title",
        "description",
        "meta_title",
        "meta_desc",
    ]
    return (
        data &&
        <Edit
            crudKey={crudKey}
            data={data}
            fields={fields}
            title={""}
            children={t("update")}
            requiredFields={requiredFields}
            selectRange
        />
    );
};

export default CategoriesEdit;
