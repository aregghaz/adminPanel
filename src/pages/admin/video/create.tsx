import React from "react";
import {useTranslation} from "react-i18next";
import Create from "../../layouts/templates/create/create";



interface IUserCreate {
    path: string;
}


const VideoCreate: React.FC<IUserCreate> = () => {
    const {t} = useTranslation();
    const crudKey = "video";
    const fields: Array<any> = [
        {name: "title", type: "input", label: "title", placeholder: "title"},
        {name: 'video', type: 'input', label: 'video'},
    ];

    const requiredFields = [
        "title",
        "video",
    ];

    return <Create
        crudKey={crudKey}
        fields={fields}
        requiredFields={requiredFields}
        title={""}
        children={t("create")}
        selectRange
    />;

};

export default VideoCreate;
