import React, {useEffect, useState} from "react";
import List from "../../layouts/templates/list/list";
import {useTranslation} from "react-i18next";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";

interface IProductsList {
    path: string;
}

const CategoriesList: React.FC<IProductsList> = () => {
    const crudKey = "categories";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
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
        'title',
        'slug',
        'parent',
        'updated',
    ];


    const handlerAction = async (action: string, id?: number) => {
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen)
    };

    return (
        data &&
        <>
            {/* <InfoBlock  items={data}/> */}
            <List
                data={data}
                titles={titles}
                isDelete={true}
                isEdit={true}
                isGetInfo={false}
                paginated={false}
                isCreate={true}
                isGetItems={false}
                isGetHistory={false}
                className={"pagination"}
                handlerAction={handlerAction}
            />
            <DeleteModal
                handlerAction={handlerAction}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                t={t}
            />

        </>
    );
};


export default CategoriesList;
