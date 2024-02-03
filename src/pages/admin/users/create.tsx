import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";
import {AdminApi} from "../../../api/admin-api/admin-api";


interface IUserCreate {
    path: string;
}

const UsersCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "users";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
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
        {name: "subscribed", type: "select", label: "subscribed", placeholder: "subscribed"},
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
        "name",
        "lastName",
        "email",
        'phone',
        'password'
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

export default UsersCreate;
