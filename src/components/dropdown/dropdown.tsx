import React, {useState} from "react";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import Button from "../button/button";
import {ReactComponent as ArrowDown} from "../../svgs/arrow-down.svg";

import styles from "./dropdown.module.scss";
import s from "../drawer/drawer.module.scss";

interface IDropdown {
    title: string;
    children?: any;
    icon:any

}

const Dropdown: React.FC<IDropdown> = ({title,icon, children}) => {
    const {t} = useTranslation();
    const [isOpen, setOpen] = useState(false);
    const handleToggle = () => setOpen(!isOpen);

    return (
        <div className={styles.root}>
            <Button
                type="blank"
                onClick={handleToggle}
                className={styles.button}
            >
                    <span className={s.link_block}>
                             <span className={s.side_icon}>
                                     {icon}
                             </span>
                    </span>
                <span className={styles.label}>{t(`admin:${title}`)}</span>
                <span className={`${styles.arrow} ${isOpen ? styles.rotatedArrow : ""}`}>
                    <ArrowDown/>
                </span>
            </Button>
            {isOpen && <ul>{children}</ul>}
        </div>
    );
};
export default Dropdown;
Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
