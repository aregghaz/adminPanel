import React from "react";
import Modal from "react-modal";
import Button from "../button/button";
import {useTranslation} from "react-i18next";
import useWindowResize from "../../hooks/use-window-resize";

import s from "./delete-service-modal.module.scss";


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
        height: "250px",
        width: "500px"

    },
    overlay: {
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)"
    }
};

const customStylesMobile: any = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "unset",
        outline: "none",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)",
        height: "25%",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(18px)"
    }
};

interface IDeleteServiceModal {
    isOpen: boolean;
    handleCloseModal: () => void;
    actionType?: string;
    handlerAction: (action: string) => void;
}

const DeleteServiceModal: React.FC<IDeleteServiceModal> = (
    {
        isOpen,
        handleCloseModal,
        actionType = '',
        handlerAction
    }) => {
    const {t} = useTranslation();
    const {width} = useWindowResize();

    let textData = ''
    let actionTypeNew = ''
    if (actionType === 'removePrice') {
        textData = t("Хотите удалить специальные цены?")
        actionTypeNew = 'removePriceData'
    } else {
        actionTypeNew = 'deleteModal'
        textData = t("Хотите удалить?")
    }
    return  (
        <Modal
            isOpen={isOpen}
            style={width < 767 ? customStylesMobile : customStyles}
            onRequestClose={handleCloseModal}
        >
            <div className={s.modalBody}>
                <div className={s.iconWrapper}>
                    <i className="cancelicon-"
                       onClick={handleCloseModal}
                    />
                </div>

                <i className={`binicon- ${s.icon}`}/>
                <p className={s.text}>{textData}</p>
                <div className={s.buttons}>
                    <Button type={"green"} onClick={() => handlerAction(actionTypeNew)}
                            className={s.button}>{t("admin:yesRemove")}</Button>
                    <Button type={"transparent"} onClick={handleCloseModal}
                            className={`${s.button} ${s.buttonNo}`}>{t("admin:no")}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteServiceModal;
