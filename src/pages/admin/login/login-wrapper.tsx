import React, {useEffect, useState} from "react";
import Button from "../../../components/button/button";
import {useTranslation} from "react-i18next";
import {Formik, FormikHelpers, FormikValues} from "formik";
import Input from "../../../components/input/input";

import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../../store/selectors";
import {navigate} from "@reach/router";
import Password from "../../../components/password/password";
import {ReactComponent as LogoSvg} from "../../../svgs/logo.svg";

import s from "./login-wrapper.module.scss";
import validationRules from "../../../utils/validationRule";
import {IItem} from "../../layouts/templates/formik-handler/formik-handler";
import {actions} from "../../../store/auth";
import {authAPI} from "../../../api/admin-api/auth-api";
import axios from "axios";

// import cls from "../../../components/password/password.module.scss";


interface ILoginWrapper {
    path: string;
}


const LoginWrapper: React.FC<ILoginWrapper> = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
 ///   const navigate = useNavigate();
    const {user} = useSelector(getUserData);
    const [isLoading, setLoading] = useState(false);
    const [userFound, setUserFound] = useState(true);
    const submit = async (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {
        setSubmitting(true);
        const formData: FormData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        const response = await authAPI.login(formData);

        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;

        if (response.status === 200) {
            if (response.data) {
                dispatch(actions.setLoggedIn(response.data.access_token));
                localStorage.setItem("access_token", response.data.access_token);
                try {
                    const user = await authAPI.getUser(response.data.access_token);
                    dispatch(actions.setUser(user));
                } catch (e) {
                    console.error(e);
                }

                // await getUserData()
            }
        }
        setLoading(true);
        setUserFound(!!user)
    };

    const fields: Array<IItem> = [
        {name: "email", inputType: '', type: "input", label: "trip_type"},
        {name: "password", inputType: '', type: "password", label: "daysOnWeek"},
    ];

    const requiredFields = [
        "email",
        "password"
    ]

    const validate = (values: FormikValues) => validationRules(values, requiredFields, fields, t);

    useEffect(() => {
        if (user) {
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/login");
        }
    }, [user]);
    return (<>

            <div className={s.login}>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    } as FormikValues}
                    onSubmit={submit}
                    validate={(values: FormikValues) => validate(values)}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({values, errors, handleSubmit, handleChange}) => (
                        <form id={"form"} onSubmit={handleSubmit} className={s.form}>
                            {/*<h3> {t("login")} </h3>*/}
                            <div className={s.logoDiv}>
                                <LogoSvg/>
                            </div>
                            <div style={{position: "relative"}}>
                                <Input
                                    label={t("admin:email")}
                                    placeholder={t("admin:email")}
                                    name={"email"}
                                    type={"text"}
                                    inLogin={true}
                                    onChange={handleChange}
                                    value={values.email}
                                    error={errors["email"]}
                                />
                            </div>
                            {/*<Input*/}
                            {/*    label={t("password")}*/}
                            {/*    name={"password"}*/}
                            {/*    type={"password"}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    value={values.password}*/}
                            {/*/>*/}
                            <Password
                                name={"password"}
                                value={values.password}
                                placeholder={t("admin:password")}
                                // className={cls.passwordWrapper}
                                onChange={handleChange}
                                label={t("admin:password")}
                                error={errors["password"]}
                            />
                            {!userFound && <span className={s.userNotFound}>Email or password are incorrect</span>}
                            <div className={s.actions}>
                                <Button isSubmit type={"green"} onClick={handleSubmit}>{t("admin:sign_in")}</Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};
export default LoginWrapper;
