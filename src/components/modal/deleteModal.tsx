import React, {FC} from "react";
import DeleteServiceModal from "../delete-service-modal/delete-service-modal";

interface IDeleteModal {
    isModalOpen: boolean,
    setIsModalOpen: (modalOpen: boolean) => void;
    handlerAction: (action: string) => void;
    // options: {id: number, value: string, label: string}[],
    // name: string,
    // id: string,
    // onChange?: Function
    // selected?: IOption
}

const DeleteModal: FC<IDeleteModal> = ({isModalOpen, setIsModalOpen, handlerAction}) => {
    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };


    return <DeleteServiceModal id={12} isOpen={isModalOpen} handleCloseModal={handlerCloseModal}
                               handlerDeleteItem={() => {
                                   handlerAction('deleteModal')
                               }}/>
    // (<Modal
    //     isOpen={isModalOpen}
    //     style={customStyles}
    //     onRequestClose={handlerCloseModal}
    // >
    //     <div className={s.modalBody}>
    //         <div className={s.iconWrapper}>
    //             <i className="cancelicon-"
    //                onClick={handlerCloseModal}
    //             />
    //         </div>
    //         <i className={`binicon- ${s.icon}`}/>
    //         <p className={s.text}>{t("admin.do_you_want_to_delete")}</p>
    //         <div className={s.buttons}>
    //             <Button type={"green"} onClick={() => handlerAction('deleteModal')}
    //                     className={s.button}>{t("admin.yes")}</Button>
    //             <Button type={"transparent"} onClick={handlerCloseModal}
    //                     className={s.button}>{t("admin.no")}</Button>
    //         </div>
    //     </div>
    // </Modal>)

}

export default DeleteModal