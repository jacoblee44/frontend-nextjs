import React, { useState, ChangeEvent } from 'react';
import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-input-2'
import { Box } from '@mui/material';

interface PhoneInputProps {
  value?: string,
  onChange?(phone:any): void;
}

const PhoneInputBox: React.FC<PhoneInputProps> = (props) => {
  //const [value, setValue] = useState(); setValue(phone); 
  return (
    <Box sx={{marginTop:'20px'}}>
      <PhoneInput
        country="us"
        placeholder=""
        value={props?.value}
        onChange={(phone: any) =>{ props?.onChange?.(phone) }}
        containerStyle={{height: 45}}
      />
    </Box>
  );
};


export { PhoneInputBox };
