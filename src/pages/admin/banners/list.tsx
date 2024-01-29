import React, {useEffect, useState} from "react";
import List from "../../layouts/templates/list/list";
import {AdminApi} from "../../../api/admin-api/admin-api";
import PageAction from "../../../utils/page";
import DeleteModal from "../../../components/modal/deleteModal";

interface IProductsList {
    path: string;
}

const BannersList: React.FC<IProductsList> = () => {
    const crudKey = "attributes";
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
        'title',
        'type',
        'updated',
    ];
    const handlerAction = async (action: string, id?: number) => {
        return PageAction(crudKey, setLoading, loading, action, id, setIsModalOpen)
    };

    // const onSearchInput = async (event: { search: string }) => {
    //     // setQuery(event.search);
    //     // await getClientData(event.search, date);
    // };
    // const openSearch = () => {
    //     if (open) {
    //         // setQuery("");
    //         setLoading(true);
    //     }
    //     setOpen(!open);
    // };
    return (
        data &&
        <>
            {/*<NavigationTab  onSearchInput={onSearchInput} open={open} openSearch={openSearch}  />*/}
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
            />
        </>
    );
};


export default BannersList;
