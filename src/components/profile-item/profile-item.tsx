import React, {FC} from "react"
import cls from "./profile-item.module.scss"
import {useTranslation} from "react-i18next";

interface ProfileItemProps {
    name: string,
    data: string,
    edit: boolean,
    onFieldEdit: Function,
}

const ProfileItem:FC<ProfileItemProps> = ({
    name,
    data,
    edit,
    onFieldEdit,
}) => {
    const {t} = useTranslation();

    return (
        <div className={cls.userData}>
            <span className={cls.title}>
                {t(`admin:${name}`)}
            </span>
                {
                    edit ?
                        <input className={cls.editInput} value={data} onChange={(e) => {
                            onFieldEdit(e)
                        }}/>
                        :
                        <span className={cls.value}>{data}</span>
                }
        </div>
    )
}

export default ProfileItem
