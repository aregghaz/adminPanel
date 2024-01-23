import React from "react";

import s from "./navigationTab.module.scss";


import BackDropSearch from "../backdrop-search/backdrop-search";
import { ITabs } from "../../types/admin";
// import Upload from "-!svg-react-loader!../../images/Upload.svg";
// import Import from "-!svg-react-loader!../../images/Import.svg";
// import Filters from "-!svg-react-loader!../../images/filters.svg";

import {ReactComponent as Search} from "../../images/Search.svg";
import {ReactComponent as Close} from "../../images/Close.svg";

// import AssignVendorIcon from "-!svg-react-loader!../../images/add-company-icon.svg";
// import AssignIcon from "-!svg-react-loader!../../images/car-travel-plus-add-svgrepo-com.svg";
// // import ClaimTrip from "-!svg-react-loader!../../images/briefcase-work-business-add-svgrepo-com.svg";
// import ClaimTrip from "-!svg-react-loader!../../images/tripAdd1.svg"
// import RemoveIcon from "-!svg-react-loader!../../images/tripCansle1.svg";
// import DataPicker from "../data-picker/data-picker";


interface INavigationTab {
    handleActionMiddleware?: (id?: number, action?: string) => void,
    setfiltre?: (filtre: boolean) => void,
    onSearchInput: (event: { search: string }) => void,
    setFieldValue?: (name: string, date: string) => void,
    openSearch: () => void,
    filtre?: boolean,
    IsDateSearch?: boolean,
    isShowFiltre?: boolean,
    open: boolean,
    ids?: Array<number>,
}

const NavigationTab: React.FC<INavigationTab> = (
    {
        handleActionMiddleware,
        ids,
        openSearch,
        IsDateSearch = false,
        isShowFiltre = false,
        filtre,
        setFieldValue,
        onSearchInput,
        setfiltre,
        open
    }) => {
    // console.log(value)


    return (
        <>
            <div className={s.import_block} onClick={() => {
                openSearch();
            }}>
                <div className={s.iconAbbr}>
                    {open ? "Close" : "Search"}
                </div>
                {open ? <Close className={s.iconTest}/> : <Search className={s.iconTest}/>}
            </div>
            <div
                className={`${s.header_input_block} ${open ? s.active : s.passive}`}
            >

                <div style={{ width: "100%" }}>
                    <BackDropSearch handlerSubmit={onSearchInput} />
                </div>

            </div>

        </>
    );
};

export default NavigationTab;
