import {AdminApi} from "../api/admin-api/admin-api";
import {navigate} from "@reach/router";

let state = 0;
const PageAction = (crudKey: string, setLoading: any, loading: boolean, action: string, id?: number, setIsModalOpen?: any) => {
  
    if(id){
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
    const handlerAction = async () => {
        switch (action) {
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

        }
    };
    return handlerAction();
}
export default PageAction;