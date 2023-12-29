import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { themeColors } from '@/config';

interface LanguageInputDialogProps {
  value?: string,
  open: boolean,

  onChange?(value: string): void,

  onClose?(): void,
}

const LanguageInputDialog: React.FC<LanguageInputDialogProps> = (props) => {
  return (
    <>
      <Dialog
        open={props?.open}
        sx={{
          "& .MuiPaper-root": {
            width: 400,
            padding: "10px",
          }
        }}
      >
        <DialogContent>
          <Box
            sx={{
              marginBottom: "22px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Language
          </Box>
          <Box>
            <TextField
              size={"small"}
              type={"text"}
              label={"Language"}
              value={props?.value}
              fullWidth={true}
              onChange={(e) => {
                if(props?.onChange) {
                  props?.onChange(e?.target?.value);
                }
              }}
              />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.onClose} style={{color: themeColors.employerPrimary}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { LanguageInputDialog };
