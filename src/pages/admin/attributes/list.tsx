import React, {useEffect, useRef, useState} from "react";
import List from "../../layouts/templates/list/list";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import NavigationTab from "../../../components/navigation/navigationTab";
import CrudTable from "../../../components/crud-table-user/crud-table";

interface IProductsList {
    path: string;
}

const AttributesList: React.FC<IProductsList> = () => {
    const crudKey = "attributes";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    const tableRef = useRef(null);
    const countRef = useRef(2);
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey,countRef.current,query);
                setData(data);
            }
        )();
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'id',
        'title',
        'type',
        'updated',
    ];
    const handlerAction = async (action: string, id?: number) => {
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen)
    };



    const fetchMoreData = async () => {
        countRef.current++
        setLoading(!loading)
    };
    return (
        data &&
        <>
            <NavigationTab
                open={open}
                tableRef={tableRef}
                loading={loading}
                setLoading={setLoading}
                setOpen={setOpen}
                setQuery={setQuery}
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
                isInfo={false}
                isRemove={false}
            />
            <DeleteModal
                handlerAction={handlerAction}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};


export default AttributesList;
