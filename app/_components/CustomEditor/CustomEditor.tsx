// components/CustomEditor.tsx
"use client"; // Only needed if using the App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FC } from "react";

interface CustomEditorProps {
  onChange: (event: any, editor: any) => void;
  data: string;
}

const CustomEditor: FC<CustomEditorProps> = ({ onChange, data }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      /* onReady={(editor) => {
        console.log("Editor is ready to use!", editor);
      }} */
      onChange={onChange}
      /* onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }} */
      /* onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }} */
    />
  );
};

export default CustomEditor;
