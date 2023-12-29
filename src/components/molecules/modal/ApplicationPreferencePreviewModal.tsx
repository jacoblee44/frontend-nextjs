import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Dialog, DialogContent, Typography } from "@mui/material";
import Image from "next/image";
import image1 from "@/static/images/pictures/picture2.png";
import { Button } from "@/components/atoms/button";
import CloseIcon from "@mui/icons-material/Close";
import { CustomDivider } from "@/components/atoms/divider";
import { useApplicationPreferencePreviewModalModalStyles } from "@/static/stylesheets/modal";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { apiClient, endpoints } from "@/api";
import { JobDetails } from "@/components/molecules/job-details";

interface ApplicationPreferencePreviewModalProps {
  open: boolean;

  handleClose?(): void;

  jobid?: number;
}

const ApplicationPreferencePreviewModal: React.FC<ApplicationPreferencePreviewModalProps> = (props) => {
  let jobId = props?.jobid ? props?.jobid : 0;
  const [jobtitle, setJobtitle] = useState('');
  const [address, setAddress] = useState<any[]>([]);
  const [adlocation, setAdlocation] = useState('');
  const [benefits, setBenefits] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [supplemental, setSupplemental] = useState([]);
  const [referenceid, setReferenceID] = useState('');
  const [expectedstartdate, setExpectedstartdate] = useState('');

  const classes = useApplicationPreferencePreviewModalModalStyles()
  const loadjobData = async () => {
    jobId = props?.jobid ? props?.jobid : 0;
    if (jobId) {
      await apiClient.post({
        url: endpoints.private.getJob,
        data: {
          jobid: jobId,
        }
      }).then((res) => {
        if (res?.data) {
          const jobData = res?.data?.job;
          setJobtitle(jobData.jobtitle);
          setAddress(jobData.address);
          setAdlocation(jobData.adlocation);
          setBenefits(jobData.benefitsoffered);
          setSchedule(jobData.jobschedule);
          setSupplemental(jobData.supplementalpay);
          setReferenceID(jobData.jobreferenceid);
          setExpectedstartdate(jobData.startdate.split('T')[0]);
        }
      }).catch(() => {
      });
    }
  }

  useEffect(() => {
    loadjobData();
  }, [jobId]);
  return (
    <Dialog
      maxWidth={"lg"}
      open={props?.open}
      onClose={props?.handleClose}
      scroll={"body"}
      className={"modal-box"}
      sx={{
        "& .MuiPaper-root": {
          width: "900px",
        }
      }}
    >
      <DialogContent>
        <Box className={classes.root}>
          <Box className={"top-banner"}>
            <Box className={"content"}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                <Image src={image1} alt={"View"} />
                <Typography component={"h2"}>Preview</Typography>
              </Box>
            </Box>
            <CloseIcon onClick={props?.handleClose} />
          </Box>

          <JobDetails jobid={jobId} privateJob={true} />

          {/*<CustomDivider />
          <Box className={"review-box"} mt={2}>
            <Typography sx={{
              fontSize: { md: 36, sm: 26, xs: 20 },
              paddingLeft: '30px',
              paddingTop: '30px',
              fontWeight: 600,
              color: '#000000'
            }}>{jobtitle}</Typography>
            <Box className="info">
              <Typography>{address && address.length > 0 ? (
                <>{address[0]?.streetaddress}, {address[1]?.city} {address[2]?.postcode}</>
              ) : (<>{adlocation}</>)} </Typography>
              <Box sx={{
                marginTop: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                "& .css-d3gonx": { margin: 0 },
                "& svg": {
                  color: '#6D5086',
                  border: '2px solid #6D5086',
                  height: 40,
                  width: 40,
                  padding: '5px',
                  borderRadius: '10px'
                }
              }}>
                <Button title={"Apply on company site"} onClick={() => console.log("hello")} />
                <FavoriteBorderIcon />
              </Box>
            </Box>
            <CustomDivider style={{ margin: '20px 0', borderColor: '#8F77A4', height: 2, background: '#8F77A4' }} />
            <Box className={"content-list"}>
              <Typography>Benefits:</Typography>
              <Typography>
                {benefits && benefits.length > 0 && benefits.map((row) => (
                  <span key={row}>{row}<br></br></span>
                ))}
              </Typography>
              <Typography>Schedule:</Typography>
              <Typography>
                {schedule && schedule.length > 0 && schedule.map((row) => (
                  <span key={row}>{row}<br></br></span>
                ))}
              </Typography>
              <Typography>Supplemental pay types:</Typography>
              <Typography>
                {supplemental && supplemental.length > 0 && supplemental.map((row) => (
                  <span key={row}>{row}<br></br></span>
                ))}
              </Typography>
              <Typography>Reference ID: {referenceid}</Typography>
              {expectedstartdate && expectedstartdate != "" && (
                <Typography>Expected start
                  date: {new Date(expectedstartdate).toLocaleString("lookup").split(',')[0]}</Typography>
              )}
            </Box>

          </Box>*/}
          {/*<Box sx={{ textAlign: 'right' }}>
            <Button title={"Close preview"} onClick={props?.handleClose} btnType={"border"} width={"190px"} />
          </Box>*/}
        </Box>
      </DialogContent>

    </Dialog>
  );
};

export { ApplicationPreferencePreviewModal };
