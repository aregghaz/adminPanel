import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import cls from "./info-block.module.scss";


interface IProps {
    data: any,
}


const InfoBlock: FC<IProps> = ({ data }) => {
    /// const infoData: any = items.find(item => item.id === idData);

    const { t } = useTranslation();


    return (
        <div className={cls.block}>
            {
                data &&
                <>
                    <div className={cls.itemsRow}>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:names")}: </span>
                            {data.name}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:lastName")}: </span>
                            {data.lastName}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:phone")}: </span>
                            {data.phone}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:email")}: </span>
                            {data.email}
                        </div>
                    </div>

                    <div className={cls.itemsRow}>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:company")}: </span>
                            {data.company}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:ihh")}: </span>
                            {data.ihh}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:kpp")}: </span>
                            {data.kpp}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:bik")}: </span>
                            {data.bik}
                        </div>

                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:pc")}: </span>
                            {data.pc}
                        </div>
                        <div className={cls.item}>
                            <span className={cls.b_text}>{t("admin:address")}: </span>
                            {data.address}
                        </div>
                    </div>
                    <div className={cls.item}>
                        <span className={cls.b_text}>{t("admin:notes")}: </span>
                        {data.notes}
                    </div>
                </>
            }
        </div>
    );
};

export default InfoBlock;
