import Flmngr from "@flmngr/flmngr-react";
import * as React from "react";
import {fakeUrl} from "../utils/getFieldLabel";
import s from "./single-file-upload/single-file-upload.module.scss";
import {ReactComponent as FileManagerSvg} from "../svgs/fileManage.svg";

Flmngr.load({
    apiKey: "FLMNFLMN",                                  // default free key
    urlFileManager: fakeUrl + '/flmngr', // demo server
    urlFiles: fakeUrl + '/storage',             // demo file storage
});

interface MyComponentProps {
    oldImage?: any;
    handleChange: any
    isMulti: boolean
}

export class FileManager extends React.Component<MyComponentProps> {
    render() {
        return <>
            {this.props.oldImage && (
                <div className={s.existingImageBlock}>
                    <img className={s.existingImage} src={this.props.oldImage}/>
                </div>
            )}
            <FileManagerSvg
                onClick={(e: { preventDefault: () => void; }) => {
                    e.preventDefault()
                    Flmngr.open({
                        isMultiple: this.props.isMulti,
                        acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp"],
                        onFinish: (files: any) => {
                            this.props.handleChange(files[0].url)
                        }
                    });

                }}
            />
            {/*<button*/}
            {/*    onClick={(e) => {*/}
            {/*        e.preventDefault()*/}
            {/*        Flmngr.open({*/}
            {/*            isMultiple: this.props.isMulti,*/}
            {/*            acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp"],*/}
            {/*            onFinish: (files: any) => {*/}
            {/*                this.props.handleChange(files[0].url)*/}
            {/*            }*/}
            {/*        });*/}

            {/*    }}*/}
            {/*>*/}
            {/*    Файловый менеджер*/}
            {/*</button>*/}
        </>
    }

}

export default FileManager