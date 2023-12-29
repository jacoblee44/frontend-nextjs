import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

/*import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: [
    ['underline', 'italic', 'bold'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
    ],
  ],
  clipboard: {
    matchVisual: false,
  },
}
const formats = [
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
]*/

interface EditorInputDialogProps {
  value?: string,
  label?: string,
  open: boolean,
  onChange?(value: any): void,
  onClick?(): void,
  onClose?(): void,
}

const EditorInputDialog: React.FC<EditorInputDialogProps> = (props) => {
  //const [editor, setEditor] = useState(props?.value);
  return (
    <>
      <Dialog
        open={props?.open}
      >
        <DialogContent>
          <div style={{width: 300}}>
          {/* <QuillNoSSRWrapper style={{marginTop:"15px"}} modules={modules} value={props?.value} onChange={() => {
                setEditor;
                if(props?.onChange) {
                  props?.onChange(editor);
                }
              }} formats={formats} theme="snow" /> */ }
              {props?.label}
              <textarea rows={7} cols={35}
              value={props?.value}
              onChange={(e) => {
                if(props?.onChange) {
                  props?.onChange(e?.target?.value);
                }
              }}></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.onClick}>Submit</Button>
          <Button onClick={props?.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { EditorInputDialog };
