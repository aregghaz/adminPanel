import Flmngr from "@flmngr/flmngr-react";
import * as React from "react";
import {fakeUrl} from "../utils/getFieldLabel";

Flmngr.load({
    apiKey: "FLMNFLMN",                                  // default free key
    urlFileManager: fakeUrl+'/flmngr', // demo server
    urlFiles: fakeUrl+'/storage',             // demo file storage
});
interface MyComponentProps {
    num?: number;
    handleChange:any
}
export class FileManager extends React.Component<MyComponentProps> {
    constructor(props:any) {
        super(props);
        // Don't call this.setState() here!
        this.state = { counter: 0 };
        ///const {handleChange} = this.props;
      ///  console.log(handleChange)
    }
    render() {
console.log(this.props)
        return <button
            onClick={(e) => {
                e.preventDefault()
                Flmngr.open({
                    isMultiple: false,                                   // let selecting a single file
                    acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp"],
                    onFinish: (files:any) => {
                        console.log("User picked:");
                        console.log(files);
                        this.props.handleChange(files)
                    }
                });

            }}
        >
            Open file manager
        </button>
    }

}

export  default FileManager