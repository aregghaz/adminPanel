import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useTranslation} from "react-i18next";

import s from "./change-price.module.scss";
import {AdminApi} from "../../api/admin-api/admin-api";
import Button from "../button/button";
import DataPicker from "../data-picker/data-picker";
import getFieldLabel from "../../utils/getFieldLabel";
import Input from "../input/input";


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
        height: "650px",
        width: "500px"

    },
    overlay: {
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)"
    }
};


interface IAddTagModal {
    isOpen: boolean;
    actionType?: string;
    ids?: Array<number>
    handleCloseModal: () => void;
    handlerAction: (action: string) => void;
}

const ChangePrice: React.FC<IAddTagModal> = (
    {
        isOpen,
        actionType,
        handleCloseModal,
        handlerAction,
        ids
    }) => {
    const {t} = useTranslation();
    const [data, setData] = useState([])
    const [selected, setSelected] = useState<any>({})
    const [value, setValue] = useState<any>({
        dates: '',
        discount: "0",
    })

    const handlerGroupAddTeg = async () => {
        if (ids) {
            await AdminApi.addGroupDiscount(ids, value)
            handleCloseModal()
        }

    }
    const getData = async () => {
        const data = await AdminApi.getTag();

        setData(data.data)
    }
    const handleChange = async (e: any) => {
        await setFieldValue('discount', e.target.value)

    }
    const setFieldValue = async (name: string, date: string) => {
        setValue((state: any) => {
            return {
                ...state,
                [name]: date
            }
        })
    }
    useEffect(() => {
        if (isOpen) {
            getData()
        }
    }, [isOpen])
    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            onRequestClose={handleCloseModal}
        >
            <div className={s.modalBody}>
                <div className={s.iconWrapper}>
                    <i className="cancelicon-"
                       onClick={handleCloseModal}
                    />
                </div>
                <div className={s.body}>

                    <div className={s.inputDiv}>
                        <Input
                            label={t("admin:discount")}
                            placeholder={t("admin:discount")}
                            name={"discount"}
                            type={"text"}
                            onChange={handleChange}
                            value={value.discount}
                            // error={errors["email"]}
                        />
                        <DataPicker
                            className={s.dateInput}
                            value={value.dates || ''}
                            name={'dates'}
                            setFieldValue={setFieldValue}
                            selectRange={true}
                            label={getFieldLabel(t, 'dates', 'dates', ['dates'])}
                        />
                    </div>
                    <div className={s.button}>
                        <Button type={"green"} onClick={handlerGroupAddTeg}
                                className={s.buttonAdd}>{t("admin:yes")}</Button>
                    </div>
                </div>

            </div>
        </Modal>
    );
};

export default ChangePrice;
