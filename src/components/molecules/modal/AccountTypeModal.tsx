import React, { useEffect, useState } from 'react';
import { Box, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Dialog, DialogContent } from "@mui/material";
import { Button } from '@/components/atoms/button';

interface AccountType {
  code: string;
  label: string;
}

interface AccountTypeSelectModalProps {
  open?: boolean;
  loading?: boolean;

  onClose?(): void;

  value?: any,
  code?: string,

  onChange?(value: any): void,
}

const accounttypes: readonly AccountType[] = [
  { code: 'contractor', label: 'Contractor' },
  { code: 'employer', label: 'Employer' },
];

const AccountTypeSelectModal: React.FC<AccountTypeSelectModalProps> = (props) => {
  const [value, setValue] = useState(accounttypes[0]);

  useEffect(() => {
    let tmpdefaultvalue = accounttypes[0];
    if (props?.code == "employer") {
      tmpdefaultvalue = accounttypes[1];
    }
    setValue(tmpdefaultvalue);
  }, [props?.code]);
  return (
    <>
      <Dialog
        open={props?.open ?? false}
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
              marginBottom: "22px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Account Type
          </Box>
          <Autocomplete
            sx={{ width: "100%" }}
            options={accounttypes}
            value={value}
            onChange={(e, value) => {
              e.preventDefault();
              if (props?.onChange) {
                props?.onChange(value);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Account Type"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props?.onClose}
            loading={props?.loading}
            title={"Ok"}
            />
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AccountTypeSelectModal };
