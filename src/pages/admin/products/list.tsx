import React, {useEffect, useRef, useState} from "react";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import CrudTable from "../../../components/crud-table-user/crud-table";
import NavigationTab from "../../../components/navigation/navigationTab";
import {IOption} from "../../../components/select/selectGroup";

interface IProductsList {
    path: string;
}

const ProductsList: React.FC<IProductsList> = () => {
    const crudKey = "products";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState<IOption>();


    const setFieldValue = async (name: string, dataValue: any) => {
        setSelectedCategory(dataValue)
        setLoading(!loading)
      ///  let result = dataValue.map(({id}: any) => id)
     //   const data = await AdminApi.get(crudKey, countRef.current, query ,result);
            /// setData(data.data);

    }


    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey, countRef.current, query, selectedCategory?.id);
                setData(data.data);
                setCategory(data.categories)
            }
        )();
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'id',
        'image',
        'name',
        'stock',
        'price',
        'special_price',
        'slug',
        'teg',
        'brand',
        // 'categories',
        'updated'
    ];
    const tableRef = useRef(null);
    const countRef = useRef(2);
    const [ids, setIds] = useState([]);
    const handlerAction = async (action: string, id?: number) => {
        setActionType(action)
        console.log(action,'action')
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen, ids, setIds)
    };

    const fetchMoreData = async () => {
        countRef.current++
        setLoading(!loading)
    };


    return (
        data &&
        <>
            {/* <InfoBlock  items={data}/> */}
            <NavigationTab
                open={open}
                IsAssignPrice={true}
                IsRemovePrice={true}
                IsSelectCategory={true}
                selectedCategory={selectedCategory}
                category={category}
                tableRef={tableRef}
                loading={loading}
                IsAssignTag={true}
                setFieldValue={setFieldValue}
                setLoading={setLoading}
                setOpen={setOpen}
                setQuery={setQuery}
                handlerAction={handlerAction}
            />
            <CrudTable
                data={data}
                titles={titles}
                isDelete={true}
                isEdit={true}
                className={"pagination"}
                handlerAction={handlerAction}
                tableRef={tableRef}
                fetchMoreData={fetchMoreData}
                action={false}
                selectedIds={ids}
                isInfo={false}
                isRemove
            />
            <DeleteModal
                ids={ids}
                actionType={actionType}
                handlerAction={handlerAction}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};


export default ProductsList;
