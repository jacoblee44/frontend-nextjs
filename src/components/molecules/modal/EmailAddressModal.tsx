import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { appConfig, themeColors } from "@/config";
import toast from "react-hot-toast";
import { updateEmailaddress } from "@/redux/actions";
import { useAuthInfo } from "@/hooks/custom";
import { Button } from '@/components/atoms/button';

interface EmailAddressInputDialogProps {
  value?: string,
  open: boolean,

  onClose?(): void,

  loading?: boolean,
}

const EmailAddressInputDialog: React.FC<EmailAddressInputDialogProps> = (props) => {
  const [tempemailAddress, settempEmailaddress] = useState("");

  const { userData: authUser } = useAuthInfo();
  if (typeof authUser?._id !== "undefined") {
    var userid = authUser?._id;
  } else {
    var userid = 0;
  }

  const handleClickSave = () => {
    if (tempemailAddress == "") {
      toast.error("Please Input all required fields!");
      return false;
    }
    updateEmailaddress({
      "userid": userid,
      "email": tempemailAddress,
      "url": `${appConfig.appBaseUrl}/change-email/`
    });
  };

  useEffect(() => {
    settempEmailaddress(props?.value ?? "");
  }, [props?.value]);

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
          <Box
            sx={{
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Email Address
          </Box>

          <div>
            <TextInput
              type={"text"}
              value={tempemailAddress}
              onChange={(e) => {
                settempEmailaddress(e?.target?.value);
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
            onClick={handleClickSave}
            title={"Submit"}
            loading={props?.loading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export { EmailAddressInputDialog };
