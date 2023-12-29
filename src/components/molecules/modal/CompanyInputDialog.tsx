import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { themeColors } from '@/config';

interface CompanyInputDialogProps {
  value?: string,
  open: boolean,

  onChange?(value: string): void,

  onClose?(): void,
}

const CompanyInputDialog: React.FC<CompanyInputDialogProps> = (props) => {
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
            Company
          </Box>
          <Box>
            <TextField
              size={"small"}
              type={"text"}
              label={"Company Name"}
              fullWidth={true}
              value={props?.value}
              onChange={(e) => {
                if (props?.onChange) {
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

export { CompanyInputDialog };
