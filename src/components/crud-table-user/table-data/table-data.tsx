import React from "react";
import s from "../crud-table.module.scss";


interface ITableData {
    rowspan?: number
    colspan?: number
    className?: string,
    click?: boolean,
    item: any,
    children: any,
    handlerAction?: (action: string, id: number) => void
}

const TableData: React.FC<ITableData> = (
    {
        rowspan = 1,
        colspan = 1,
        className,
        children,
        item,
        click,
        handlerAction
    }
) => {
    return (
        <td
            className={`${s.classNameField} ${className}`}
            colSpan={colspan || 1}

            rowSpan={rowspan || 1}
            onClick={(event) => {
                console.log(event.detail, 'event.detail')
                if (event.detail === 1 && handlerAction) {
                    handlerAction("addItem", item["id"])
                } else if (event.detail === 2 && handlerAction) {
                    handlerAction("get", item["id"])
                }
            }
            }
        >
            <div>
                {children}
            </div>
        </td>
    );
};


export default TableData;
