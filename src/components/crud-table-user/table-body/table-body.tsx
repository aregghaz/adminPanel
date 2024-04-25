import React from "react";
import TableRow from "../table-row/table-row";
import TableData from "../table-data/table-data";
import {ReactComponent as TrashIcon} from "../../../images/trash.svg";
import {ReactComponent as EditIcon} from "../../../images/edit.svg";
import s from "../crud-table.module.scss";
import {fakeUrl} from "../../../utils/getFieldLabel";
import timestampToDate from "../../../utils/timestampToDate";

interface ITableBody {
    data: Array<any>
    isEdit: boolean
    isDelete: boolean
    isInfo: boolean,
    isRemove: boolean,
    handlerAction: (action: string, id: number) => void
    selectedIds: number[]

}

const TableBody: React.FC<ITableBody> = (
    {
        data,
        isEdit,
        isDelete,
        isInfo,
        isRemove,
        handlerAction,
        selectedIds,
    }) => {
    let count = 0;

    const handleError = (e: any, img: string) => {
        e.stopPropagation()
        e.target.src = img
    }
    return (
        <>
            <tbody>

            {
                data
                    .map((item, index) => {
                        const keys = Object.keys(item);
                        return keys.length > 0 && (

                            <TableRow key={index} data-rowid={item["id"]}
                                      className={`${selectedIds?.includes(item["id"]) ? s.chosen : ""} ${s.tableBColor}`}>
                                {/*className={`${s.tableBColor}`}>*/}
                                {
                                    (isEdit || isDelete || isInfo) &&
                                    <TableData item={item} key={999999} click={false}>
                                        <div className={s.iconsWrapper}>
                                            {
                                                isDelete &&
                                                <span className={`${s.tooltip} ${s.deleteSpan}`}>
                                                <span className={`${s.tooltiptext} ${s.delete}`}>удалить</span>
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
                                                    <span className={`${s.tooltiptext} ${s.edit} ${s.editLeft}`}>
                                                        Изменить
                                                    </span>
                                                    <EditIcon
                                                        className={`${s.icon} ${s.iconColor}`}
                                                        onClick={() => handlerAction("edit", item.id)}
                                                    />
                                                </span>
                                            }
                                        </div>
                                    </TableData>
                                }
                                {
                                    keys.map((key: any, i: number) => {
                                            let itemData = "";
                                         //   if (key !== 'id') {
                                                switch (key) {
                                                    case "price" || 'special_price' :
                                                        return (
                                                            <TableData key={key} item={item} className={key}
                                                                       click={isRemove}
                                                                       handlerAction={handlerAction}>
                                                                {item[key] + ' ₽'}

                                                            </TableData>)
                                                    case "image":
                                                        return (
                                                            <TableData key={key} item={item} className={key}
                                                                       click={isRemove}
                                                                       handlerAction={handlerAction}>
                                                                <img src={`${fakeUrl}${item[key]}`}
                                                                     width={200}
                                                                     height={100}
                                                                     alt={'image'}
                                                                     onError={(e: any) => {
                                                                         e.stopPropagation()
                                                                         e.currentTarget.src = "/noImage.svg"
                                                                     }}
                                                                />
                                                            </TableData>)
                                                    case "updated":
                                                        return (
                                                            <TableData key={key} item={item} className={key}
                                                                       click={isRemove}
                                                                       handlerAction={handlerAction}>
                                                                {timestampToDate(item[key])}

                                                            </TableData>)
                                                    default:
                                                        return (
                                                            <TableData key={key} item={item} className={key}
                                                                       click={isRemove}
                                                                       handlerAction={handlerAction}>
                                                                {item[key]}
                                                            </TableData>)
                                                }
                                            //}

                                            // return i !== 0 && (
                                            //     <TableData key={key} item={item} className={key} click={true}
                                            //                handlerAction={handlerAction}>
                                            //         {itemData}
                                            //
                                            //     </TableData>
                                            // );
                                        }
                                    )
                                }

                            </TableRow>
                        );
                    })
            }
            </tbody>
            {/*<DeleteServiceModal id={12} isOpen={deleteModal} handleCloseModal={() => {*/
            }
            {/*    setDeleteModal(false)*/
            }
            {/*}} handlerDeleteItem={() => {*/
            }
            {/*    handlerAction("delete", deleteId)*/
            }
            {/*}}/>*/
            }
        </>
    )
};

export default TableBody;
