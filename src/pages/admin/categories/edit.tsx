import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {IItem} from "../../layouts/templates/formik-handler/formik-handler";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";

interface ITableFildsList {
    path: string;
    id?: number;
}

const CategoriesEdit: React.FC<ITableFildsList> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "categories";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "id", type: "hidden", label: "id", placeholder: "id"},
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
                if(id){
                    const data = await AdminApi.getItemData(crudKey, id);
                    console.log(data,'datadata')
                    setData(data);
                }


            }
        )();

    }, []);
    return (
        data &&
        <Edit
            crudKey={crudKey}
            data={data}
            fields={fields}
            title={""}
            children={t("update")}
            requiredFields={[]}
            selectRange
        />
    );
};

export default CategoriesEdit;
