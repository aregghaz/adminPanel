import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useTranslation} from "react-i18next";
import useWindowResize from "../../hooks/use-window-resize";

import s from "./add-tag.module.scss";
import {AdminApi} from "../../api/admin-api/admin-api";
import Select, {IOption} from "../select/select";
import Button from "../button/button";


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

interface IAddTagModal {
    isOpen: boolean;
    ids?: Array<number>
    handleCloseModal: () => void;
    handlerAction: (action: string) => void;
}

const AddTagModal: React.FC<IAddTagModal> = (
    {
        isOpen,
        handleCloseModal,
        handlerAction,
        ids
    }) => {
    const {t} = useTranslation();
    const {width} = useWindowResize();
    const [data, setData] = useState([])
    const [selected, setSelected] = useState<any>({})

    const handlerGroupAddTeg = async () => {
        if (ids) {
            await AdminApi.addGroupTed(ids, selected.id)
            handleCloseModal()
        }

    }
    const getData = async () => {
        const dataTag = await AdminApi.getTag();
        setData(dataTag.data)
    }
    useEffect(() => {

        if (isOpen) {
            getData()
        }
    }, [isOpen])
    return (
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
                <Select
                    labelStyle={s.labelStyle}
                    value={selected}
                    getOptionValue={(option: IOption) => option.value}
                    getOptionLabel={(option: IOption) => t(option.label)}
                    options={data}
                    onChange={(option: IOption) => setSelected(option)}
                    label={t('admin:addTeg')}
                    isSearchable={true}
                    name={'tag'}
                    hideSelectedOptions={true}
                    isMulti={false}
                    placeholder={t('admin:addTeg')}
                />
                <Button type={"green"} onClick={handlerGroupAddTeg}
                        className={s.buttonAdd}>{t("admin:yes")}</Button>
            </div>
        </Modal>
    );
};

export default AddTagModal;
