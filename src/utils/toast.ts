import {toast} from "react-toastify";
///import { useTranslation } from "react-i18next";

const toastNotification = (text: string, type: number) => {
    let notificationType;
    /// const { t } = useTranslation();
    switch (type) {
        case 1:
            notificationType = toast.TYPE.ERROR;
            break;
        case 2:
            notificationType = toast.TYPE.SUCCESS;
            break;
    }

    const options = {
        type: notificationType,
        position: toast.POSITION.TOP_RIGHT
    };

    return toast(text, options);
};

export default toastNotification;

