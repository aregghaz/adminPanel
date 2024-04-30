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
    const [data, setData] = useState(null);
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: "quantity", type: "input", inputType: 'number', label: "quantity", placeholder: "quantity"},
        {name: "stock", type: "input",  label: "stock", placeholder: "stock"},
        {name: 'brand_id', type: 'select', label: 'brands'},
        {name: "price", type: "input", inputType: 'number', label: "price", placeholder: "price"},
        {
            name: "special_price",
            type: "input",
            inputType: 'number',
            label: "special_price",
            placeholder: "special_price"
        },
        {
            name: "range",
            type: "datepicker",
            selectRange: true,
            label: "date_special_price",
            placeholder: "date_special_price"
        },
        {name: 'teg_id', type: 'select', label: 'teg_id'},
        {name: 'categories', type: 'selectGroup', label: 'categories'},
        {name: 'meta_title', type: 'input', label: 'meta_title'},
        {name: 'meta_key', type: 'input', label: 'meta_key'},
        {name: "meta_desc", type: "textarea", label: "meta_desc", placeholder: "meta_desc"},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
        {name: "image", type: "file", label: "image", placeholder: "image"},
        {name: 'attributes', type: 'multiSelect', label: 'attributes', placeholder: 'attributes'},
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
        'quantity',
        'categories',
        // 'meta_title',
        // 'description',
    ];

    return data && <>

        <Create
            crudKey={crudKey}
            data={data}
            fields={fields}
            requiredFields={requiredFields}
            title={""}
            children={"create"}
            selectRange
        />
    </>

};

export default ProductCreate;
