import React from 'react';
import { Box, FormControlLabel, Radio, Typography } from '@mui/material'
import { useAddressCardStyles } from "@/static/stylesheets/address-card/addressCardStyles";
import map from '@/static/images/pictures/Map.jpg';

interface AddressCardProps {
  title?: string,
  sub_title?: string,

  onClick?(option: any): void,

  checked?: boolean,
  value?: string,
}

const AddressCard: React.FC<AddressCardProps> = (props) => {
  const classes = useAddressCardStyles({ image: map?.src });
  return (
    <Box className={classes.root}>
      <Box className={"card"}>
        <Box className={"content"}>
          <FormControlLabel
            control={<Radio />}
            label=""
            onClick={() => {
              props?.onClick?.(props?.value);
            }}
            checked={props?.checked}
          />
          <Box>
            <Typography component={"h2"}>{props?.title}</Typography>
            <Typography>{props?.sub_title}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressCard;
