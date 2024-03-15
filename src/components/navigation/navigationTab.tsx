import React from "react";

import s from "./navigationTab.module.scss";
////import Tabs from "../tabs/tabs";
import {DownloadTableExcel} from "react-export-table-to-excel";
import BackDropSearch from "../backdrop-search/backdrop-search";
// import Upload from "../../images/Upload.svg";
import {ReactComponent as Import} from "../../images/Import.svg";
// import Filters from "../../images/filters.svg";
import {ReactComponent as Search} from "../../images/Search.svg";
import {ReactComponent as Close} from "../../images/Close.svg";
import {ReactComponent as TrashIcon} from "../../images/trash.svg";
import {ReactComponent as AssignIcon} from "../../images/car-travel-plus-add-svgrepo-com.svg";

// import AssignVendorIcon from "../../images/add-company-icon.svg";
// import AssignIcon from "../../images/car-travel-plus-add-svgrepo-com.svg";
// // import ClaimTrip from "../../images/briefcase-work-business-add-svgrepo-com.svg";
// import ClaimTrip from "../../images/tripAdd1.svg"
// import RemoveIcon from "../../images/tripCansle1.svg";
// import DataPicker from "../data-picker/data-picker";


interface INavigationTab {
    // onSearchInput: (event: { search: string }) => void,
///    openSearch: () => void,
    open: boolean,
    isDelete?: boolean,
    IsAssignTag?: boolean,
    tableRef: any,
    setQuery: any,
    setLoading: any,
    loading: any,
    setOpen: any,
    handlerAction: (action: string) => void;

}

const NavigationTab: React.FC<INavigationTab> = (
    {

        tableRef,
        setQuery,
        setLoading,
        loading,
        setOpen,
        handlerAction,
        isDelete = true,
        IsAssignTag = true,
        open
    }) => {
    const openSearch = () => {
        if (open) {
            setQuery("");
            setLoading(true);
        }
        setOpen(!open);
    };
    const onSearchInput = async (event: { search: string }) => {
        setQuery(event.search);
        setLoading(!loading)
        ///    await getClientData(event.search, date);
    };
    return (
        <div style={{display: "flex", flexDirection: 'row'}}>
            <div style={{display: "flex", gap: "10px", padding: 20}}>
                {isDelete && <div className={s.import_block} onClick={() => handlerAction('groupDelete')}>
                    <div className={s.iconAbbr}>
                        удалить
                    </div>
                    <TrashIcon
                        height="24px"
                        //  className={}
                    />
                </div>}
                {/*{isClaimTrip && <div className={s.import_block}>*/}
                {/*    <div className={s.iconAbbr}>*/}
                {/*        Claim Trip*/}
                {/*    </div>*/}
                {/*    <ClaimTrip*/}
                {/*        className={`${s.icon} ${s.iconClime} ${typeId === 1 || typeId === 4 || typeId === 5 || typeId === 6 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}*/}
                {/*        onClick={() => handleActionMiddleware(1, "default")}*/}
                {/*    />*/}
                {/*</div>}*/}
                {/*{isReRoute && <div className={s.import_block}>*/}
                {/*    <div className={s.iconAbbr}>*/}
                {/*        ReRoute*/}
                {/*    </div>*/}
                {/*    <RemoveIcon*/}
                {/*        className={`${s.icon} ${s.iconClime} ${typeId === 2 || typeId === 4 || typeId === 5 || typeId === 6 || ids.length == 0 ? s.disabled_action : s.enabled_action}`}*/}
                {/*        onClick={() => handleActionMiddleware(4, "reRoute")}*/}
                {/*    />*/}
                {/*</div>}*/}
                {IsAssignTag && <div className={s.import_block}>
                    <div className={s.iconAbbr}>
                        Assign Car
                    </div>
                    <AssignIcon
                        className={`${s.icon} ${s.iconCar} `}
                        onClick={() => handlerAction( "addTag")}
                    />
                </div>}
                {/*{isShowFiltre && <div className={s.import_block}>*/}
                {/*    <div className={s.iconAbbr}>*/}
                {/*        Filters*/}
                {/*    </div>*/}
                {/*    <Filters height="24px" onClick={showFilter} className={s.iconTest}/>*/}
                {/*</div>}*/}

                <div className={s.import_block}>
                    <div className={s.iconAbbr}>
                        Download Excel
                    </div>
                    <label htmlFor="downloadTableExcel">
                        <DownloadTableExcel
                            filename="users table"
                            sheet="users"
                            currentTableRef={tableRef.current}
                        >
                            <Import/>
                        </DownloadTableExcel>
                    </label>
                </div>
                <div className={s.import_block} onClick={() => {
                    openSearch();
                }}>
                    <div className={s.iconAbbr}>
                        {open ? "Close" : "Search"}
                    </div>
                    {open ? <Close className={s.iconTest}/> : <Search className={s.iconTest}/>}
                </div>
            </div>
            <div
                className={`${s.header_input_block} ${open ? s.active : s.passive}`}
            >
                <div style={{width: "100%"}}>
                    <BackDropSearch handlerSubmit={onSearchInput}/>
                </div>
            </div>
        </div>
    );
};

export default NavigationTab;
