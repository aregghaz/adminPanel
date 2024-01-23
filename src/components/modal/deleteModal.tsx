import React, {FC} from "react";
import Modal from "react-modal";
import s from "../../pages/layouts/templates/list/list.module.scss";
import Button from "../button/button";

interface IDeleteModal {
    isModalOpen: boolean,
    setIsModalOpen: (modalOpen: boolean) => void;
    handlerAction: (action: string) => void;
    t: any
    // options: {id: number, value: string, label: string}[],
    // name: string,
    // id: string,
    // onChange?: Function
    // selected?: IOption
}

const DeleteModal: FC<IDeleteModal> = ({isModalOpen, setIsModalOpen, handlerAction, t}) => {
    const handlerCloseModal = () => {
        setIsModalOpen(false);
    };

    const customStyles: any = {
        content: {
            position: "fixed",
            border: "none",
            overflowY: "unset",
            outline: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50% , -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "290px"
        },
        overlay: {
            zIndex: 400,
            background: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(5px)"
        }
    };
    return (<Modal
        isOpen={isModalOpen}
        style={customStyles}
        onRequestClose={handlerCloseModal}
    >
        <div className={s.modalBody}>
            <div className={s.iconWrapper}>
                <i className="cancelicon-"
                   onClick={handlerCloseModal}
                />
            </div>
            <i className={`binicon- ${s.icon}`}/>
            <p className={s.text}>{t("admin.do_you_want_to_delete")}</p>
            <div className={s.buttons}>
                <Button type={"green"} onClick={() => handlerAction('deleteModal')}
                        className={s.button}>{t("admin.yes")}</Button>
                <Button type={"transparent"} onClick={handlerCloseModal}
                        className={s.button}>{t("admin.no")}</Button>
            </div>
        </div>
    </Modal>)
}

export default DeleteModal