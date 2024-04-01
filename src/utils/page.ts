import {AdminApi} from "../api/admin-api/admin-api";
import {navigate} from "@reach/router";

let state = 0;
const PageAction = (
    crudKey: string,
    setLoading: any,
    loading: boolean,
    action: string,
    id: number = 0,
    setIsModalOpen?: any,
    ids?: any,
    setIds?: any,
) => {

    if (id) {
        state = id
    }


    const handlerAddItem = () => navigate(`/${crudKey}/create`);
    const handlerEditItem = () => navigate(`/${crudKey}/${state}`);
    const handlerDeleteModal = async () => {
        setIsModalOpen(true)
    };
    const handlerDelete = async () => {
        await AdminApi.delete(crudKey, state);
        setLoading(!loading)
        setIsModalOpen(false);

    };
    const handlerGroupDelete = async () => {
        await AdminApi.groupDelete(crudKey, ids);
        setLoading(!loading)
        ///   setIsModalOpen(false);

    }

    const handlerAddTag = async () => {
        // await AdminApi.groupDelete(crudKey, ids);
        // setLoading(!loading)
        setIsModalOpen(true)
        ///   setIsModalOpen(false);

    };

    const handlerSelectClient = async () => {
        ///  if (event.ctrlKey || event.shiftKey) {
        const objWithIdIndex = ids.findIndex((value: number) => value === state);
        if (objWithIdIndex > -1) {
            setIds((prevState: any[]) => {
                return prevState.filter((value) => value !== state);
            });
        } else {
            setIds((prevState: any) => {
                return [
                    ...prevState,
                    state
                ];
            });
        }
    };
    const handlerAction = async () => {
        switch (action) {
            case "get":
                await handlerSelectClient();
                break;
            case "edit":
                await handlerEditItem();
                break;
            case "add":
                await handlerAddItem();
                break;
            case "deleteModal":
                await handlerDelete();
                break;
            case "delete":
                await handlerDeleteModal();
                break;
            case "addTag":
                await handlerAddTag();
                break;
            case "changeStatus":
                await handlerAddTag();
                break;
            case "assignPrice":
                await handlerAddTag();
                break;
            case "groupDelete":
                await handlerGroupDelete();
                break;

        }
    };
    return handlerAction();
}
export default PageAction;