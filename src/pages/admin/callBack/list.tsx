import React, {useEffect, useState} from "react";
import List from "../../layouts/templates/list/list";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";

interface IProductsList {
    path: string;
}

const CallBackList: React.FC<IProductsList> = () => {
    const crudKey = "call-back";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey);
                setData(data);
            }
        )();
    }, [loading]);


    const titles: Array<string> = [
        'action',
        'id',
        'email',
        'phone',
        'updated',
    ];
    const handlerAction = async (action: string, id?: number) => {
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen)
    };


    return (
        data &&
        <>
            <List
                data={data}
                titles={titles}
                isDelete={true}
                isEdit={false}
                isGetInfo={false}
                paginated={false}
                isCreate={false}
                isGetItems={false}
                isGetHistory={false}
                className={"pagination"}
                handlerAction={handlerAction}
            />
            <DeleteModal
                handlerAction={handlerAction}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};


export default CallBackList;
