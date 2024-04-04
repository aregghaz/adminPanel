import React, {FC} from "react";
import DeleteServiceModal from "../delete-service-modal/delete-service-modal";
import AddTagModal from "../add-tag/add-tag-modal";
import ChangePrice from "../change-price-modal/change-price-modal";

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


    if (actionType === 'addTag' || actionType === 'changeStatus') {
        return <AddTagModal
            actionType={actionType}
            isOpen={isModalOpen}
            ids={ids}
            handleCloseModal={handlerCloseModal}
            handlerAction={handlerAction}
        />
    } else if (actionType === 'assignPrice') {
        return <ChangePrice
            actionType={actionType}
            isOpen={isModalOpen}
            ids={ids}
            handleCloseModal={handlerCloseModal}
            handlerAction={handlerAction}
        />
    } else {
        return <DeleteServiceModal
            actionType={actionType}
            isOpen={isModalOpen}
            handleCloseModal={handlerCloseModal}
            handlerAction={handlerAction}
        />
    }

}

export default DeleteModal