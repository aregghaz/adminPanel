import React, {useEffect, useState} from "react";
import Edit from "../../layouts/templates/edit/edit";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
import Input from "../../../components/input/input";

interface ITableFildsList {
    path: string;
    id?: number;
}

const ProductEdit: React.FC<ITableFildsList> = ({id, path}) => {
    const {t} = useTranslation();
    const crudKey = "products";
    const [data, setData] = useState<any>(null);
    const fields: Array<any> = [
         {name: 'id', type: 'hidden', label: 'id'},
        {name: "title", type: "input",  label: "title", placeholder: "title"},
        {name: "price", type: "input", inputType:'number', label: "price", placeholder: "price"},
        {name: "special_price", type: "input", inputType:'number' , label: "special_price", placeholder: "special_price"},
        {name: "quantity", type: "input", inputType:'number', label: "quantity", placeholder: "quantity"},
        {name: 'brand_id', type: 'select', label: 'brands'},
        {name: 'categories', type: 'multiSelect', label: 'categories'},
        {name: 'attributes', type: 'multiSelect', label: 'attributes', placeholder: 'attributes'},
        {name: 'status', type: 'select', label: 'status'},
        {name: 'meta_title', type: 'input', label: 'meta_title'},
        {name: 'sku', type: 'input', label: 'sku'},
        {name: 'meta_key', type: 'input', label: 'meta_key'},
        {name: 'attributes', type: 'attributes', label: 'attributes'},
        {name: "description", type: "richText", label: "description", placeholder: "description"},
        {name: "meta_desc", type: "richText", label: "meta_desc", placeholder: "meta_desc"},
    ];


    useEffect(() => {
        (
            async () => {
                if (id) {
                    const data = await AdminApi.getItemData(crudKey, id);
                    console.log(data, 'datadata')
                    setData(data);
                }


            }
        )();

    }, []);
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

export default ProductEdit;
