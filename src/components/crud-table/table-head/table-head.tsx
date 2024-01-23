import React from "react";
import TableRow from "../table-row/table-row";

import s from "../crud-table.module.scss";
import { useTranslation } from "react-i18next";
import {ReactComponent as ArrowDown}  from "../../../svgs/arrow-down.svg";

interface ITableHead {
    titles: Array<string>
    colspan?: number
    rowspan?: number
    titleSort: (name: string) => void,
    filterTable: string
    titleName: string
}

const TableHead: React.FC<ITableHead> = (
    {
        titles,
        colspan = 1,
        rowspan = 1,
        titleSort,
        filterTable,
        titleName
    }) => {
    const { t } = useTranslation();

    const classes = (name: string) => filterTable === "ASC" && name === titleName ? s.rotate_arrow : " ";
    const isNotActions = (title: string) => {
        if (title === "action" || title === "fields") {
            return null;
        } else {
            return <ArrowDown
                className={classes(title)}
            />;
        }
    };
    return (
        <thead className={s.tableHead}>
        <TableRow>
            {
                titles
                    .map((title, index) => {
                            return  (
                                <th
                                    onClick={() => titleSort(title)}
                                    className={` ${s.tableTd} `}
                                    key={index}
                                    colSpan={colspan || 1}
                                    rowSpan={rowspan || 1}
                                    style={{ cursor: "pointer" }}
                                >
                                    {
                                        isNotActions(title)
                                    }
                                    {t(title)}

                                </th>
                            );
                        }
                    )
            }
        </TableRow>
        </thead>
    );
};


export default TableHead;
