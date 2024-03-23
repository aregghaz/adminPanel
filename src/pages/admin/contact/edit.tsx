import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
interface IProductsList {
    path: string;
}


const ContactEdit: React.FC<IProductsList> = () => {
    const {t} = useTranslation();
    const crudKey = "contacts";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "id", type: "hidden", label: "id", value:1,placeholder: "id"},
        {name: "address", type: "input", label: "address", placeholder: "address"},
        {name: "phone_1", type: "input", label: "phone_1", placeholder: "phone_1"},
        {name: "phone_2", type: "input", label: "phone_2", placeholder: "phone_2"},
        {name: "phone_3", type: "input", label: "phone_3", placeholder: "phone_3"},
        {name: "phone_4", type: "input", label: "phone_4", placeholder: "phone_4"},
        {name: "whats_up", type: "input", label: "whats_up", placeholder: "whats_up"},
        {name: "email_1", type: "input", label: "email_1", placeholder: "email_1"},
        {name: "email_2", type: "input", label: "email_2", placeholder: "email_2"},
        {name: "contact_telegram", type: "input", label: "contact_telegram", placeholder: "contact_telegram"},
        {name: "contact_whats_up", type: "input", label: "contact_whats_up", placeholder: "contact_whats_up"},
        {name: "sub_tiktok", type: "input", label: "sub_tiktok", placeholder: "sub_tiktok"},
        {name: "sub_youtube", type: "input", label: "sub_youtube", placeholder: "sub_youtube"},
        {name: "sub_x", type: "input", label: "sub_x", placeholder: "sub_x"},
        {name: "lang", type: "input", label: "lang", placeholder: "lang"},
        {name: "long", type: "input", label: "long", placeholder: "long"},


    ];


    useEffect(() => {
        (
            async () => {
                    const data = await AdminApi.get(crudKey);
                    setData(data);

            }
        )();

    }, []);

    const requiredFields = [
        'address',
        'phone_1',
        'phone_2',
        'phone_3',
        'whats_up',
        'whats_up',
        'email_1',
        'email_2',
        'contact_telegram',
        'contact_whats_up',
        'sub_tiktok',
        'sub_x',
        'lang',
        'long'
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

export default ContactEdit;
