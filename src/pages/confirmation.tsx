import { Box, Typography } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import { useConfirmationStyles } from '@/static/stylesheets';
import { Button } from '@/components/atoms/button';
import { CallbackMessage } from '@/components/organisms/callback-message/CallbackMessage';

 const Confirmation = () => {
    const classes = useConfirmationStyles();
  return (
    <Box className={classes.root}>
        <CallbackMessage title="Thank you for your registration!" subTitle="We have send you an confirmation email to example@example.com Please confirmation your email address to activate your account" confirmButtonText="Confirm" />
    </Box>
  )
}

export default Confirmation;
