import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import { useReviewApplicationStyles } from "@/static/stylesheets/apply-job";
import { CustomDivider } from "@/components/atoms/divider";
import Image from "next/image";
import InfoIcon from "@/static/images/icons/info.png";
import DeleteIcon from "@/static/images/icons/ic_delete.png";
import { Button } from "@/components/atoms/button";
import { useFormMethods } from "@/hooks/form";
import { useAuthInfo } from "@/hooks/custom";
import { apiClient, endpoints } from "@/api";
import { useRouter } from "next/router";
import { appConfig, routePaths } from "@/config";

const month_list = [
  { id: 0, value: "Month" },
  { id: 1, value: "January" },
  { id: 2, value: "February" },
  { id: 3, value: "March" },
  { id: 4, value: "April" },
  { id: 5, value: "May" },
  { id: 6, value: "June" },
  { id: 7, value: "July" },
  { id: 8, value: "August" },
  { id: 9, value: "September" },
  { id: 10, value: "October" },
  { id: 11, value: "November" },
  { id: 12, value: "December" },
];

interface ReviewApplicationProps {
  jobid: number;
  jobcompany: string;
}
const ReviewApplication: React.FC<ReviewApplicationProps> = (props) => {
  const classes = useReviewApplicationStyles();
  const router = useRouter();
  const { userData } = useAuthInfo();
  const userId = userData?._id;

  const {
    bindInput,
    values,
    register,
    setValue,
    errors,
    hasError,
    clearErrors,
  } = useFormMethods();
  let resumeId =
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : 0;
  let resid = window.localStorage.getItem("resid");
  if (resid && Number(resid) > 0) {
    resumeId = resid;
  }
  let phone =
    typeof values["applyInfo.phone"] !== "undefined"
      ? values["applyInfo.phone"]
      : "";
  let rphone = window.localStorage.getItem("rphone");
  if (rphone && Number(rphone) > 0) {
    phone = rphone;
  }
  let firstname =
    typeof values["applyInfo.firstname"] !== "undefined"
      ? values["applyInfo.firstname"]
      : "";
  let fname = window.localStorage.getItem("fname");
  if (fname && fname != "") {
    firstname = fname;
  }
  let lastname =
    typeof values["applyInfo.lastname"] !== "undefined"
      ? values["applyInfo.lastname"]
      : "";
  let lname = window.localStorage.getItem("lname");
  if (lname && lname != "") {
    lastname = lname;
  }
  //const uploadfile = (typeof values['applyInfo.uploadfile'] !== "undefined") ? values['applyInfo.uploadfile']:[];
  const resumefile =
    typeof values["applyInfo.resumefile"] !== "undefined"
      ? values["applyInfo.resumefile"]
      : "";
  const [uploadfile, setUploadfile] = useState([]);

  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const [summary, setSummary] = useState("");

  const [allWorkExperience, setAllWorkExperience] = useState([]);
  const [allEducation, setAllEducation] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [allAdditional, setAllAdditional] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allLinks, setAllLinks] = useState([]);
  const [allMilitary, setAllMilitary] = useState([]);
  const [allAwards, setAllAwards] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [allPatents, setAllPatents] = useState([]);
  const [allPublications, setAllPublications] = useState([]);

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //console.log("Called", reader);
        var baseURL = reader.result;
        //console.log(baseURL);
        resolve(baseURL);
      };
      //console.log(fileInfo);
    });
  };

  let inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    //console.log('fileObj is', fileObj);
    event.target.value = null;
    //console.log(event.target.files);
    //console.log(fileObj);
    //console.log(fileObj.name);

    getBase64(fileObj)
      .then((result: any) => {
        var tempupload: any = [];
        for (var uf = 0; uf < uploadfile.length; uf++) {
          tempupload.push(uploadfile[uf]);
        }
        tempupload.push({
          file: fileObj,
          filename: fileObj.name,
          base64: result,
        });
        setUploadfile(tempupload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletefile = (index: number) => {
    var tempupload: any = [];
    for (var uf = 0; uf < uploadfile.length; uf++) {
      if (uf != index) {
        tempupload.push(uploadfile[uf]);
      }
    }
    setUploadfile(tempupload);
    /*setUploadfile([...uploadfile.slice(index+1)]);*/
  };

  const handleApplyJobSubmit = () => {
    let data: { [key: string]: any } = {};
    data.profileUrl = `${appConfig.appBaseUrl}/${routePaths.employees.showResume}/`
    data.resumeid = resumeId;
    data.userid = userId;
    data.jobid = props?.jobid;

    data.firstname = firstname;
    data.lastname = lastname;
    data.email = userData?.email;
    data.phonenumber = phone;

    if (
      typeof resumefile.filename !== "undefined" &&
      resumefile.filename !== ""
    ) {
      data.resumedocs = {
        file_name: resumefile.filename,
        file_data: resumefile.base64,
      };
    }

    if (uploadfile.length > 0) {
      var tempupload: any = [];
      for (var uf = 0; uf < uploadfile.length; uf++) {
        let data: { [key: string]: any } = uploadfile[uf];
        tempupload.push({ file_name: data.filename, file_data: data.base64 });
      }
      data.supportdatalist = tempupload;
    }

    //console.log(JSON.stringify(data));

    apiClient
      .post({
        url: endpoints.private.jobApply,
        data,
      })
      .then((res) => {
        gotoSuccessPage(props?.jobid);
      })
      .catch(() => {});
  };

  const loadresumeData = async () => {
    await apiClient
      .post({
        url: endpoints.private.getResumebyUser,
        data: {
          userid: userId,
        },
      })
      .then((res) => {
        if (res?.data) {
          const jobData = res?.data?.resume;
          if (typeof jobData.resumeheadline !== "undefined") {
            setSummary(jobData.resumeheadline);
          }
          if (typeof jobData.citystate !== "undefined") {
            setCity(jobData.citystate);
          }
          if (typeof jobData.postalcode !== "undefined") {
            setZip(jobData.postalcode);
          }
        }
      })
      .catch(() => {});
  };

  const getallWorkExperience = () => {
    apiClient
      .post({
        url: endpoints.private.getallWorkExperience,
        data: {
          resid: resumeId,
        },
      })
      .then((res) => {
        setAllWorkExperience(res?.data?.workexpdata);
      })
      .catch(() => {
        setAllWorkExperience([]);
      });
  };

  const getallEducation = () => {
    apiClient
      .post({
        url: endpoints.private.getallEducation,
        data: {
          resid: resumeId,
        },
      })
      .then((res) => {
        setAllEducation(res?.data?.edudata);
      })
      .catch(() => {
        setAllEducation([]);
      });
  };

  const getallSkills = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Skills",
        },
      })
      .then((res) => {
        setAllSkills(res?.data?.cactividata);
      })
      .catch(() => {
        setAllSkills([]);
      });
  };

  const getallCertificates = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Certificates",
        },
      })
      .then((res) => {
        setAllCertificates(res?.data?.cactividata);
      })
      .catch(() => {
        setAllCertificates([]);
      });
  };

  const getallAdditional = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Additional",
        },
      })
      .then((res) => {
        setAllAdditional(res?.data?.cactividata);
      })
      .catch(() => {
        setAllAdditional([]);
      });
  };

  const getallLanguages = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Languages",
        },
      })
      .then((res) => {
        setAllLanguages(res?.data?.cactividata);
      })
      .catch(() => {
        setAllLanguages([]);
      });
  };

  const getallLinks = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Links",
        },
      })
      .then((res) => {
        setAllLinks(res?.data?.cactividata);
      })
      .catch(() => {
        setAllLinks([]);
      });
  };

  const getallMilitary = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Military",
        },
      })
      .then((res) => {
        setAllMilitary(res?.data?.cactividata);
      })
      .catch(() => {
        setAllMilitary([]);
      });
  };

  const getallAwards = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Awards",
        },
      })
      .then((res) => {
        setAllAwards(res?.data?.cactividata);
      })
      .catch(() => {
        setAllAwards([]);
      });
  };

  const getallGroups = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Groups",
        },
      })
      .then((res) => {
        setAllGroups(res?.data?.cactividata);
      })
      .catch(() => {
        setAllGroups([]);
      });
  };

  const getallPatents = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Patents",
        },
      })
      .then((res) => {
        setAllPatents(res?.data?.cactividata);
      })
      .catch(() => {
        setAllPatents([]);
      });
  };

  const getallPublications = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Publications",
        },
      })
      .then((res) => {
        setAllPublications(res?.data?.cactividata);
      })
      .catch(() => {
        setAllPublications([]);
      });
  };

  useEffect(() => {
    loadresumeData();
    getallWorkExperience();
    getallEducation();
    getallSkills();
    getallCertificates();
    getallAdditional();
    getallLanguages();
    getallLinks();
    getallMilitary();
    getallAwards();
    getallGroups();
    getallPatents();
    getallPublications();
  }, [resumeId]);

  const gotoSuccessPage = async (jobId: any) => {
    let data: { [key: string]: any } = {};
    data.userid = userId;
    data.jobid = jobId;
    await apiClient
      .post({
        url: endpoints.private.deleteJobSaved,
        data,
      })
      .then((res) => {
        router.push(routePaths.contractor.applicationSubmit);
      })
      .catch(() => {});
  };

  return (
    <Box className={classes.root}>
      <Typography
        sx={{
          fontSize: { md: 36, sm: 24, xs: 20 },
          fontWeight: 600,
          color: "#000000",
          fontFamily: "'Urbanist', serif",
        }}
        className="please-review"
      >
        Please review your application
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#5A5A5A",
            fontSize: { md: 24, sm: 20, xs: 18 },
            fontWeight: 600,
            fontFamily: "'Urbanist', serif",
          }}
        >
          Contact information
        </Typography>
        <Typography
          sx={{
            color: "#6D5086",
            fontSize: { md: 24, sm: 20, xs: 18 },
            fontWeight: 600,
            fontFamily: "'Urbanist', serif",
          }}
        >
          Edit
        </Typography>
      </Box>
      <Box className={"review-box"} mt={2}>
        <Box className={"single-box"}>
          <Typography component={"h4"}>First Name</Typography>
          <Typography component={"h2"}>{firstname}</Typography>
        </Box>
        <CustomDivider
          style={{
            margin: "20px 0",
            borderColor: "#8F77A4",
            height: 2,
            background: "#8F77A4",
          }}
        />
        <Box className={"single-box"}>
          <Typography component={"h4"}>Last Name</Typography>
          <Typography component={"h2"}>{lastname}</Typography>
        </Box>
        <CustomDivider
          style={{
            margin: "20px 0",
            borderColor: "#8F77A4",
            height: 2,
            background: "#8F77A4",
          }}
        />
        <Box className={"single-box"}>
          <Typography component={"h4"}>Email Address</Typography>
          <Typography component={"h2"}>{userData?.email}</Typography>
        </Box>
        <CustomDivider
          style={{
            margin: "20px 0",
            borderColor: "#8F77A4",
            height: 2,
            background: "#8F77A4",
          }}
        />
        <Box className={"single-box"}>
          <Typography component={"h4"}>Phone Number</Typography>
          <Typography component={"h2"}>+{phone}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { md: 24, sm: 20, xs: 18 },
            color: "#5A5A5A",
            fontFamily: "'Urbanist', serif",
            fontWeight: 600,
          }}
        >
          Resume
        </Typography>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          {typeof resumefile.filename !== "undefined" &&
            resumefile.filename !== "" && (
              <Typography
                sx={{
                  fontSize: { md: 24, sm: 20, xs: 18 },
                  color: "#6D5086",
                  fontFamily: "'Urbanist', serif",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <a href={resumefile.base64} target="_blank">
                  Download
                </a>
              </Typography>
            )}
          {resumefile === "" && (
            <Typography
              sx={{
                fontSize: { md: 24, sm: 20, xs: 18 },
                color: "#6D5086",
                fontFamily: "'Urbanist', serif",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <a href={routePaths.employees.createResume} target="_blank">
                Edit
              </a>
            </Typography>
          )}
        </Box>
      </Box>
      {typeof resumefile.filename !== "undefined" &&
      resumefile.filename !== "" ? (
        <Typography>{resumefile.filename}</Typography>
      ) : (
        <Box className={"review-box"} mt={2}>
          <Typography
            sx={{
              fontSize: { md: 36, sm: 24, xs: 20 },
              fontWeight: 600,
              color: "#000000",
            }}
          >
            {firstname} {lastname}
          </Typography>
          <Box className="info">
            <Typography>
              {city} {zip}
            </Typography>
            <Typography>{userData?.email}</Typography>
            <Typography>+{phone}</Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: { md: 28, sm: 24, xs: 20 },
                fontWeight: 600,
                color: "#000000",
                marginTop: 3,
              }}
            >
              Work Experience
            </Typography>
            <CustomDivider
              style={{
                margin: "20px 0",
                borderColor: "#8F77A4",
                height: 2,
                background: "#8F77A4",
              }}
            />
            {allWorkExperience &&
              allWorkExperience.length > 0 &&
              allWorkExperience.map((row: any, index) => (
                <Box key={"we" + index} className={"card"}>
                  <Typography component={"h2"}>{row?.jobtitle}</Typography>
                  <Typography component={"h4"}>
                    {row?.company + " - " + row?.citystate}
                  </Typography>
                  <Typography>
                    {month_list[row?.frommonth].value +
                      " " +
                      row?.fromyear +
                      " to " +
                      (!row?.currentlywork
                        ? month_list[row?.tomonth].value + " " + row?.toyear
                        : "Present")}
                  </Typography>
                </Box>
              ))}
          </Box>
          <Box mt={4}>
            <Typography
              sx={{
                fontSize: { md: 28, sm: 24, xs: 20 },
                fontWeight: 600,
                color: "#000000",
                marginTop: 3,
              }}
            >
              Education
            </Typography>
            <CustomDivider
              style={{
                margin: "20px 0",
                borderColor: "#8F77A4",
                height: 2,
                background: "#8F77A4",
              }}
            />
            {allEducation &&
              allEducation.length > 0 &&
              allEducation.map((row: any, index) => (
                <Box key={"ed" + index} className={"card"}>
                  <Typography component={"h2"}>
                    {row?.level + " in " + row?.fieldofstudy}
                  </Typography>
                  <Typography component={"h4"}>{row?.schoolnumber}</Typography>
                  <Typography>
                    {month_list[row?.frommonth].value +
                      " " +
                      row?.fromyear +
                      " to " +
                      (!row?.currentlyenrolled
                        ? month_list[row?.tomonth].value + " " + row?.toyear
                        : "Present")}
                  </Typography>
                </Box>
              ))}
          </Box>
          <Box mt={4}>
            <Typography
              sx={{
                fontSize: { md: 28, sm: 24, xs: 20 },
                fontWeight: 600,
                color: "#000000",
                marginTop: 3,
              }}
            >
              Skills
            </Typography>
            <CustomDivider
              style={{
                margin: "20px 0",
                borderColor: "#8F77A4",
                height: 2,
                background: "#8F77A4",
              }}
            />
            <Box className={"card"}>
              {allSkills &&
                allSkills.length > 0 &&
                allSkills.map((row: any, index) => (
                  <Typography key={"sk" + index} component={"h2"}>
                    {row?.activities}
                  </Typography>
                ))}
            </Box>
          </Box>
          <Box mt={4}>
            <Typography
              sx={{
                fontSize: { md: 28, sm: 24, xs: 20 },
                fontWeight: 600,
                color: "#000000",
                marginTop: 3,
              }}
            >
              Certifications / Licenses
            </Typography>
            <CustomDivider
              style={{
                margin: "20px 0",
                borderColor: "#8F77A4",
                height: 2,
                background: "#8F77A4",
              }}
            />
            <Box className={"card"}>
              {allCertificates &&
                allCertificates.length > 0 &&
                allCertificates.map((row: any, index) => (
                  <Typography key={"ce" + index} component={"h2"}>
                    {row?.activities}
                  </Typography>
                ))}
            </Box>
          </Box>
          {allAdditional.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Additional Information
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allAdditional &&
                  allAdditional.length > 0 &&
                  allAdditional.map((row: any, index) => (
                    <Typography key={"ad" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
          {allLanguages.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Languages
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allLanguages &&
                  allLanguages.length > 0 &&
                  allLanguages.map((row: any, index) => (
                    <Typography key={"la" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
          {allLinks.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Links
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allLinks &&
                  allLinks.length > 0 &&
                  allLinks.map((row: any, index) => (
                    <Typography key={"li" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
          {allMilitary.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Military Service
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allMilitary &&
                  allMilitary.length > 0 &&
                  allMilitary.map((row: any, index) => (
                    <Typography key={"mi" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
          {allAwards.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Awards
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allAwards &&
                  allAwards.length > 0 &&
                  allAwards.map((row: any, index) => (
                    <Typography key={"aw" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
          {allGroups.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Groups
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allGroups &&
                  allGroups.length > 0 &&
                  allGroups.map((row: any, index) => (
                    <Typography key={"gr" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
          {allPatents.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Patents
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allPatents &&
                  allPatents.length > 0 &&
                  allPatents.map((row: any, index) => (
                    <Typography key={"pa" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
          {allPublications.length > 0 && (
            <Box mt={4}>
              <Typography
                sx={{
                  fontSize: { md: 28, sm: 24, xs: 20 },
                  fontWeight: 600,
                  color: "#000000",
                  marginTop: 3,
                }}
              >
                Publications
              </Typography>
              <CustomDivider
                style={{
                  margin: "20px 0",
                  borderColor: "#8F77A4",
                  height: 2,
                  background: "#8F77A4",
                }}
              />
              <Box className={"card"}>
                {allPublications &&
                  allPublications.length > 0 &&
                  allPublications.map((row: any, index) => (
                    <Typography key={"pu" + index} component={"h2"}>
                      {row?.activities}
                    </Typography>
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: { md: 24, sm: 20, xs: 18 },
            color: "#5A5A5A",
            fontFamily: "'Urbanist', serif",
            fontWeight: 600,
          }}
        >
          Supporting documents
        </Typography>

        <Typography
          sx={{
            fontSize: { md: 24, sm: 20, xs: 18 },
            color: "#6D5086",
            fontFamily: "'Urbanist', serif",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <a onClick={handleUpload}>Add</a>
        </Typography>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </Box>
      {uploadfile &&
        uploadfile.length > 0 &&
        uploadfile.map((row: any, index) => (
          <Typography key={"uf" + index}>
            {row?.filename}{" "}
            <Image
              width={16}
              height={16}
              src={DeleteIcon}
              alt={"Delete"}
              onClick={() => {
                handleDeletefile?.(index);
              }}
            />
          </Typography>
        ))}
      {uploadfile.length == 0 && (
        <Box
          sx={{
            background: "#8F77A4",
            borderRadius: "10px",
            padding: "40px",
            marginTop: 3,
          }}
        >
          <Typography sx={{ color: "#ffffff !important", fontSize: 20 }}>
            No cover letter or additional documents included (optional)
          </Typography>
        </Box>
      )}
      <Typography
        sx={{
          fontSize: { md: 24, sm: 20, xs: 17 },
          color: "#000000",
          fontFamily: "'Urbanist', serif",
          marginTop: 4,
        }}
      >
        If you notice an error in your application, please{" "}
        <span style={{ color: "#6D5086", textDecoration: "underline" }}>
          <a href="/contact-us">contact DayRateWork</a>
        </span>
      </Typography>
      <CustomDivider
        style={{
          margin: "20px 0",
          borderColor: "#8F77A4",
          height: 2,
          background: "#8F77A4",
        }}
      />
      <Typography
        sx={{
          color: "#7A5F90",
          fontSize: { md: 20, sm: 18, xs: 16 },
          fontFamily: "'Urbanist', serif",
        }}
      >
        By applying this Job: 1) you agree to our Terms, Cookie & Privacy
        Policies; 2) you consent to your application being transmitted to the
        Employer (Dayratework does not guarantee receipt), & processed &
        analyzed in accordance with its & Dayratework's terms & privacy
        policies; & 3) you acknowledge that when you apply to jobs outside your
        country it may involve you sending your personal data to countries with
        lower levels of data protection.
      </Typography>
      <Button
        title={"Submit your application"}
        width={"310px"}
        onClick={handleApplyJobSubmit}
        height={"60px"}
      />
    </Box>
  );
};

export { ReviewApplication };
