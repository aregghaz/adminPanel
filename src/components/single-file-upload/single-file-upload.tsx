import React, {useState} from "react";
import s from "./single-file-upload.module.scss";
import {ReactComponent as ButtonSVg} from "../../images/button.svg";


interface ISingleFileUpload {
    oldImage?: string | any;
    oldVideo?: string;
    oldName?: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    error?: string;
    type?: string;
    label: string;
    value: any;
    name: string;
}

const SingleFileUpload: React.FC<ISingleFileUpload> = (
    {
        error,
        name,
        label,
        onChange,
        oldImage
    }) => {

    const [change, setChange] = useState(false)
    const [fileName, setFileName] = useState("")
    console.log(change)
    return (
        <>
            {error && !fileName && <span className={s.error}>{error}</span>}
                 {oldImage && (
                     <div className={s.existingImageBlock}>
                         <img className={s.existingImage} src={!change ? oldImage: URL.createObjectURL(oldImage)} alt={name}/>
                     </div>
                 )}
            <div className={s.wrapper}>
                <div className={s.uploadButtonWrapper}>
                    <div className={s.uploadButtonLabel}>
                        <span style={{
                            color: error && !fileName ? "crimson" : fileName ? "#19347a" : ""
                        }}>{label}</span>
                    </div>
                    <div className={s.uploadButton}>
                        <label>
                            <span className={s.uploadFileText}><ButtonSVg/></span>
                            <input name={name} type="file" className={`${s.fileInput} `} onChange={(e) => {
                                onChange(e)
                                if(e.target.files){
                                    setFileName(e.target.files[0].name)
                                    setChange(true)
                                }
                            }} />
                            <span className={`${s.filename} ${error && !fileName && s.errorInput}`} style={{
                                // color: fileName && !error && "#19347a"
                            }}>{fileName ? fileName : "Choose a file"}</span>
                        </label>
                    </div>
                </div>
                {/*{type !== "hidden" && <div className={s.splitter}></div>}*/}

            </div>
        </>
    );
};

export default SingleFileUpload;
