import React from "react";
import TableRow from "../table-row/table-row";
import TableData from "../table-data/table-data";
import {ReactComponent as TrashIcon} from "../../../images/trash.svg";
import {ReactComponent as EditIcon} from "../../../images/edit.svg";
import {ReactComponent as UsersIcon} from "../../../images/Users.svg";
import s from "../crud-table.module.scss";
import timestampToDate from "../../../utils/timestampToDate";

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
                                                    <div className={`${s.iconLabel} ${s.iconLabelTop}`}>Edit</div>
                                                    <EditIcon
                                                        className={s.editIcon}
                                                        onClick={() => handlerAction("edit", item.id)}
                                                    />
                                                </div>
                                            }
                                            {
                                                isGetItems &&
                                                <div className={s.iconWrapper}>
                                                    <div className={s.iconLabel}>Users</div>
                                                    <UsersIcon
                                                        className={`${s.editIcon} ${s.userEditIcon}`}
                                                        onClick={() => handlerAction("getVendorUser", item.id)}
                                                    />
                                                </div>
                                            }

                                            {
                                                isDelete &&
                                                <div className={s.iconWrapper}>
                                                    <div className={s.iconLabel}>Delete</div>
                                                    <TrashIcon
                                                        className={s.trashIcon}

                                                        onClick={() => {
                                                            handlerAction("delete", item.id)
                                                            console.log("aa")
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
                                                                <img src={item[key]} alt=""/>
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
