import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import s from "../text-field/text-field.module.scss";

///import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";

interface IRichText {
    handleEditorChange: any;
    menubar?: boolean;
    menu?: boolean;
    initialValue: string;
    label: string;
    height?: number;
    plugins?: Array<string>;
    toolbar?: string;
}

const RichText: React.FC<IRichText> = (
    {
        handleEditorChange,
        menubar= 'favs file edit view insert format tools table help',
        menu= {
            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
        },
        initialValue,
        // name,
         label,
        height = 500,
        plugins =[
            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'table emoticons template paste help'
        ],
        toolbar= 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons',

    }
) => {

    return (
        <>
            <div className={s.labelWrapper}>
                {
                    label &&
                    // eslint-disable-next-line no-restricted-globals
                    <label className={s.label}  >
                        {label}
                    </label>
                }
            </div>
            <Editor
                apiKey='0x0vt21r124ntoyvayagzne12v3yte3g3138dyxtvn8d70t6'
                value={initialValue}
                menu={menu}
                init={{
                    selector: '#myTextarea',
                    height: 500,
                    width: 500,
                    plugins: ' searchreplace autolink directionality visualblocks visualchars image link media  codesample table charmap pagebreak nonbreaking anchor  insertdatetime advlist lists wordcount help charmap linkchecker emoticons autosave',
                    toolbar: [
                        'undo redo print spellcheckdialog formatpainter |alignleft aligncenter alignright alignjustify ',
                        'bold italic underline forecolor backcolor | link image |  blocks fontfamily fontsize',

                    ]

                }}
                onEditorChange={handleEditorChange}
            /></>
    );
};

export default RichText;
