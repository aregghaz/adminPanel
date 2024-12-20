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

// import AssignVendorIcon from "../../images/add-company-icon.svg";
// import AssignIcon from "../../images/car-travel-plus-add-svgrepo-com.svg";
// // import ClaimTrip from "../../images/briefcase-work-business-add-svgrepo-com.svg";
// import ClaimTrip from "../../images/tripAdd1.svg"
// import RemoveIcon from "../../images/tripCansle1.svg";
// import DataPicker from "../data-picker/data-picker";
import {ReactComponent as Tags} from "../../svgs/tags.svg";
import {ReactComponent as StatusSvg} from "../../svgs/status.svg";
import {ReactComponent as Ruble} from "../../svgs/ruble.svg";
import {ReactComponent as Remove} from "../../svgs/remove.svg";
import SelectGroup from "../select/selectGroup";
import {IOption} from "../select/select";


interface INavigationTab {
    // onSearchInput: (event: { search: string }) => void,
///    openSearch: () => void,
    open: boolean,
    isDelete?: boolean,
    IsAssignPrice?: boolean,
    IsAssignTag?: boolean,
    IsRemovePrice?: boolean,
    IsAssignStatus?: boolean,
    IsSelectCategory?: boolean,
    tableRef: any,
    setQuery: any,
    setLoading: any,
    loading: any,
    setOpen: any,
    category?: any,
    selectedCategory?: any,
    handlerAction: (action: string) => void;
    setFieldValue?: (action: string, dataValue: any) => void;

}

const NavigationTab: React.FC<INavigationTab> = (
    {

        tableRef,
        setQuery,
        setLoading,
        loading,
        setOpen,
        IsAssignPrice,
        IsRemovePrice,
        IsSelectCategory = false,
        handlerAction,
        selectedCategory,
        setFieldValue,
        category = [],
        isDelete = true,
        IsAssignTag = false,
        IsAssignStatus = false,
        open
    }) => {
    const openSearch = () => {
        if (open) {
            setQuery("");
            setLoading(!loading)
        }
        setOpen(!open);
    };
    const onSearchInput = async (event: { search: string }) => {
        setQuery(event.search);
        setLoading(!loading)
    };
    return (
        <div style={{display: "flex", flexDirection: 'row'}}>
            <div style={{display: "flex", gap: "20px", padding: 20}}>
                {isDelete && <div className={s.import_block} onClick={() => handlerAction('groupDelete')}>
                    <div className={s.iconAbbr}>
                        удалить
                    </div>
                    <TrashIcon
                        height="24px"
                        className={` ${s.iconTest} `}
                    />
                </div>}
                {IsAssignTag && <div className={s.import_block} onClick={() => handlerAction("addTag")}>
                    <div className={s.iconAbbr}>
                        добавить метку
                    </div>
                    <Tags
                        // style={{fill:'#3F7AAD'}}
                        className={` ${s.iconTest} `}
                    />
                </div>}
                {IsAssignStatus && <div className={s.import_block} onClick={() => handlerAction("changeStatus")}>
                    <div className={s.iconAbbr}>
                        изменить статус
                    </div>
                    <StatusSvg
                        // style={{fill:'#3F7AAD'}}
                        className={` ${s.iconTest} `}
                    />
                </div>}
                {IsAssignPrice && <div className={s.import_block} onClick={() => handlerAction("assignPrice")}>
                    <div className={s.iconAbbr}>
                        назначить цену
                    </div>
                    <Ruble
                        // style={{fill:'#3F7AAD'}}
                        className={` ${s.iconTest} `}
                    />
                </div>}
                {IsRemovePrice && <div className={s.import_block} onClick={() => handlerAction("removePrice")}>
                    <div className={s.iconAbbr}>
                        удалить цену
                    </div>
                    <Remove
                        // style={{fill:'#3F7AAD'}}
                        className={` ${s.iconTest} `}
                    />
                </div>}


                <div className={s.import_block}>
                    <div className={s.iconAbbr}>
                        скачать Excel
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
                <div className={s.search_block} >
                    <div className={s.search_block_icon} onClick={() => {
                        openSearch();
                    }}>
                        {open ? <Close className={s.iconTest}/> : <Search className={s.iconTest}/>}
                    </div>

                    <div
                        className={`${s.header_input_block} ${open ? s.active : s.passive}`}
                    >
                        <div style={{width: "100%"}}>
                            <BackDropSearch handlerSubmit={onSearchInput}/>
                        </div>
                    </div>
                </div>
                {IsSelectCategory && setFieldValue && <div style={{minWidth:250, maxWidth:700}} >
                    <SelectGroup
                        value={selectedCategory}
                        getOptionValue={(option: IOption) => option.value}
                        getOptionLabel={(option: IOption) => option.label}
                        options={category}
                        onChange={(option: IOption) => setFieldValue('SelectGroup', option)}
                        label={''}
                        isSearchable={true}
                        name={'SelectGroup'}
                        isMulti={false}
                        placeholder={''}
                        allowValueClear={true}

                    />
                </div>
                }
            </div>

        </div>
    );
};

export default NavigationTab;
