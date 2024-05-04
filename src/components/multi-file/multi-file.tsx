import React, {useEffect, useState} from "react";
import s from './multi-file-upload.module.scss'
import {AdminApi} from "../../api/admin-api/admin-api";
import {fakeUrl} from "../../utils/getFieldLabel";
import FileManager from "../file";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {ReactComponent as Upload} from "../../svgs/Upload.svg";
import {ReactComponent as Trash} from "../../svgs/remove.svg";


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

    const InputChange =
        (e: any) => {
            const file = e;
            setImages((preValue: any) => {
                return [
                    ...preValue,
                    {
                        id: selectedfile.length + 1,
                        img: e,
                    }
                ]
            });
            SetSelectedFile((preValue: any) => {
                return [
                    ...preValue,
                    {
                        id: selectedfile.length + 1,
                        fileimage: file,
                    }
                ]
            });
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
    const {t} = useTranslation();

    const FileUploadSubmit = async (e: any) => {
        e.preventDefault();
        e.target.reset();
        if (selectedfile.length > 0) {
            const data = await AdminApi.saveImages({images: images, id: id})
            setOldImage(data.data);
            SetSelectedFile([])
            const options = {
                type: toast.TYPE.SUCCESS,
                position: toast.POSITION.TOP_RIGHT
            };
            toast(t("admin:record_successfully_added"), options);
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
                                        <FileManager
                                            isMulti={false}
                                            handleChange={InputChange}
                                        />
                                    </div>
                                </div>
                                <div className="kb-attach-box mb-3">
                                    {
                                        selectedfile.map((data, index) => {
                                            const {
                                                id,
                                                fileimage,
                                            } = data;
                                            return (
                                                <div className={s.file_atc_box} key={id}>
                                                    {
                                                        fileimage.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                            <div className={s.file_image}><img src={fileimage}
                                                                                               alt=""/></div> :
                                                            <div className={s.file_image}><i
                                                            ></i></div>
                                                    }
                                                    <div className={s.file_detail}>
                                                        <h6>{fileimage}</h6>
                                                        <div className={s.file_actions}>
                                                            <button type="button" className={s.file_action_btn}
                                                                    onClick={() => DeleteSelectFile(id)}><Trash/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={s.upload_button}>
                                    <button type="submit"><Upload/>
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
                                                                    onClick={() => deleteOldImage(id)}><Trash/>
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
