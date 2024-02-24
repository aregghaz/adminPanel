import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
import {IPageEdit} from "../../../types/admin";
import MultiFile from "../../../components/multi-file/multi-file";


const ProductEdit: React.FC<IPageEdit> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "products";
    const [data, setData] = useState<any>(null);
    const fields: Array<any> = [
        {name: 'id', type: 'hidden', label: 'id'},
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: "quantity", type: "input", inputType: 'number', label: "quantity", placeholder: "quantity"},
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

        {name: 'status', type: 'select', label: 'status'},
        {name: 'categories', type: 'multiSelect', label: 'categories'},

        {name: 'attributes', type: 'multiSelect', label: 'attributes', placeholder: 'attributes'},
        {name: 'meta_title', type: 'input', label: 'meta_title'},
        {name: 'meta_key', type: 'input', label: 'meta_key'},
        {name: "meta_desc", type: "textarea", label: "meta_desc", placeholder: "meta_desc"},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
        {name: 'attributes', type: 'attributes', label: 'attributes'},

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

    const requiredFields = [
        "title",
        "price",
        'brand_id',
        'quantity',
        'categories',
        'meta_title',
        'description',
    ];
    return (
        data &&
        <>
            {id && <MultiFile data={data.images} id={id}/>}
            <Edit
                crudKey={crudKey}
                data={data}
                fields={fields}
                title={""}
                children={'update'}
                requiredFields={requiredFields}
                selectRange
            />
        </>

    );
};

export default ProductEdit;
