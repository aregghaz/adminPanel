import React, {useEffect, useState} from "react";
import s from './multi-file-upload.module.scss'
import {AdminApi} from "../../api/admin-api/admin-api";
import {fakeUrl} from "../../utils/getFieldLabel";

interface ISingleFileUpload {
    id: number,
    data: Array<any>
    loading: boolean
    setLoading: any
}

interface IState {
    id: 0,
    filename: '',
    filetype: '',
    fileimage: '',
    datetime: '',
    filesize: ''
}

const MultiFile: React.FC<ISingleFileUpload> = ({
                                                    id,
                                                    data,
                                                    setLoading,
                                                    loading
}
) => {

    const [selectedfile, SetSelectedFile] = useState<Array<any>>([]);
    const [oldImage, setOldImage] = useState<Array<any>>(data);
    const [images, setImages] = useState<Array<any>>([]);

    useEffect(() => {
        (
            async () => {
                if (id) {
                    const data = await AdminApi.getImages(id);
                    setOldImage(data.data);
                    SetSelectedFile([])
                }
            }
        )();
    }, [loading]);
    const filesizes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }



    const InputChange =
        (e: any) => {
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
                                // datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
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

    const deleteOldImage = async (id: number) => {
        await AdminApi.deleteImage(id);
        const oldImageData = oldImage.filter((item) => item.id !== id)
        setOldImage(oldImageData)
    }
    const DeleteSelectFile = (id: number) => {
        if (window.confirm("Вы уверены в том, что хотите удалить данное изображение?")) {
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
            ////FIXME ADD NOTIFICATION
            AdminApi.saveImages({images: images, id: id})
            setLoading(!loading)
        } else {
            alert('Пожалуйста, выберите файл')
        }
    }


    return (<>
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
                                                            <span>Size: {filesize}</span>
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
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <div className="kb-attach-box mb-3">
                                    {
                                        oldImage.map((data, index) => {
                                            const {
                                                id,
                                                path,
                                            } = data;

                                            return (
                                                <div className={s.file_atc_box} key={id}>
                                                    <div className={s.file_image}>
                                                        <img src={fakeUrl + path} alt=""/></div>
                                                    <div className={s.file_detail}>
                                                        <div className={s.file_actions}>
                                                            <button type="button" className={s.file_action_btn}
                                                                    onClick={() => deleteOldImage(id)}>Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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
