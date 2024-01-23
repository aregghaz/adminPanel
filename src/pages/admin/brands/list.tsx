import React, {useEffect, useState} from "react";
import List from "../../layouts/templates/list/list";
import {useNavigate} from "@reach/router";
import Button from "../../../components/button/button";
import s from "../../layouts/templates/list/list.module.scss";
import {useTranslation} from "react-i18next";
import Modal from "react-modal";
import {useDispatch} from "react-redux";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";

interface IProductsList {
    path: string;
}

const BrandsList: React.FC<IProductsList> = () => {
    const crudKey = "brands";
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const {t} = useTranslation();
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.get(crudKey);
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
        'title',
        'slug',
        'updated',
    ];
    const handlerAction = async (action: string, id?: number) => {
        return PageAction(crudKey, setLoading, loading, action, id)
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


export default BrandsList;
