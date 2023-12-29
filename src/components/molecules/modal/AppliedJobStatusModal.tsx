import React, { useEffect, useState } from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Dialog, DialogContent } from "@mui/material";

interface AppliedStatus {
  code: string;
  label: string;
}

interface AppliedStatusSelectModalProps {
  open?: boolean;
  onClose?(): void;
  value?: any,
  code?: string,
  onChange?(value: any): void,
}

const appliedstatus: readonly AppliedStatus[] = [
  { code: '', label: 'Applied' },
  { code: 'interview', label: 'Interviews' },
  { code: 'archived', label: 'Archived' },  
];

const AppliedStatusSelectModal: React.FC<AppliedStatusSelectModalProps> = (props) => {
  const [value, setValue] = useState(appliedstatus[0]);

  useEffect(() => {
    let tmpdefaultvalue = appliedstatus[0];
    if(props?.code == "interview") {
      tmpdefaultvalue = appliedstatus[1];
    } else if(props?.code == "archived") {
      tmpdefaultvalue = appliedstatus[2];
    }
    setValue(tmpdefaultvalue);
  }, [props?.code]);
  return (
    <>
      <Dialog open={props?.open ?? false} onClose={props?.onClose}>
        <DialogContent>
          <Autocomplete
            sx={{ width: 300 }}
            options={appliedstatus}
            value={value} 
            onChange={(e, value) => {  
              e.preventDefault();
              if(props?.onChange) {               
                props?.onChange(value);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Applied Job Status"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.onClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AppliedStatusSelectModal };
