import React from "react";
import TableRow from "../table-row/table-row";
import TableData from "../table-data/table-data";
import {ReactComponent as TrashIcon} from "../../../images/trash.svg";
import {ReactComponent as EditIcon} from "../../../images/edit.svg";
import s from "../crud-table.module.scss";
import timestampToDate from "../../../utils/timestampToDate";
import {fakeUrl} from "../../../utils/getFieldLabel";

interface ITableBody {
    data: Array<any>
    isEdit: boolean
    isDelete: boolean,
    isGetHistory: boolean
    isGetInfo: boolean
    isPrice: boolean
    isGetItems: boolean
    handlerAction: (action: string, id: number) => void
    titles: Array<string>
}


const TableBody: React.FC<ITableBody> = (
        {
            data,
            isEdit,
            isDelete,
            isPrice,
            isGetItems,
            isGetInfo,
            isGetHistory,
            handlerAction,
            titles
        }) => {
        let count = 0;
        return (
            <tbody>

            {
                data
                    .map((item, index) => {
                        return (
                            <TableRow key={index} className={++count % 2 === 0 ? s.classNameFieldEven : ""}>
                                {
                                    (isEdit || isDelete || isGetItems || isGetHistory) &&
                                    <TableData isGetInfo={isGetInfo}>
                                        <div className={s.iconsWrapper}>
                                            {
                                                isEdit &&
                                                <div className={s.iconWrapper}>
                                                    <div className={`${s.iconLabel} ${s.iconLabelTop}`}>Изменить</div>
                                                    <EditIcon
                                                        className={s.editIcon}
                                                        onClick={() => handlerAction("edit", item.id)}
                                                    />
                                                </div>
                                            }


                                            {
                                                isDelete &&
                                                <div className={s.iconWrapper}>
                                                    <div className={s.iconLabel}>удалить</div>
                                                    <TrashIcon
                                                        className={s.trashIcon}

                                                        onClick={() => {
                                                            handlerAction("delete", item.id)
                                                        }}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </TableData>
                                }
                                {
                                    (
                                        titles
                                            .map((key, i) => {
                                                    if (key === "image") {
                                                        return (
                                                            <TableData data={item.id} key={i} isGetInfo={isGetInfo}
                                                                       handlerAction={handlerAction}
                                                            >
                                                                <img src={`${fakeUrl}${item[key]}`} width={200} height={100}
                                                                     alt={'image'}/>
                                                            </TableData>
                                                        );

                                                    } else if (key !== "action") {
                                                        ///     console.log(item[key.replace("_id", "")].title,'222222222')
                                                        return <TableData data={item.id} key={i} isGetInfo={isGetInfo}
                                                                          handlerAction={handlerAction}
                                                        >
                                                            {(item[key] ? (key !== 'updated' ? item[key] : timestampToDate(item[key])) : '---')}

                                                        </TableData>
                                                    }
                                                    return true

                                                }
                                            )
                                    )
                                }
                            </TableRow>
                        );
                    })
            }
            </tbody>
        )
            ;
    }
;


export default TableBody;
