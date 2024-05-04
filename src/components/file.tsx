import Flmngr from "@flmngr/flmngr-react";
import * as React from "react";
import {fakeUrl} from "../utils/getFieldLabel";

export class MyButton extends React.Component {

    render() {
        return <button
            onClick={() => {

                Flmngr.open({
                    apiKey: "FLMNFLMN",                                  // default free key
                    urlFileManager: fakeUrl+'/api/flmngr', // demo server
                    urlFiles: fakeUrl+'/storage',             // demo file storage
                    isMultiple: false,                                   // let selecting a single file
                    acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp"],
                    onFinish: (files) => {
                        console.log("User picked:");
                        console.log(files);
                    }
                });

            }}
        >
            Open file manager
        </button>
    }

}