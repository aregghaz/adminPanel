import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";
import {AdminApi} from "../../../api/admin-api/admin-api";


interface IUserCreate {
    path: string;
}


const ProductCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "products";
    const redirectKey = "products";
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "title", type: "input",  label: "title", placeholder: "title"},
        {name: "price", type: "input", inputType:'number', label: "price", placeholder: "price"},
        {name: "special_price", type: "input", inputType:'number' , label: "special_price", placeholder: "special_price"},
        {name: "quantity", type: "input", inputType:'number', label: "quantity", placeholder: "quantity"},
        {name: 'brand_id', type: 'select', label: 'brands'},
        {name: 'categories', type: 'multiSelect', label: 'categories'},
        {name: 'attributes', type: 'multiSelect', label: 'attributes', placeholder: 'attributes'},
        {name: 'meta_title', type: 'input', label: 'meta_title'},
        {name: 'sku', type: 'input', label: 'sku'},
        {name: 'meta_key', type: 'input', label: 'meta_key'},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
        {name: "meta_desc", type: "richText", label: "meta_desc", placeholder: "meta_desc"},
        {name: 'attributes', type: 'attributes', label: 'attributes'},


        // {name: "id", type: "hidden", inputType: "hidden"}
    ];
    useEffect(() => {
        (
            async () => {
                 const data = await AdminApi.create('products')

               setData(data);
            }
        )();

    }, []);
    const requiredFields = [
        "title",
        "price",
        // "address",
        // "birthday",
        // "phone_number",
        // "password",
        // "email",
        // "license",
        // "picture",
        // "sex_offender_check",
        // "motor_vehicle_record",
        // "defensive_driving",
        // "wheelchair_securement",
        // "pass_basic",
        // "emt_1",
        // "first_aid",
        // "company_training",
        // "drug_test"
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

export default ProductCreate;
