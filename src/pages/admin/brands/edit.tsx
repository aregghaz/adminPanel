import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";

interface ITableFildsList {
    path: string;
    id?: number;
}

const BrandsEdit: React.FC<ITableFildsList> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "brands";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "id", type: "hidden", label: "id", placeholder: "id"},
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: 'image', type: 'file', label: 'image'},
        {name: 'meta_title', type: 'input', label: 'meta_title'},
        {name: 'meta_key', type: 'input', label: 'meta_key'},
        {name: "meta_desc", type: "textarea", label: "meta_desc", placeholder: "meta_desc"},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
    ];


    useEffect(() => {
        (
            async () => {
                if(id){
                    const data = await AdminApi.getItemData(crudKey, id);
                    setData(data);
                }
            }
        )();

    }, [id]);
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

export default BrandsEdit;
