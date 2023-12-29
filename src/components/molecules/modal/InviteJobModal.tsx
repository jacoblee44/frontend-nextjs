
import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material'
import { useJobsStyles } from "@/static/stylesheets/jobsStyles";
import { CustomDivider } from "@/components/atoms/divider";
import CloseIcon from '@mui/icons-material/Close';
import image1 from '@/static/images/pictures/picture2.png';
import Image from 'next/image';
import { Button } from "@/components/atoms/button";
import { apiClient, endpoints } from "@/api";
import { useAuthInfo } from "@/hooks/custom";
interface InviteJobModalProps {
  open?: boolean;
  handleClose?(): void;
  resid?: number;
  onClick?(): void,
}


const InviteJobModal: React.FC<InviteJobModalProps> = (props) => {
    
 const classes = useJobsStyles();
  const { userData } = useAuthInfo();
  const [open, setOpen] = useState(false);
  
  const [alljobslist, setAllJobslist] = useState([]);
  const [Jobid, setJobid] = useState(0);  
  const [errmsg, setErrmsg] = useState('');

  const userId = userData?._id;
   const listjobtoinvite = () => {
    apiClient.post({
      url: endpoints.public.searchallJobs,
      data: {
        keyword: "",
        userid: userId,
      }
    }).then((res) => {
      //console.log(JSON.stringify(res?.data?.search));
      setAllJobslist(res?.data?.search);
    }).catch(() => {
    });
  }

  const handleinvitetojobs = (Jobid:any) => {
     var errmsg = "";
     apiClient.post({
      url: endpoints.private.invitejobtoApply,
      data: {
        jobid: Jobid,
        resid: props?.resid,
      }
    }).then((res) => {
        if(res?.data?.message){
            alert("Already invited this Job");
        }
      ///console.log(JSON.stringify(res?.data?.jobinvite));
    }).catch(() => {
    });
  }

  
  useEffect(() => {
    listjobtoinvite();
  }, [userData]);

  return (

    <Dialog
      maxWidth={"lg"}
      open={(typeof props?.open !== "undefined") ? props?.open : false}
      onClose={props?.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll={"body"}
      className={"modal-box"}
    >
      <DialogContent>
        <Box className={classes.root}>
        
          <Box className={"top-banner"} >
          {alljobslist && alljobslist.length > 0 && alljobslist.map((row: any) => (
            <Box className={"content"}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                <Typography component={"h2"}>{row?.jobtitle}</Typography>
                <Typography component={"h2"}>{row?.companyname}</Typography>
                <Typography component={"h2"}>{row?.createddate}</Typography>
                {errmsg == "" && (
                <Button title={"Invite"} onClick={() => { handleinvitetojobs(row?._id); }} />
                )}
              </Box>
            </Box>
             ))}
              <CloseIcon onClick={props?.handleClose} />
          </Box>
       
          <CustomDivider />
          
          <Box sx={{textAlign: 'center'}}>
            <Button title={"Close Job List"} onClick={props?.handleClose} btnType={"border"} width={"190px"} />
          </Box>
        </Box>
      </DialogContent>

    </Dialog>    

  );
};

export { InviteJobModal };
