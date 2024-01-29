import React, {useEffect, useRef, useState} from "react";
import List from "../../layouts/templates/list/list";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";
import CrudTable from "../../../components/crud-table-user/crud-table";

interface IProductsList {
    path: string;
}

const BrandsList: React.FC<IProductsList> = () => {
    const crudKey = "brands";

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey,countRef.current);
                setData(data);
                //  setCount(data.count);

            }
        )();
        // dispatch(actions.setTitles(titles))
        // dispatch(actions.clearData())
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'image',
        // 'description',
        'title',
        'slug',
        'updated',
    ];
    const handlerAction = async (action: string, id?: number) => {
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen)
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
            {/* <InfoBlock  items={data}/> */}
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


export default BrandsList;
