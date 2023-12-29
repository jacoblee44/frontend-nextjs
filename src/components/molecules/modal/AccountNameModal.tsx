import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { themeColors } from "@/config";

interface ChangeAccountNameDialogProps {
  value?: string,
  open: boolean,
  onChange?(value: string, field: string): void,
  onClick?(): void,

  onClose?(): void,
}

const AccountNameDialog: React.FC<ChangeAccountNameDialogProps> = (props) => {
  return (
    <>
      <Dialog
        open={props?.open}
        maxWidth={"lg"}
        sx={{
          "& .MuiPaper-root": {
            width: 400,
            padding: "10px",
          }
        }}
      >
        <DialogContent>
          <div style={{width: 300}}>
            <TextInput
              type={"text"}
              label={"First Name"}
              value={props?.value?.split('-')[0]}
              onChange={(e) => {
                if(props?.onChange) {
                  props?.onChange(e?.target?.value,'firstname');
                }
              }}
              />
             <TextInput
              type={"text"}
              label={"Last Name"}
              value={props?.value?.split('-')[1]}
              onChange={(e) => {
                if(props?.onChange) {
                  props?.onChange(e?.target?.value,'lastname');
                }
              }}
              />              
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{color: themeColors.employerPrimary}}  onClick={props?.onClose}>Close</Button>
          <Button style={{color: themeColors.employerPrimary}}  onClick={props?.onClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AccountNameDialog };
