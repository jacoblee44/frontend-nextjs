import React, { useEffect, useState, ChangeEvent } from "react";
import { Button } from "@/components/atoms/button";
import { SelectInput } from "@/components/atoms/select";
import { TextInput } from "@/components/atoms/textInput";
import { JobPostBanner } from "@/components/layouts";
import { useDescribeJobFormStyles } from "@/static/stylesheets/employee-job/describeJobFormStyles";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Box, Grid, Typography } from "@mui/material";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: [
    ['underline', 'italic', 'bold'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
    ],
  ],
  clipboard: {
    matchVisual: false,
  },
}
const formats = [
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
]

interface DescribeJobFormProps {
  onClickPrev?(): void;

  onClickNext?(): void;

  jobid: number;
}

export const DescribeJobForm: React.FC<DescribeJobFormProps> = (props) => {
  const classes = useDescribeJobFormStyles();
  const { bindInput, values, register, setValue, unregister, errors, hasError, clearErrors } = useFormMethods();
  const [editor, setEditor] = useState("");

  let jobId = props?.jobid ? props?.jobid : values['jobId'];
  const jobdescription = (typeof values['jobdescribe.jobdescription'] != undefined) ? values['jobdescribe.jobdescription'] : '',
    jobdescriptionError = (typeof errors['jobdescribe.jobdescription'] != undefined) ? errors['jobdescribe.jobdescription'] : '';
  const covidprecautions = (typeof values['jobdescribe.covidprecautions'] != undefined) ? values['jobdescribe.covidprecautions'] : '';
    //covidprecautionsError = (typeof errors['jobdescribe.covidprecautions'] != undefined) ? errors['jobdescribe.covidprecautions'] : '';
  const jobreferid = (typeof values['jobdescribe.jobreferid'] != undefined) ? values['jobdescribe.jobreferid'] : '';
    //jobreferidError = (typeof errors['jobdescribe.jobreferid'] != undefined) ? errors['jobdescribe.jobreferid'] : '';

  const createOrUpdateJob = () => {
    let data: { [key: string]: any } = {
      jobdescription: jobdescription,
      covidprecautions: covidprecautions,
      jobreferenceid: jobreferid,
    };
    if (jobId) {
      data.jobid = jobId;
    }
    //setState({ jobSaveLoading: true });
    apiClient.post({
      url: endpoints.private.updateJob,
      data,
    }).then((res) => {
      //setState({ jobSaveLoading: false });
      if (res) {
      }
      if (props?.onClickNext) {
        clearErrors();
        props?.onClickNext();
      }
    }).catch(() => {
      //setState({ jobSaveLoading: false });
    });
  };

  const handleClickNext = () => {
    if (hasError()) {
      return;
    }
    createOrUpdateJob();
  };

  const handleClickBack = () => { 

    unregister("jobdescribe.jobdescription");
    unregister("jobdescribe.covidprecautions");
    unregister("jobdescribe.jobreferid");

    if (props?.onClickPrev) {
      clearErrors();
      props?.onClickPrev();
    }
  };


  useEffect(() => {
    register("jobdescribe.jobdescription", {
      required: "Please describe your job",
    });

   /* register("jobdescribe.covidprecautions", {
      required: "Please describe covid precautions taken!",
    });
    register("jobdescribe.jobreferid", {
      required: "Enter job reference id",
    });*/
  }, [jobreferid]);

  const loadjobData = async () => {
    jobId = props?.jobid ? props?.jobid : values['jobId'];
    if (jobId) {
      await apiClient.post({
        url: endpoints.private.getJob,
        data: {
          jobid: jobId,
        }
      }).then((res) => {
        if (res?.data) {
          const jobData = res?.data?.job;
          setValue("jobdescribe.jobdescription", jobData.jobdescription);
          setValue("jobdescribe.covidprecautions", jobData.covidprecautions);
          setValue("jobdescribe.jobreferid", jobData.jobreferenceid);
          setEditor(jobData.jobdescription);
        }
      }).catch(() => {
      });
    }
  }

  useEffect(() => {
    loadjobData();
  }, [jobId]);

  useEffect(() => {
    setValue("jobdescribe.jobdescription", editor);
  }, [editor]);

  return (
    <Box className={classes.root}>
      <JobPostBanner title="Describe the job" />
      <Box className="box">
        <Typography component="h2">
          Job description <span style={{ color: "red" }}>*</span>
        </Typography>
        <Typography>
          Describe the responsibilities of this job, required work experience,
          skills or education.
        </Typography>

        { /* <Typography className="file">Upload a PDF or DOCX</Typography>
        <textarea
          style={{
            width: "100%",
            background: "#FAFAFA",
            color: "#000000",
            borderRadius: "10px",
            padding: "10px",
            resize: "none",
          }}
          rows={10}
          onChange={(e) => {setValue("jobdescribe.jobdescription", e.target.value)}}
          value = {values['jobdescribe.jobdescription']}
        >
        </textarea> */}
        <QuillNoSSRWrapper
          style={{ marginTop: "15px" }}
          modules={modules}
          value={editor}
          onChange={setEditor}
          formats={formats} theme="snow"
        />
        {jobdescriptionError && (
          <Box sx={{ marginTop: "5px" }}>
            <FormError show={jobdescriptionError} title={jobdescriptionError} />
          </Box>
        )}
        <Box sx={{ paddingTop: "30px" }}>
          <Typography component="h2">
            Are you taking any additional COVID-19 precautions?
          </Typography>
          <Typography>
            Let people know your company is responding to COVID-19.
          </Typography>
          <textarea
            style={{
              width: "100%",
              background: "#FAFAFA",
              color: "#000000",
              borderRadius: "10px",
              padding: "10px",
              resize: "none",
            }}
            rows={3}
            onChange={(e) => {
              setValue("jobdescribe.covidprecautions", e.target.value)
            }}
            value={values['jobdescribe.covidprecautions']}
          >
          </textarea>
          <Typography>0 / 256</Typography>
        </Box>
        { /*covidprecautionsError && (
          <Box sx={{ marginTop: "5px" }}>
            <FormError show={covidprecautionsError} title={covidprecautionsError} />
          </Box>
        ) */}

        <Box sx={{ paddingTop: "30px" }}>
          <Typography component="h2">Job reference ID</Typography>
          <Typography>
            This will be displayed on your job description to people looking for
            jobs to reference with their application.
          </Typography>
          <TextInput type="text" onChange={(e) => {
            setValue("jobdescribe.jobreferid", e.target.value)
          }} value={values['jobdescribe.jobreferid']} />
        </Box>
        {/*jobreferidError && (
          <Box sx={{ marginTop: "5px" }}>
            <FormError show={jobreferidError} title={jobreferidError} />
          </Box>
        ) */}
      </Box>

      <Box className="bottom">
        <Button
          onClick={handleClickBack}
          title="< Back"
          width="170px"
          height="60px"
          btnType="border"
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "130px !important"
            }
          }}
        />
        <Button
          onClick={handleClickNext}
          title="Save & Continue"
          width="220px"
          height="60px"
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "180px !important"
            }
          }}
        />
      </Box>
    </Box>
  );
};
