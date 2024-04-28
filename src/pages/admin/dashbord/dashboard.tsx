import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import s from "./dashboard.module.scss";
import {AdminApi} from "../../../api/admin-api/admin-api";
import timestampToDate from "../../../utils/timestampToDate";

interface IDashboard {
    path: string;
}

const Dashboard: React.FC<IDashboard> = () => {
    const {t} = useTranslation();
    const [data, setData] = useState([])
    const [yearProfit, setYearProfit] = useState<Array<{ name: string; amount: number }>>([])
    const [monthOrderCount, setMonthOrderCount] = useState<Array<{ name: string; complete: number, decline: number }>>([])
    const chartData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: -3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: -2000,
            pv: -9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: -1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: -3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const month = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];

    useEffect(() => {
        (
            async () => {
                const data2 = await AdminApi.dashboard();
                const firstChart = await AdminApi.yearProfit();
                const secondChart = await AdminApi.orderCount();
                const chart: { name: string; amount: number; }[] = [];
                const chartSecond: { name: string; complete: number; decline: number }[] = [];
                month.map((item, index) => {
                    const find = firstChart.find((item: { month: number, amount: number }) => item.month === index)
                    const findSecond = secondChart.filter((item: { month: number, status: number, count: number }) => item.month === index)
                    chartSecond[index] = {name: item, complete: 0, decline: 0}
                    if (findSecond && findSecond.length > 0) {

                        findSecond.map((findItem: any) => {
                            console.log(findItem, 'findItem')

                            if (findItem.status === 4) {
                                chartSecond[index].name = item
                                chartSecond[index].complete = findItem ? findItem.count : 0;

                            } else {
                                chartSecond[index].name = item
                                chartSecond[index].decline = findItem ? -findItem.count : 0;

                            }
                            return true
                        })
                    }

                    return chart.push({
                        name: item,
                        amount: find ? find.pv : 0,

                    })
                })
                console.log(chartSecond, 'chart')
                setMonthOrderCount(chartSecond)
                setData(data2.orders)
                setYearProfit(chart)
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
            <div>
                <h1>Панель управления</h1>
            </div>
            <div className={s.mount_price}>
                {
                    (yearProfit.length > 0 && <ResponsiveContainer>
                        <BarChart
                            width={900}
                            height={500}
                            data={yearProfit}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={20}
                        >
                            <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Bar dataKey="amount" fill="#8884d8" background={{fill: '#eee'}}/>
                        </BarChart>
                    </ResponsiveContainer>)
                }
            </div>

            <div className={s.latest_div}>
                <div className={s.inner_div}>
                    <ResponsiveContainer>
                        <BarChart
                            width={900}
                            height={500}
                            data={monthOrderCount}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <ReferenceLine y={0} stroke="#000"/>
                            <Bar dataKey="complete" fill="#82ca9d"/>
                            <Bar dataKey="decline" fill="#D63D3D"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={s.inner_div}>
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
                        data.map((item: any) => {
                            return (<div className={`${s.latest_div_item} ${item.status_id == 4 ? s.done_order:''}`}>
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
                                    {item.total} ₽
                                </div>
                                <div>
                                    {timestampToDate(item.updated)}
                                </div>

                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
