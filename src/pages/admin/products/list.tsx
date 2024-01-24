import React, {useEffect, useRef, useState} from "react";
import List from "../../layouts/templates/list/list";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import CrudTable from "../../../components/crud-table-user/crud-table";

interface IProductsList {
    path: string;
}

const ProductsList: React.FC<IProductsList> = () => {
    const crudKey = "products";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey, countRef.current);
                setData(data);
            }
        )();
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'id',
        'name',
        // 'description',
        'price',
        'special_price',
        'slug',
        'conditions',
        'teg',
        'brand',
        'categories',
        'updated'
    ];
    const tableRef = useRef(null);
    const countRef = useRef(2);

    const handlerAction = async (id:number,action: string) => {
       // return PageAction(crudKey, setLoading, loading, action, id)
    };
    const fetchMoreData = async () => {
        countRef.current++
        setLoading(!loading)
    };
    return (
        data &&
        <>
            {/* <InfoBlock  items={data}/> */}
            <CrudTable
                data={data}
                titles={titles}
                isDelete={true}
                isEdit={true}
                className={"pagination"}
                handlerAction={handlerAction}
                tableRef={tableRef}
             fetchMoreData={fetchMoreData} action={false} isInfo isRemove/>
            {/*<DeleteModal*/}
            {/*    handlerAction={handlerAction}*/}
            {/*    isModalOpen={isModalOpen}*/}
            {/*    setIsModalOpen={setIsModalOpen}*/}
            {/*    t={t}*/}
            {/*/>*/}
        </>
    );
};


export default ProductsList;
