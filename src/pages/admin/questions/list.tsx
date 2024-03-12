import React, {useEffect, useRef, useState} from "react";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import CrudTable from "../../../components/crud-table-user/crud-table";
import NavigationTab from "../../../components/navigation/navigationTab";

interface IProductsList {
    path: string;
}

const Questions: React.FC<IProductsList> = () => {
    const crudKey = "questions";

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState("");
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey, countRef.current, query);
                setData(data);
                //  setCount(data.count);

            }
        )();
        // dispatch(actions.setTitles(titles))
        // dispatch(actions.clearData())
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'id',
        'name',
        'email',
        'notes',
    ];
    const [ids, setIds] = useState([]);
    const handlerAction = async (action: string, id?: number) => {
        console.log(ids,'ids')
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


export default Questions;
