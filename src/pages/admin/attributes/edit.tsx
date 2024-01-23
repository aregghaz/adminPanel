import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {IItem} from "../../layouts/templates/formik-handler/formik-handler";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";

interface ITableFildsList {
    path: string;
    id?: number;
}

const AttributesEdit: React.FC<ITableFildsList> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "attributes";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "id", type: "hidden", label: "id", placeholder: "id"},
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: "type", type: "select", label: "type", placeholder: "type"},
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

export default AttributesEdit;