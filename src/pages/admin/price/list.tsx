import React, {useEffect, useRef, useState} from "react";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import CrudTable from "../../../components/crud-table-user/crud-table";
import NavigationTab from "../../../components/navigation/navigationTab";
import InfoBlock from "../../../components/info-block/info-block";

interface IProductsList {
    path: string;
}

const OrderPrice: React.FC<IProductsList> = () => {
    const crudKey = "request-price";

    const [data, setData] = useState([]);
    const [singleData, setSingleData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey, countRef.current, query);
                setData(data);
            }
        )();
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'id',
        'name',
        'lastName',
        'phone',
        'email',
        'company',
    ];
    const [ids, setIds] = useState([]);


    const handlerGetSingleData = async (id: number) => {
        const data = await AdminApi.getItemData(crudKey, id);
        setSingleData(data)
    }
    const handlerAction = async (action: string, id?: number) => {
        if (action === 'get' && id) {
            await handlerGetSingleData(id)
        }
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen, ids, setIds)
    };
    const tableRef = useRef(null);
    const countRef = useRef(2);

    const fetchMoreData = async () => {
        countRef.current++
        setLoading(!loading)
    };

    return (
        data &&
        <>
            {singleData && <InfoBlock data={singleData}/>}
            <NavigationTab
                open={open}
                tableRef={tableRef}
                loading={loading}
                setLoading={setLoading}
                setOpen={setOpen}
                setQuery={setQuery}
                handlerAction={handlerAction}
            />
            <CrudTable
                data={data}
                titles={titles}
                isCreate={false}
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
                handlerAction={handlerAction}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};


export default OrderPrice;
