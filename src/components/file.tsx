import Flmngr from "@flmngr/flmngr-react";
import * as React from "react";
import {fakeUrl} from "../utils/getFieldLabel";

Flmngr.load({
    apiKey: "FLMNFLMN",                                  // default free key
    urlFileManager: fakeUrl + '/flmngr', // demo server
    urlFiles: fakeUrl + '/storage',             // demo file storage
});

interface ISingleFileUpload {
    oldImage?: string | any;
    oldVideo?: string;
    oldName?: string;
    onChange: (files: any) => void;
    error?: string;
    type?: string;
    label: string;
    value: any;
    name: string;
}
const FileManager: React.FC<ISingleFileUpload> = (
    {
        error,
        name,
        label,
        onChange,
        oldImage
    }) => {

    return <button
        onClick={() => {
            Flmngr.open({
                isMultiple: false,                                   // let selecting a single file
                acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp"],
                onFinish: (files) => {
                    console.log("User picked:");
                    console.log(files);
                    onChange(files)
                }
            });

        }}
    >
        Open file manager
    </button>
}

export default FileManager