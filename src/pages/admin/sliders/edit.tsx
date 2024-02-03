import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
import {IPageEdit} from "../../../types/admin";



const SliderEdit: React.FC<IPageEdit> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "sliders";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "id", type: "hidden", label: "id", placeholder: "id"},
        {name: "image", type: "file", label: "image", placeholder: "image"},
        {name: 'position', type: 'input', inputType:'number', label: 'position'},
        {name: 'status', type: 'select', label: 'status'},
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
    const requiredFields = [
        "image",
        "position",
    ];
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

export default SliderEdit;
