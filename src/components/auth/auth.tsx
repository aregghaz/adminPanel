import React from "react";
import Modal from "react-modal";
import SignIn from "./sign-in";

import { AuthMode } from "../../constants/helpers";
import SuccessModal from "./success-modal";

import s from "./auth.module.scss";

Modal.setAppElement("body");

const customStyles: any = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "auto",
        outline: "none",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)"
    },
    overlay: {
        WebkitBackdropFilter: "initial",
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(5px)"
    }
};

const customStylesMobile: any = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "auto",
        outline: "none",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)",
        height: "100%",
        width: "100%"
    },
    overlay: {
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(18px)"
    }
};

const customStyleSuccessModal: any = {
    content: {
        position: "fixed",
        border: "none",
        overflowY: "auto",
        outline: "none",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)"
    },
    overlay: {
        WebkitBackdropFilter: "blur(18px)",
        zIndex: 400,
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(18px)"
    }
};

interface IAuth {
    activeAuthPage: AuthMode;
    handlerCloseModal: () => void;
    handlerRegister: () => void;
    handlerAlreadyRegistered: () => void;
    handlerSuccessModal: () => void;
    handlerForgetPassword: () => void;
}

const Auth: React.FC<IAuth> = (
    {
        activeAuthPage,
        handlerCloseModal,
        handlerRegister,
        handlerAlreadyRegistered,
        handlerSuccessModal,
        handlerForgetPassword
    }) => {

    return (
        <>

                <Modal
                    isOpen={activeAuthPage !== AuthMode.modalClose}
                    style={customStyles}
                    className={`${activeAuthPage === AuthMode.register ? s.modalRegister : s.modalSignIn}`}
                    onRequestClose={handlerCloseModal}
                >
                    <div className={s.iconWrapper}>
                        <i className="cancelicon-"
                           onClick={handlerCloseModal}
                        />
                    </div>
                    <div className={s.modalContent}>
                        {
                            activeAuthPage === AuthMode.login &&
                            <SignIn
                                handlerRegister={handlerRegister}
                                handlerForgetPassword={handlerForgetPassword}
                                handlerCloseModal={handlerCloseModal}
                            />
                        }

                        {
                            activeAuthPage === AuthMode.successMessage &&
                            <SuccessModal />
                        }
                    </div>
                </Modal>


                <Modal
                    isOpen={activeAuthPage !== AuthMode.modalClose}
                    style={activeAuthPage === AuthMode.successMessage ?
                        customStyleSuccessModal : customStylesMobile}
                    className={`${activeAuthPage === AuthMode.successMessage ?
                        s.modalSuccess : s.modalMobileAuth}`}
                    onRequestClose={handlerCloseModal}
                >
                    <div className={`${activeAuthPage === AuthMode.successMessage ?
                        s.successModalIconWrapper : s.iconWrapper}`}>
                        <i className="cancelicon-"
                           onClick={handlerCloseModal}
                        />
                    </div>
                    <div className={s.modalContent}>
                        {
                            activeAuthPage === AuthMode.login &&
                            <SignIn
                                handlerRegister={handlerRegister}
                                handlerForgetPassword={handlerForgetPassword}
                                handlerCloseModal={handlerCloseModal}
                            />
                        }

                        {
                            activeAuthPage === AuthMode.successMessage &&
                            <SuccessModal />
                        }
                    </div>
                </Modal>

        </>
    );
};

export default Auth;
