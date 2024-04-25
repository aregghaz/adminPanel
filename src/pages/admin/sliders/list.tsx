import React, {useEffect, useRef, useState} from "react";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import CrudTable from "../../../components/crud-table-user/crud-table";

interface IProductsList {
    path: string;
}

const SlidersList: React.FC<IProductsList> = () => {
    const crudKey = "sliders";

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
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'id',
        'image',
        'position',
        'status',
    ];
    const [ids, setIds] = useState([]);
    const handlerAction = async (action: string, id?: number) => {
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


export default SlidersList;
