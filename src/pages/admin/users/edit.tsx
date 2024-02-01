import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
import {IPageEdit} from "../../../types/admin";


const UserEdit: React.FC<IPageEdit> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "users";
    const [data, setData] = useState<any>(null);
    const fields: Array<any> = [
        {name: 'id', type: 'hidden', label: 'id'},
        {name: "name", type: "input", label: "name", placeholder: "name"},
        {name: "lastName", type: "input", label: "lastName", placeholder: "lastName"},
        {name: "fatherName", type: "input", label: "fatherName", placeholder: "fatherName"},
        {name: "phone", type: "input", label: "phone", placeholder: "phone"},
        {name: "email", type: "input", label: "email", placeholder: "email"},
        {
            name: "password",
            type: "password",
            label: "password",
            inputType: "password",
            autoComplete: "new-password",
            placeholder: "Password"
        },
        {name: "status", type: "select", label: "status", placeholder: "status"},
        {name: "subscribed", type: "select", label: "status", placeholder: "status"},
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

    }, [id]);
    return (
        data &&
        <>

            <Edit
                crudKey={crudKey}
                data={data}
                fields={fields}
                title={""}
                children={t("update")}
                requiredFields={[]}
                selectRange
            />
        </>

    );
};

export default UserEdit;
