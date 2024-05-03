import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import cls from "./info-block.module.scss";
import timestampToDate from "../../utils/timestampToDate";
import {fakeUrl} from "../../utils/getFieldLabel";
import {OrderMode} from "../../constants/helpers";


interface IProps {
    data: any,
}


const InfoOrder: FC<IProps> = ({data}) => {
    /// const infoData: any = items.find(item => item.id === idData);

    const {t} = useTranslation();


    return (
        <div className={cls.block}>
            {
                data &&
                <>
                    <div className={cls.addressBlock}>
                        <div className={cls.itemsRow}>
                            <div className={cls.itemsColumn}>
                                <span className={cls.b_text}>{t("admin:total")} : </span>
                                {data.grant_total} ₽

                            </div>
                            <div className={cls.itemsColumn}>
                                <span className={cls.b_text}>{t("admin:status")} : </span>
                                {OrderMode[data.status]}
                            </div>
                            <div className={cls.itemsColumn}>
                                <span className={cls.b_text}>{t("admin:updated")} : </span>
                                {timestampToDate(data.created_at)}
                            </div>
                        </div>
                        <div className={cls.itemsRow}>
                            <div className={cls.itemsColumn}>
                                <span className={cls.b_text}>{t("admin:notes")} : </span>
                                {data.notes}
                            </div>
                        </div>
                    </div>

                    <div className={cls.addressBlock}>
                        {data.products.map((item:any) => {
                            return (<div className={`${cls.itemsRow} ${cls.itemsProduct}`}>
                                <div className={cls.itemsColumn}>
                                    {item.item.name}
                                </div>
                                <div className={cls.itemsColumn}>
                                    <img width={120} src={`${fakeUrl}${item.item.image}`} alt={item.item.name}/>
                                </div>
                                <div className={cls.itemsColumn}>
                                    <span className={cls.b_text}>{t("admin:price")} : </span>
                                    {item.price}
                                </div>
                                <div className={cls.itemsColumn}>
                                    <span className={cls.b_text}>{t("admin:quantity")} : </span>
                                    {item.quantity}
                                </div>
                            </div>)
                        })}
                    </div>
                    <div className={cls.addressBlock}>
                        {data.address && <>
                            <div className={cls.itemsRow}>
                                <div className={cls.item}>
                                    <span className={cls.b_text}>{t("admin:fullName")}: </span>
                                    {data.user.lastName} {data.user.name} {data.user.fatherName}
                                </div>
                                <div className={cls.item}>
                                    <span className={cls.b_text}>{t("admin:phone")}: </span>
                                    {data.user.phone}
                                </div>

                                <div className={cls.item}>
                                    <span className={cls.b_text}>{t("admin:email")}: </span>
                                    {data.user.email}
                                </div>
                                <div className={cls.item}>
                                    <span className={cls.b_text}>{t("admin:city")}: </span>
                                    {data.city}
                                </div>
                            </div>

                        </>}
                    </div>
                </>
            }
        </div>
    );
};

export default InfoOrder;
