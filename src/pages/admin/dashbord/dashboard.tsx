import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import s from "./dashboard.module.scss";

interface IDashboard {
    path: string;
}

const Dashboard: React.FC<IDashboard> = () => {
    const { t } = useTranslation();


    useEffect(() => {
        // (
        //     async () => {
        //         const data = await AdminApi.dashboard();
        //
        //         console.log(data, "dataaaaaa")
        //
        //         setData({
        //             profitInYear: data.profitInYear,
        //             vendorProfit: data.vendorProfit,
        //             tripCount: data.tripCount,
        //             totalProfit: data.totalProfit
        //         });
        //     }
        // )();

    }, []);
    return (
        <div className={s.root}>
            <h1>Dashboard</h1>
dsssd
        </div>
    );
};


export default Dashboard;
