import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import s from "./dashboard.module.scss";
import {AdminApi} from "../../../api/admin-api/admin-api";
import timestampToDate from "../../../utils/timestampToDate";

interface IDashboard {
    path: string;
}

const Dashboard: React.FC<IDashboard> = () => {
    const {t} = useTranslation();
    const [data, setData] = useState([])

    useEffect(() => {
        (
            async () => {
                const data2 = await AdminApi.dashboard();

                setData(data2.orders)
                // setData({
                //     profitInYear: data.profitInYear,
                //     vendorProfit: data.vendorProfit,
                //     tripCount: data.tripCount,
                //     totalProfit: data.totalProfit
                // });
            }
        )();

    }, []);

    const titles = [
        'name',
        'status',
        'created',
        'price'
    ]
    const handlerAction = async (action: string, id?: number) => {
    };
    return (
        <div className={s.root}>
            <h1>Панель управления</h1>
            <div className={s.latest_div}>
                <h3>Последние заказы</h3>
                <div className={s.latest_div_item}>
                    <div className={s.lates_div_id}>
                        #
                    </div>
                    <div>
                        {t('admin:buyer')}
                    </div>
                    <div>
                        {t('admin:status')}
                    </div>
                    <div>
                        {t('admin:total')}
                    </div>
                    <div>
                        {t('admin:updated')}
                    </div>

                </div>
                {
                    data.map((item:any) => {
                        return (<div className={s.latest_div_item}>
                            <div className={s.lates_div_id}>
                                {item.id}
                            </div>
                            <div>
                                {item.name}
                            </div>
                            <div>
                                {item.status}
                            </div>
                            <div>
                                {item.total}
                            </div>
                            <div>
                                {timestampToDate(item.updated)}
                            </div>

                        </div>)
                    })
                }
            </div>
        </div>
    );
};


export default Dashboard;
