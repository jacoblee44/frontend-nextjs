import React, { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import toast from "react-hot-toast";
import { updateChangepassword } from "@/redux/actions";
import { Button } from '@/components/atoms/button';
import { useAuthInfo } from "@/hooks/custom";

interface ChangePasswordInputDialogProps {
  value?: string,
  open: boolean,
  loading?: boolean,

  onClose?(): void,
}

const ChangePasswordInputDialog: React.FC<ChangePasswordInputDialogProps> = (props) => {
  const { userData: authUser } = useAuthInfo();
  if (typeof authUser?._id !== "undefined") {
    var userid = authUser?._id;
  } else {
    var userid = 0;
  }

  const [oldPass, setOldpass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [confirmPass, setConfirmpass] = useState("");

  const handleChangeInput = (value: any, field: any) => {
    if (field == 'opass') {
      setOldpass(value);
    } else if (field == 'npass') {
      setNewpass(value);
    } else if (field == 'cpass') {
      setConfirmpass(value);
    }
  };

  const handleClickSubmit = () => {
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (oldPass == "" || newPass == "" || confirmPass == "") {
      toast.error("Please Input all required fields!");
      return false;
    } else if (!re.test(newPass)) {
      toast.error("Your password must have minimum 8 characters includes at least one special character, a number, one capital letter!");
      return false;
    } else if (newPass != confirmPass) {
      toast.error("Password Mismatch!");
      return false;
    }
    updateChangepassword({
      "userid": userid,
      "opass": oldPass,
      "npass": newPass
    });
  };

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
              marginBottom: "22px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Change Password
          </Box>

          <div>
            <Box sx={{
              "& span.icon": {
                bottom: "12px !important",
              }
            }}>
              <TextInput
                type={"password"}
                label={"Old Password"}
                onChange={(e) => {
                  handleChangeInput(e?.target?.value, 'opass');
                }}
                labelStyle={{ fontSize: "14px" }}
              />
              <TextInput
                type={"password"}
                label={"New Password"}
                onChange={(e) => {
                  handleChangeInput(e?.target?.value, 'npass');
                }}
                labelStyle={{ fontSize: "14px" }}
              />
              <TextInput
                type={"password"}
                label={"Confirm Password"}
                onChange={(e) => {
                  handleChangeInput(e?.target?.value, 'cpass');
                }}
                labelStyle={{ fontSize: "14px" }}
              />
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props?.onClose}
            title={"Close"}
          />
          <Button
            onClick={handleClickSubmit}
            title={"Submit"}
            loading={props?.loading}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export { ChangePasswordInputDialog };
