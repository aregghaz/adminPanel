import React from "react";
import TableRow from "../table-row/table-row";

import s from "../crud-table.module.scss";
import {useTranslation} from "react-i18next";


import {ReactComponent as ArrowDown} from "../../../svgs/arrow-down.svg";

interface ITableHead {
    titles: Array<string>
    colspan?: number
    rowspan?: number
    titleSort: (name: string) => void,
    filterTable: string
    titleName: string,
    action?: boolean
}

const TableHead: React.FC<ITableHead> = (
    {
        titles,
        colspan = 1,
        rowspan = 1,
        titleSort,
        action = false,
        filterTable,
        titleName
    }) => {
    const {t} = useTranslation();
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
    var classNameField;

    return (
        <thead className={s.tableHead}>
        <TableRow>
            {(action) && <th key={222222}
                             className={s.tableTd}

                             colSpan={colspan || 1}
                             rowSpan={rowspan || 1}
            >Action
            </th>}
            {
                titles && titles
                    .map((title, index) => {
                            let classNameField = `${s.tableTd}`;
                            return title !== "id" && (
                                <th
                                    onClick={() => titleSort(title)}
                                    className={classNameField}
                                    key={index}
                                    colSpan={colspan || 1}
                                    rowSpan={rowspan || 1}
                                    style={{cursor: "pointer"}}
                                >
                                    {t(`admin:${title}`)}

                                    <span className={s.arrowSpan}>{isNotActions(title)}</span>

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
