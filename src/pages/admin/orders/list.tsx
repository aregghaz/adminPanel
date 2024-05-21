import React, {useEffect, useRef, useState} from "react";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import CrudTable from "../../../components/crud-table-user/crud-table";
import NavigationTab from "../../../components/navigation/navigationTab";
import InfoOrder from "../../../components/info-block/info-order";

interface IProductsList {
    path: string;
}

const OrdersList: React.FC<IProductsList> = () => {
    const crudKey = "orders";
    const [data, setData] = useState([]);
    const [singleData, setSingleData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey, countRef.current, query);
                setData(data);
            }
        )();
    }, [loading,isModalOpen]);


    const titles: Array<string> = [
        'action',
        'id',
        'orderId',
        'user',
        'status',
        'quantity',
        'total',
        'updated',
    ];
    const tableRef = useRef(null);
    const countRef = useRef(2);
    const [ids, setIds] = useState([]);
    const handlerAction = async (action: string, id?: number) => {
        setActionType(action)
        if(action === "addItem" && id){
           const singleDataOrder = await AdminApi.getSingleOrder(id)
            setSingleData(singleDataOrder)
        }else{
            setSingleData({})
        }
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen, ids, setIds)
    };
    const fetchMoreData = async () => {
        countRef.current++
        setLoading(!loading)
    };


    return (
        data &&
        <>
            {Object.keys(singleData).length > 0 && <InfoOrder data={singleData}/>}
            <NavigationTab
                open={open}
                IsAssignStatus={true}
                tableRef={tableRef}
                loading={loading}
                isDelete={false}
                IsAssignTag={false}
                setLoading={setLoading}
                setOpen={setOpen}
                setQuery={setQuery}
                handlerAction={handlerAction}
            />
            <CrudTable
                data={data}
                titles={titles}
                isDelete={true}
                isEdit={false}
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


export default OrdersList;
