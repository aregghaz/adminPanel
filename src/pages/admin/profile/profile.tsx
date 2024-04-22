import React, {FC, useEffect, useState} from "react";
import cls from "./profile.module.scss"
import ProfileItem from "../../../components/profile-item/profile-item";
import Password from "../../../components/password/password";
import Modal from "react-modal";
import {authAPI} from "../../../api/admin-api/auth-api";
import {ReactComponent as Close} from "../../../images/Close.svg";

interface VendorProfileProps {
    path?: string,
}


const VendorProfile: FC<VendorProfileProps> = ({}): React.ReactElement => {
    ///const data = useSelector(getdata).user

    const [data, setData] = useState<Array<any>>([])
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordAgain: "",
    })
    const getData = async () => {
        const token = localStorage.getItem("access_token") || "";
        const asd = await authAPI.getUser(token);
        setData(asd.data ? [
            {
                name: "fullName",
                data: `${asd.data.name} ${asd.data.lastName} ${asd.data.fatherName}`
            },
            {
                name: "email",
                data: asd.data.email
            },
            {
                name: "number",
                data: asd.data.phone,
            },
        ] : [])
        return asd.data
    }
    useEffect(() => {
         getData();

    }, [])

    const [edit, setEdit] = useState<boolean>(false)
    const [change, setChange] = useState<boolean>(false)
    const [error, setError] = useState<any>({})





    const handlePasswordInputChange = (e: any) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordChange = () => {
        setError({})
        if (password.newPassword !== password.newPasswordAgain) {
            setError({
                passwordNotMatch: true
            })
        }
    }


    return (<>
        <div className={cls.profileWrapper}>
            <div className={cls.profileContainer}>
                <div className={cls.profileImage}>
                    {/*<img src={data.image ?? "/images/logo.png"} width={220} height={150}/>*/}
                    <div className={cls.data}>
                        {/*<span className={`${cls.title} ${cls.role}`}>Role: {data.role.toLocaleLowerCase()}</span>*/}
                    </div>
                </div>
                <div className={cls.profileInfo}>
                    {
                        data && <>{
                            data.map((item, index) => {
                                return (
                                    <ProfileItem
                                        key={index}
                                        edit={edit}
                                        onFieldEdit={(e: any) => {
                                            setData([
                                                ...data.map(value => {
                                                    if (value.name === item.name) {
                                                        return {
                                                            name: item.name,
                                                            data: e.target.value
                                                        }
                                                    }
                                                    return value
                                                }),
                                            ])
                                        }}
                                        name={item.name}
                                        data={item.data}
                                    />
                                )
                            })
                        }</>
                    }

                    {
                        change && <>
                            <Modal className={cls.modalBody}
                                   isOpen={change}
                                // style={customStyles}
                                   onRequestClose={() => {
                                       setChange(false)
                                   }}>
                                <div className={cls.modalTop}>
                                    <div className={cls.closeButton} onClick={() => {
                                        setChange(false)
                                    }
                                    }>
                                        <Close />
                                    </div>


                                </div>
                                <div className={cls.passwordsContainer}>
                                    <Password
                                        name={"currentPassword"}
                                        value={password.currentPassword}
                                        onChange={handlePasswordInputChange}
                                        label={""}
                                        placeholder={"Текущий пароль"}
                                        autoComplete={"new-password"}
                                    />
                                    <Password
                                        name={"newPassword"}
                                        value={password.newPassword}
                                        onChange={handlePasswordInputChange}
                                        label={""}
                                        placeholder={"Новый пароль"}
                                        autoComplete={"new-password"}
                                    />
                                    <Password
                                        name={"newPasswordAgain"}
                                        value={password.newPasswordAgain}
                                        onChange={handlePasswordInputChange}
                                        label={""}
                                        placeholder={"Новый пароль еще раз"}
                                        autoComplete={"new-password"}
                                    />
                                    {
                                        error.passwordNotMatch && <>
                                            <p style={{color: "red"}} className={cls.text}>Пароль не соответствует</p>
                                        </>
                                    }
                                    <button onClick={handlePasswordChange} className={cls.changePasswordEnd}>
                                        изменить пароль
                                    </button>
                                </div>
                            </Modal>
                        </>
                    }

                    <div className={cls.buttonsBox}>
                        {
                            edit ? <>
                                    <button onClick={() => {
                                        setEdit(false)
                                    }}>
                                        Сохранить
                                    </button>
                                    <button className={cls.changePassword} onClick={() => {
                                        setChange(true)

                                    }
                                    }>
                                        Изменить пароль
                                    </button>
                                </>
                                :
                                <button onClick={() => {
                                    setEdit(true)
                                }}>Редактировать профиль</button>
                        }
                    </div>
                </div>

            </div>

        </div>
    </>)

}

// data.address
// data.birthday
// data.email
// data.image (es pahin chka bayc)
// data.name
// data.phone_number
// data.surname

// data.role (bayc yanm es petqa vor?) zut cuca talis admines te vendor es

export default VendorProfile
