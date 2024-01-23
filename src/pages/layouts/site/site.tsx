import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./site.module.scss";
// import { Col, Row } from "react-grid-system";
import {getUserData} from "../../../store/selectors";
import Drawer from "../../../components/drawer/drawer";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {checkLoggedIn} from "../../../store/auth";

const Site = ({children, path}: { children: React.ReactNode, path: string }) => {
    const dispatch = useDispatch();
    const {user, loggedIn} = useSelector(getUserData);
    // const [isLoading, setLoading] = useState(true);
    //
    useEffect(() => {
        (
            async () => {
                await dispatch(checkLoggedIn());
            }
        )();
    }, []);
    useEffect(() => {
        (
            async () => {

                if (user && user.count >= 0) {
                    console.log(user.count, 'user.count ');
                    ////   dispatch(actionsNotification.fetching({ count: user.count }));

                }
            }
        )();
    }, [user]);

    return loggedIn && (
        <div className={s.mainRow}>
            <div className={s.notificationDiv}>
                <ToastContainer/>
            </div>

            <Drawer>
                {/*<Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={s.mainContainer}>*/}
                {children}
                {/*</Col>*/}
            </Drawer>
        </div>
    );

};
export default Site;
