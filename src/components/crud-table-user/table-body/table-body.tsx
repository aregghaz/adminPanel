import React, {useState} from "react";
import TableRow from "../table-row/table-row";
import TableData from "../table-data/table-data";
import {ReactComponent as TrashIcon} from "../../../images/trash.svg";
import {ReactComponent as EditIcon} from "../../../images/edit.svg";
import {ReactComponent as InfoIcon} from "../../../images/Users.svg";
import {ReactComponent as RemoveIcon} from "../../../images/tripCansle1.svg";
import s from "../crud-table.module.scss";
import timestampToDate from "../../../utils/timestampToDate";
import DeleteServiceModal from "../../delete-service-modal/delete-service-modal"

interface ITableBody {
    data: Array<any>
    isEdit: boolean
    isDelete: boolean
    isInfo: boolean,
    isRemove: boolean,
    handlerAction: (action: string, id: number) => void
    /// selectedIds: number[]

}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isDelete,
        isInfo,
        isRemove,
        handlerAction,
        // selectedIds,
    }) => {
    let count = 0;
    return (
        <>
            <tbody>

            {
                data
                    .map((item, index) => {
                        const keys = Object.keys(item);
                        return keys.length > 0 && (

                            <TableRow key={index} data-rowid={item["id"]}
                                /// className={`${selectedIds?.includes(item["id"]) ? s.chosen : ""} ${s.tableBColor}`}>
                                      className={`${s.tableBColor}`}>
                                {
                                    (isEdit || isDelete || isInfo) &&
                                    <TableData item={item} key={999999} click={false}>
                                        <div className={s.iconsWrapper}>
                                            {
                                                isDelete &&
                                                <span className={`${s.tooltip} ${s.deleteSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.delete}`}>Delete</span>
                                            <TrashIcon
                                                className={s.icon}
                                                onClick={() => {
                                                    handlerAction("delete", item.id)
                                                }}
                                            />
                                            </span>
                                            }
                                            {
                                                isEdit &&
                                                <span className={`${s.tooltip} ${s.editSpan}`}>
                                            <span className={`${s.tooltiptext} ${s.edit} ${s.editLeft}`}>Edit</span>
                                            <EditIcon
                                                className={`${s.icon} ${s.iconColor}`}
                                                onClick={() => handlerAction("edit", item.id)}
                                            />
                                            </span>
                                            }
                                            {/*{isRemove &&*/}
                                            {/*    <span className={`${s.tooltip} ${s.reRouteSpan}`}>*/}
                                            {/*<span className={`${s.tooltiptext} ${s.reRoute}`}>ReRoute</span>*/}
                                            {/*<RemoveIcon*/}
                                            {/*    className={s.icon}*/}
                                            {/*    onClick={() => handlerAction("reRoute", item.id)}*/}
                                            {/*/>*/}
                                            {/*      </span>*/}
                                            {/*}*/}

                                        </div>
                                    </TableData>
                                }
                                {
                                    keys.map((key: any, i: number) => {
                                            let itemData = "";
                                            switch (key) {
                                                case "car_id":
                                                    itemData = item["car_id"] != null ? item["car_name"] : "";
                                                    break;
                                                case "duration_id":
                                                    itemData = item[key] + " minute";
                                                    break;
                                                case "miles":
                                                    itemData = item[key] + " mile";
                                                    break;
                                                case "price":
                                                    itemData = item[key] + '₽';
                                                    break;
                                                case "date_of_service":
                                                    itemData = timestampToDate(item[key]);
                                                    break;
                                                case "birthday":
                                                    itemData = timestampToDate(item[key]);
                                                    break;
                                                default:
                                                    itemData = item[key];
                                            }

                                            return i !== 0 && key !== "car_name" && (
                                                <TableData key={key} item={item} className={key} click={true}
                                                           handlerAction={handlerAction}>
                                                    {itemData}

                                                </TableData>
                                            );
                                        }
                                    )
                                }

                            </TableRow>
                        );
                    })
            }
            </tbody>
            {/*<DeleteServiceModal id={12} isOpen={deleteModal} handleCloseModal={() => {*/}
            {/*    setDeleteModal(false)*/}
            {/*}} handlerDeleteItem={() => {*/}
            {/*    handlerAction("delete", deleteId)*/}
            {/*}}/>*/}
        </>
    );
};


export default TableBody;
