import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import s from "../text-field/text-field.module.scss";

///import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";

interface IRichText {
    handleEditorChange: any;
    menubar?: boolean;
    initialValue: string;
    label: string;
    height?: number;
    plugins?: Array<string>;
    toolbar?: string;
}

const RichText: React.FC<IRichText> = (
    {
        handleEditorChange,
        menubar = true,
        initialValue,
        // name,
         label,
        height = 500,
        plugins = [
            "advlist directionality autolink autosave link image lists charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu textcolor paste textcolor"
        ],
        toolbar = 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
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

                init={{
                    height: height,
                    menubar: menubar,
                    plugins: plugins,
                    toolbar: toolbar,
                    directionality: 'ltr'
                }}
                onEditorChange={handleEditorChange}
            /></>
    );
};

export default RichText;
