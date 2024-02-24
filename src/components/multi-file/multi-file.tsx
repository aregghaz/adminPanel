import React, {useEffect, useState} from "react";
import s from './multi-file-upload.module.scss'
import {AdminApi} from "../../api/admin-api/admin-api";
import {fakeUrl} from "../../utils/getFieldLabel";

interface ISingleFileUpload {
    id: number,
    data: Array<any>
}

interface IState {
    id: 0,
    filename: '',
    filetype: '',
    fileimage: '',
    datetime: '',
    filesize: ''
}

const MultiFile: React.FC<ISingleFileUpload> = (
    {id, data}
) => {

    const [selectedfile, SetSelectedFile] = useState<Array<any>>([]);
    const [images, setImages] = useState<Array<any>>([]);


    const filesizes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const getImage = async (item: any) => {
        return fetch(fakeUrl + item.path)
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                // Here's where you get access to the blob
                // And you can use it for whatever you want
                // Like calling ref().put(blob)
                // Here, I use it to make an image appear on the page
                // let objectURL = URL.createObjectURL(blob);
                // let myImage = new Image();
                // myImage.src = objectURL;
                return blob
            })
    }

    async function createFile(item: any) {

        return  await fetch(fakeUrl + item.path, { mode: 'no-cors'}).then(r => r.blob()).then(blobFile => new File([blobFile], 'test', {  type: 'image/jpeg'}));

        // let response = await fetch(fakeUrl + item.path);
        // let data = await response.blob();
        // let metadata = {
        //     type: 'image/jpeg'
        // };
        // console.log(new File([data], "test.jpg", metadata),'datadata')
        // return new File([data], "test.jpg", metadata)
    }

    useEffect(() => {
        data.map(async (item) => {
            const asd = await createFile(item)
            InputChange({target: {files: [asd]}})

        })
    }, [])
    const InputChange = (e: any) => {
        console.log(e, 'q')
        // if (e.target.files && e.target.files.length > 0) {
        for (let i = 0; i < e.target.files.length; i++) {
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                setImages((preValue: any) => {
                    return [
                        ...preValue,
                        {
                            id: i,
                            img: e.target.files[i],
                        }
                    ]
                });
                SetSelectedFile((preValue: any) => {
                    return [
                        ...preValue,
                        {
                            id: i,
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            filesize: filesizes(e.target.files[i].size)
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                console.log(file)
                reader.readAsDataURL(file);
            }
        }

        // }
    }


    const DeleteSelectFile = (id: number) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = selectedfile.filter((data: any) => data.id !== id);
            SetSelectedFile(result);
            const result2 = images.filter((data: any) => data.id !== id);
            setImages(result2);
        }
    }

    const FileUploadSubmit = async (e: any) => {
        e.preventDefault();
        e.target.reset();
        if (selectedfile.length > 0) {
            const data = AdminApi.saveImages({images: images, id: id})
        } else {
            alert('Please select file')
        }
    }


    return (
        <>

            <div>
                <div className={s.card}>
                    <div className={s.card_body}>
                        <div className={s.kb_data_box}>
                            <div className={s.kb_modal_data_title}>
                                <div className={s.kb_data_title}>
                                    <h6>Галерея</h6>
                                </div>
                            </div>
                            <form onSubmit={FileUploadSubmit}>
                                <div className={s.kb_file_upload}>
                                    <div className={s.file_upload_box}>
                                        <input type="file" id="fileupload" className={s.file_upload_input}
                                               onChange={InputChange} multiple/>
                                        <span>Drag and drop or <span
                                            className={s.file_link}>Choose your files</span></span>
                                    </div>
                                </div>
                                <div className="kb-attach-box mb-3">
                                    {
                                        selectedfile.map((data, index) => {
                                            const {
                                                id,
                                                filename,
                                                filetype,
                                                fileimage,
                                                datetime,
                                                filesize
                                            } = data;
                                            console.log(filename)
                                            return (
                                                <div className={s.file_atc_box} key={id}>
                                                    {
                                                        filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                            <div className={s.file_image}><img src={fileimage}
                                                                                               alt=""/></div> :
                                                            <div className={s.file_image}><i
                                                            ></i></div>
                                                    }
                                                    <div className={s.file_detail}>
                                                        <h6>{filename}</h6>
                                                        <p></p>
                                                        <p>
                                                            <span>Size 11111: {filesize}</span>
                                                            <span>Modified Time : {datetime}
                                                                    </span>
                                                        </p>
                                                        <div className={s.file_actions}>
                                                            <button type="button" className={s.file_action_btn}
                                                                    onClick={() => DeleteSelectFile(id)}>Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="kb-buttons-box">
                                    <button type="submit" className="btn btn-primary form-submit">Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiFile;
