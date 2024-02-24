import React, {useEffect, useRef, useState} from "react";
import Button from "../button/button";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "@reach/router";
import s from "./drawer.module.scss";
import {ReactComponent as Bars} from "../../images/Bars.svg";
import {ReactComponent as Close} from "../../images/Close.svg";
import {ReactComponent as Account} from "../../images/User.svg";
import {ReactComponent as Logout} from "../../images/SignOut.svg";
import {ReactComponent as ProfileSvg} from "../../images/profile1.svg";
import {ReactComponent as ProductIcon} from "../../svgs/product-icon.svg";
import {ReactComponent as Category} from "../../svgs/category.svg";
import {ReactComponent as HomeIcon} from "../../images/my-services.svg";
import {ReactComponent as Status} from "../../images/Settings.svg";
import {ReactComponent as CompanyIcon} from "../../svgs/company.svg";
import {ReactComponent as LogoSvg} from "../../svgs/logo.svg";
import {ReactComponent as Slider} from "../../svgs/slider.svg";
import {ReactComponent as Video} from "../../svgs/video.svg";
import {ReactComponent as News} from "../../svgs/news.svg";
import {ReactComponent as Banners} from "../../svgs/banners.svg";
import {ReactComponent as Brends} from "../../svgs/brends.svg";
import {ReactComponent as Tags} from "../../svgs/tags.svg";


const Drawer = ({children}: { children: React.ReactNode }) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const logoutRef: any = useRef(null);
    const accountRef: any = useRef(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openAccountMenu = () => setMenuOpen(!menuOpen);
    const openSideBar = () => setIsOpen(!isOpen);
    const outsideClickHandler = (e: MouseEvent) => {
        if (logoutRef.current && !logoutRef.current.contains(e.target) && !accountRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    let selectedPage = parseFloat(localStorage.getItem("page") || "1");
    useEffect(() => {
        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, [logoutRef]);


    const menuItemsFirst: any = [
        {
            id: 1,
            item: "home",
            page: '/',
            icon: <HomeIcon/>
        }, {
            id: 2,
            item: "Продукты",
            page: '/products',
            icon: <ProductIcon/>
        }, {
            id: 3,
            item: "Категории",
            page: '/categories',
            icon: <Category/>
        }, {
            id: 4,
            item: "Атрибуты",
            page: '/attributes',
            icon: <Status/>
        }, {
            id: 5,
            item: "Бренды",
            page: '/brands',
            icon: <Brends/>
        }, {
            id: 6,
            item: "Клиенты",
            page: '/users',
            icon: <CompanyIcon/>
        }, {
            id: 7,
            item: "Баннеры",
            page: '/banners',
            icon: <Banners/>
        }, {
            id: 8,
            item: "Новости",
            page: '/news',
            icon: <News/>
        }, {
            id: 9,
            item: "Видеоблог",
            page: '/video',
            icon: <Video/>
        }, {
            id: 10,
            item: "Слайдер",
            page: '/sliders',
            icon: <Slider/>
        }, {
            id: 11,
            item: "tags",
            page: '/tags',
            icon: <Tags/>
        }
    ];

    const setActiveIcon = (pageId: number) => {
        localStorage.setItem("page", `${pageId}`);
    };
    return (
        <>
            <nav className={s.header_nav}>
                <div className={s.navWrapper}>
                    <div className={s.icons}>
                        <div className={s.logoSection}>
                            <div className={s.logoDiv}>
                                <LogoSvg/>
                            </div>
                        </div>
                        <div className={s.header_icons_block}>
                            <div className={s.iconBlock} ref={accountRef}>
                                <Button
                                    type={"blank"}
                                    onClick={() => {
                                        console.log(menuOpen);
                                        openAccountMenu();
                                    }}
                                >
                                <span className={s.icon}>
                                    <Account/>
                                </span>
                                </Button>
                                {
                                    menuOpen &&
                                    <div className={s.account_drop_menu} ref={logoutRef}>
                                        <div>
                                            <Button
                                                className={s.logOutButton}
                                                type={"blank"}
                                                onClick={() => {
                                                    navigate("/profile");
                                                    openAccountMenu();
                                                }}
                                            >
                                                <span className={s.icon}>
                                                    <ProfileSvg/>
                                                </span>
                                                <span className={s.iconLabel}>
                                                    Profile
                                                </span>
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                className={s.logOutButton}
                                                type={"blank"}
                                                onClick={() => {
                                                    // handlerLogOut();
                                                    navigate("/login");
                                                }}
                                            >
                                                <span className={s.icon}>
                                                    <Logout/>
                                                </span>
                                                <span className={s.iconLabel}>
                                                    Log out
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
            <div className={s.content_part}>
                <nav className={s.main} style={isOpen ? {width: "200px"} : {width: "50px"}}>
                    <div
                        key={"home"}
                        className={s.iconBlock}
                        style={{padding: "10px 12px"}}
                    >
                        <Button
                            type={"blank"}
                            onClick={openSideBar}
                        >
                                <span className={s.icon}>
                                    {isOpen ? <Close/> : <Bars/>}
                                </span>
                        </Button>
                    </div>
                    <ul className={s.list}>
                        {
                            menuItemsFirst
                                .map((li: any) => (
                                        <li className={s.item} key={`first-${li.item}`}>
                                            <Link
                                                to={li.page}
                                                className={`${s.link} ${selectedPage === li.id ? s.active_icon : s.passive_icon}`}
                                                onClick={() => setActiveIcon(li.id)}
                                            >
                                                <span className={s.link_block}>
                                                    <span className={s.side_icon}>
                                                    {li.icon}
                                                </span>
                                                    <span className={s.side_text}>
                                                        {t(li.item)}
                                                    </span>
                                                </span>

                                            </Link>
                                        </li>
                                    )
                                )
                        }
                    </ul>
                </nav>
                <div className={s.main_content}
                     style={!isOpen ? {maxWidth: "calc(100% - 50px)"} : {maxWidth: "calc(100% - 200px)"}}>
                    {children}
                </div>
            </div>
        </>
    );
};


export default Drawer;
