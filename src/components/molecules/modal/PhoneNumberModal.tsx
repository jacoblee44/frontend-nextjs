import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { themeColors } from "@/config";
import { Button } from '@/components/atoms/button';

interface PhoneNumberInputDialogProps {
  value?: string,
  open: boolean,
  loading?: boolean,

  onChange?(value: string): void,

  onClick?(phone: any): void,

  onClose?(): void,
}

const PhoneNumberInputDialog: React.FC<PhoneNumberInputDialogProps> = (props) => {
  const [tempphoneNumber, settempPhonenumber] = useState("");

  useEffect(() => {
    settempPhonenumber(props?.value ?? "");
  }, [props?.value]);

  return (
    <>
      <Dialog
        open={props?.open}
        onClose={props?.onClose}
        maxWidth={"lg"}
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
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Change Phone Number
          </Box>
          <div>
            <TextInput
              type={"text"}
              value={tempphoneNumber}
              onChange={(e) => {
                settempPhonenumber(e?.target?.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props?.onClose}
            title={"Close"}
          />
          <Button
            onClick={() => {
              if (props?.onClick) {
                props?.onClick(tempphoneNumber);
              }
            }}
            title={"Submit"}
            loading={props?.loading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export { PhoneNumberInputDialog };
