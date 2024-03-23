import React, {FC} from "react";
import DeleteServiceModal from "../delete-service-modal/delete-service-modal";
import AddTagModal from "../add-tag/add-tag-modal";

interface IDeleteModal {
    isModalOpen: boolean,
    actionType?: string,
    ids?: Array<number>,

    setIsModalOpen: (modalOpen: boolean) => void;
    handlerAction: (action: string) => void;
    // options: {id: number, value: string, label: string}[],
    // name: string,
    // id: string,
    // onChange?: Function
    // selected?: IOption
}

const DeleteModal: FC<IDeleteModal> = ({
                                           isModalOpen,
                                           setIsModalOpen,
                                           ids,
                                           handlerAction,
                                           actionType = null,
                                       }) => {
    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };


    if (actionType === 'addTag') {
        return <AddTagModal
            isOpen={isModalOpen}
            ids={ids}
            handleCloseModal={handlerCloseModal}
            handlerAction={handlerAction}
        />
    } else {
        return <DeleteServiceModal
            isOpen={isModalOpen}
            handleCloseModal={handlerCloseModal}
            handlerAction={handlerAction}
        />
    }

}

export default DeleteModal