import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";

interface TextInputDialogProps {
  value?: string,
  label?: string,
  open: boolean,
  onChange?(value: string): void,
  onClick?(): void,
  onClose?(): void,
}

const TextInputDialog: React.FC<TextInputDialogProps> = (props) => {
  return (
    <>
      <Dialog
        open={props?.open}
      >
        <DialogContent>
          <div style={{width: 300}}>
            <TextInput
              type={"text"}
              label={props?.label}
              value={props?.value}
              onChange={(e) => {
                if(props?.onChange) {
                  props?.onChange(e?.target?.value);
                }
              }}
              />
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

export { TextInputDialog };
