import { Button } from "@/components/atoms/button";
import { JobPostBanner } from "@/components/layouts";
import { useJObPostTypeStyles } from "@/static/stylesheets/employee-job/jobPostTypeStyles";
import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead, TableRow,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { useAuthInfo } from "@/hooks/custom";
import SearchIcon from '@mui/icons-material/Search';
import { apiClient, endpoints } from "@/api";
import { useComponentState, useInput, useThrottle } from "@/hooks";
import { FormError } from "@/components/organisms/form-error";
import { useFormMethods } from "@/hooks/form";
import { Loader } from "@/components/atoms/loader";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

interface JobPostTypeProps {
  onClickPrev?(): void;

  onClickNext?(): void;
}

export const JobPostType: React.FC<JobPostTypeProps> = (props) => {
  const classes = useJObPostTypeStyles();
  const { userData } = useAuthInfo();
  const {
    values,
    register,
    errors,
    hasError,
    clearErrors,
    setValue
  } = useFormMethods();

  const userId = userData?._id;
  const type = values['postType.type'], typeError = errors['postType.type'];
  const jobTemplateId = values['postType.jobTemplateId'], jobTemplateIdError = errors['postType.jobTemplateId'];
  const router = useRouter();

  const {
    value: searchTemplateQuery,
    bind: bindSearchTemplateQuery,
  } = useInput("");

  const searchQuery = useThrottle(searchTemplateQuery, 1000);

  const {
    state: {
      jobTemplates,
      jobTemplatesLoading,
      copyJobLoading,
    },
    setState,
  } = useComponentState({
    jobTemplates: [],
    jobTemplatesLoading: false,
    copyJobLoading: false,
  });

  const handleClickNext = () => {
    if (hasError()) {
      return;
    }

    if (type === "template") {
      copyJob();
    } else {
      if (props?.onClickNext) {
        clearErrors();
        props?.onClickNext();
      }
    }
  };

  const searchJobs = () => {
    setState({ jobTemplatesLoading: true });
    apiClient.post({
      url: endpoints.private.searchJobs,
      data: {
        keyword: searchQuery ?? "",
        userid: userId
      }
    }).then((res) => {
      setState({ jobTemplatesLoading: false });
      setState({
        jobTemplates: res?.data?.search,
      });
    }).catch(() => {
      setState({ jobTemplatesLoading: false });
      setState({
        jobTemplates: [],
      });
    });
  }

  const copyJob = () => {
    setState({ copyJobLoading: true });
    apiClient.post({
      url: endpoints.private.copyJob,
      data: {
        jobid: jobTemplateId,
      }
    }).then((res) => {
      if (res?.data) {
        const jobData = res?.data?.job;

        //setState({
        // copyJobLoading: false,
        //});

        //setValue("postType.copyJobData", jobData);
        router.push(routePaths?.employer?.editJob + '/' + jobData._id);
        /*if (props?.onClickNext) {
          clearErrors();
          props?.onClickNext();
        }*/
      }
    }).catch(() => {
      setState({ copyJobLoading: false });
    });
  };

  useEffect(() => {
    register("postType.jobTemplateId", {
      validate(value) {
        if (type === "template" && !value) {
          return "Please select a job!";
        }
        return true;
      }
    });
    if (type === "new") {
      setValue('postType.jobTemplateId', null);
    }
    if (type === "template") {
      searchJobs();
    }
  }, [type]);

  useEffect(() => {
    searchJobs();

    register("postType.type", {
      required: "Please select an option!",
    });
  }, []);

  return (
    <Box className={classes.root}>
      <JobPostBanner title="Create a job post" />
      <Box className="box">
        <Typography component="h2">
          How would you like to post your job?
        </Typography>


        {jobTemplates?.length > 0 && (
          <Box className="radio-box">
            <FormControlLabel
              value="old"
              onClick={() => setValue("postType.type", "template")}
              control={<Radio />}
              label=""
              checked={type === "template" ?? false}
            />
            <Box className="content">
              <Typography component="h3">
                Use a previous job as a template
              </Typography>
              <Typography>Copy a past job post and edit as needed.</Typography>
            </Box>
            <Button
              title="Save time"
              width="170px"
              height="45px"
              sx={{
                marginTop: "0 !important",
                pointerEvents: "none",

                "& button": {
                  height: "35px !important",
                  width: "110px !important"
                }
              }}
            />
          </Box>
        )}
        <Box className="radio-box">
          <FormControlLabel
            value="new"
            checked={type === "new" ?? false}
            onClick={() => setValue("postType.type", "new")}
            control={<Radio />}
            label=""
          />
          <Box className="content">
            <Typography component="h3">Start with a new post</Typography>
            <Typography>Use our posting tool to create your job.</Typography>
          </Box>
        </Box>

        <FormError show={typeError !== null} title={typeError} />

        {type === "template" && (
          <Box sx={{}}>
            <Box className={"search-box"}>
              <input
                type={"text"}
                placeholder={"Search job titles or locations..."}
                {...bindSearchTemplateQuery}
              />
              <SearchIcon />
            </Box>

            <Box sx={{
              overflowX: "auto",
              "& table": {
                width: "100%",
                tableLayout: "fixed",
              }
            }}>
              <TableContainer component={Paper} className={"table-container"}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 500 }}>Your Job</TableCell>
                      <TableCell sx={{ width: 200 }}>Date posted</TableCell>
                      <TableCell sx={{ width: 200 }}>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobTemplatesLoading ? (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" colSpan={3}>
                          <Loader />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {jobTemplates && jobTemplates.length > 0 && jobTemplates.map((row: any) => (
                          <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center' }}>
                              <FormControlLabel
                                onClick={() => setValue("postType.jobTemplateId", row._id)}
                                control={<Radio />}
                                label=""
                                checked={jobTemplateId === row?._id}
                              /> {row?.jobtitle}
                            </TableCell>
                            <TableCell>{row?.date}</TableCell>
                            <TableCell>{row?.adlocation}</TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {jobTemplateIdError !== null && (
              <Box sx={{
                marginTop: "15px",
              }}>
                <FormError show={true} title={jobTemplateIdError} />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box className="bottom">
        <Button
          onClick={handleClickNext}
          title="Continue"
          width="170px"
          height="60px"
          loading={copyJobLoading}
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "130px !important"
            }
          }}
        />
      </Box>
    </Box>
  );
};
