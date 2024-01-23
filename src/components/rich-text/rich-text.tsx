import React from "react";
import { Editor } from "@tinymce/tinymce-react";
///import { EventHandler } from "@tinymce/tinymce-react/lib/cjs/main/ts/Events";

interface IRichText {
    handleEditorChange:any;
    menubar?: boolean;
    initialValue: string;
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
        // label,
        height = 500,
        plugins = [
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        ],
        toolbar = 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
    }
) => {

    return (
        <Editor
            apiKey='0x0vt21r124ntoyvayagzne12v3yte3g3138dyxtvn8d70t6'
            initialValue={initialValue}
            init={{
                height: height,
                menubar: menubar,
                plugins: plugins,
                toolbar: toolbar
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default RichText;
