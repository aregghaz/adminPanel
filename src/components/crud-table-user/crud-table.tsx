import React, {useState} from "react";
import TableHead from "./table-head/table-head";
import TableBody from "./table-body/table-body";
import s from "./crud-table.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Button from "../button/button";


const CrudTable: React.FC<ICrudTable> = (
    {
        data,
        titles,
        isEdit,
        isDelete,
        isRemove,
        isInfo,
        isCreate=true,
        tableRef,
        fetchMoreData,
        handlerAction,
        action,
        selectedIds,
        // typeId
    }) => {

    const [filterTable, setFilterTable] = useState<string>("ASC");
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [titleName, setTitleName] = useState<string>("");
    const [defaultTypeId, _] = useState<number>(1);

    const titleSort = (name: string) => {
        if (name !== "action") {
            if (filterTable === "ASC") {
                setFilteredData(data.sort((a, b) => a[name] > b[name] ? 1 : -1));
                setFilterTable("DSC");
            }
            if (filterTable === "DSC") {
                setFilteredData(data.sort((a, b) => a[name] < b[name] ? 1 : -1));
                setFilterTable("ASC");
            }
            setTitleName(name);
        }
    };
    const resetOrNotTable = filteredData.length > 0 ? filteredData : data;
  //  const resetOrNotTable = data;

    return (
        <>
            {
             isCreate &&  (<div className={s.addBtnWrapper}>
                    {
                        <Button type="green" className={s.add} onClick={() => handlerAction('add', 0)}>
                            <span>+</span>
                        </Button>
                    }
                </div>)
            }
            <InfiniteScroll
                dataLength={resetOrNotTable.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={resetOrNotTable.length > 0}
                loader={''}
                height={800}
            >
                <table className={s.table} ref={tableRef}>
                    <TableHead action={action} titles={titles} titleSort={titleSort} filterTable={filterTable}
                               titleName={titleName}/>

                    <TableBody
                        data={resetOrNotTable}
                        isEdit={isEdit}
                        isInfo={isInfo}
                        isDelete={isDelete}
                        isRemove={isRemove}
                        handlerAction={handlerAction}
                        selectedIds={selectedIds ?? []}

                    />

                </table>
            </InfiniteScroll>
        </>
    );
};

interface ICrudTable {
    ////FIXME SHOULD ADD TYPE DATA
    data: Array<any>
    titles: Array<string>
    isDelete: boolean
    isEdit: boolean
    isRemove: boolean
    isCreate?: boolean
    isInfo: boolean
    action: boolean
    className: string
    handlerAction: (action: string, id: number) => void
    fetchMoreData: () => void
    /////FIXME ITS SHOULD BE REQUIRED
    selectedIds?: number[]
    tableRef: any

}

export default CrudTable;
