import React, { useRef, useEffect, useState, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { PhoneInputBox } from "@/components/atoms/phoneInput";
import Image from "next/image";
import InfoIcon from "@/static/images/icons/info.png";
import DeleteIcon from "@/static/images/icons/ic_delete.png";
import { Button } from "@/components/atoms/button";
import { useResumeAddStyles } from "@/static/stylesheets/apply-job/resumeAddStyles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CustomDivider } from "@/components/atoms/divider";
import UploadIcon from "@/static/images/pictures/uploadresume.png";
import { useFormMethods } from "@/hooks/form";
import { useAuthInfo } from "@/hooks/custom";
import { apiClient, endpoints } from "@/api";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

interface ResumeAddProps {
  onClickNext?(): void;
  jobid: any;
  jobcompany: string;
}
const ResumeAdd: React.FC<ResumeAddProps> = (props) => {
  const classes = useResumeAddStyles();
  const { userData } = useAuthInfo();
  const userId = userData?._id;
  const router = useRouter();

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
  let jobid = props?.jobid;
  const resumefile =
    typeof values["applyInfo.resumefile"] !== "undefined"
      ? values["applyInfo.resumefile"]
      : "";

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [created, setCreated] = useState("");

  const [allWorkExperience, setAllWorkExperience] = useState([]);
  const [allEducation, setAllEducation] = useState([]);

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
        setValue("applyInfo.resumefile", {
          file: fileObj,
          filename: fileObj.name,
          base64: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
          setFirstname(jobData.firstname);
          setLastname(jobData.lastname);
          var createdStr = "";
          var created = jobData.createddate.split("T")[0];
          var updated = jobData.updateddate.split("T")[0];

          var today: any = new Date().toISOString().slice(0, 10);
          var dtStart: any = new Date(today);

          if (today == created) {
            createdStr += "Created Today";
          } else if (today == updated) {
            createdStr += "Updated Today";
          } else if (created == updated) {
            var dtEnd: any = new Date(created);
            var diffInMs: any = dtStart - dtEnd;
            var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            createdStr += "Created " + diffInDays + " days ago";
          } else {
            var dtEnd: any = new Date(updated);
            var diffInMs: any = dtStart - dtEnd;
            var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            createdStr += "Updated " + diffInDays + " days ago";
          }
          setCreated(createdStr);

          if (typeof jobData.phonenumber !== "undefined") {
            setPhone(jobData.phonenumber);
          }
          if (typeof jobData.citystate !== "undefined") {
            setCity(jobData.citystate);
          }
          if (typeof jobData.postalcode !== "undefined") {
            setZip(jobData.postalcode);
          }

          /* Created 3 days ago
        createddate
        updateddate  */
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadresumeData();
    getallWorkExperience();
    getallEducation();
  }, [resumeId]);

  return (
    <Box className={classes.root}>
      <Box className={"info-box"}>
        <Typography component={"h2"}>
          Add a resume for {props?.jobcompany}
        </Typography>
        <Box className={"resume-box"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box className={"content"}>
              <Typography
                sx={{
                  background: "#FDEFE9",
                  borderRadius: "10px",
                  display: "inline-block",
                  color: "#844B17",
                  fontSize: { md: 14, sm: 13, xs: 12 },
                  padding: "8px 12px",
                  fontFamily: "'Urbanist', serif",
                  fontWeight: 600,
                }}
                className="recommended-item"
              >
                Recommended
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: { md: 18, sm: 17, xs: 16 },
                  padding: "10px 0 4px 0",
                  fontWeight: 600,
                  fontFamily: "'Urbanist', serif",
                }}
              >
                DayRateWork Resume
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: { md: 16, sm: 15, xs: 14 },
                  fontWeight: 600,
                  fontFamily: "'Urbanist', serif",
                }}
              >
                {created}
              </Typography>
            </Box>
            <CheckCircleIcon sx={{ color: "#8F77A4", width: 28, height: 28 }} />
          </Box>
          <CustomDivider
            style={{
              margin: "4px 0 15px 0",
              borderColor: "#8F77A4",
              height: 2,
              background: "#8F77A4",
            }}
          />
          <Box className={"details-box"}>
            <Typography component={"h2"} className="rec-name">
              {firstname} {lastname}
            </Typography>
            <Typography component={"h5"} sx={{ marginTop: 1 }}>
              {userData?.email}
            </Typography>
            <Typography component={"h5"}>+{phone}</Typography>
            <Typography component={"h5"}>
              {city} {zip}
            </Typography>
            {allWorkExperience &&
              allWorkExperience.length > 0 &&
              allWorkExperience.map((row: any) => (
                <Typography component={"h5"} sx={{ marginTop: 1 }}>
                  {row?.jobtitle}, {row?.company + " - " + row?.citystate}
                </Typography>
              ))}
            {allEducation &&
              allEducation.length > 0 &&
              allEducation.map((row: any) => (
                <Typography component={"h5"}>
                  {row?.schoolnumber}, {row?.level + " - " + row?.fieldofstudy}
                </Typography>
              ))}
          </Box>
          <Button
            title={"Edit resume"}
            onClick={() => {
              window.localStorage.setItem("jobid", jobid);
              window.open(routePaths.employees.createResume);
            }}
            btnType={"border"}
          />
        </Box>
        <CustomDivider
          style={{ color: "#8F77A4", width: 36, height: 36 }}
          dividerText={"Or"}
        />
        <Box className={"resume-box"}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box className={"content"}>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: { md: 20, sm: 17, xs: 16 },
                  padding: "8px 0",
                  fontFamily: "'Urbanist', serif",
                  fontWeight: 600,
                }}
              >
                Upload resume
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: { md: 17, sm: 16, xs: 15 },
                  fontWeight: 500,
                  fontFamily: "'Urbanist', serif",
                }}
              >
                Use a pdf, docx, doc
              </Typography>
              {typeof resumefile.filename !== "undefined" &&
                resumefile.filename !== "" && (
                  <Typography>
                    <a href={resumefile.base64} target="_blank">
                      {resumefile.filename}
                    </a>{" "}
                    &nbsp;
                    <Image
                      width={16}
                      height={16}
                      src={DeleteIcon}
                      alt={"Delete"}
                      onClick={() => {
                        setValue("applyInfo.resumefile", "");
                      }}
                    />
                  </Typography>
                )}
            </Box>

            <Image
              src={UploadIcon}
              alt={"Upload resume"}
              onClick={handleUpload}
            />
            <input
              style={{ display: "none" }}
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </Box>
        </Box>
        <Button
          title={"Continue"}
          onClick={props?.onClickNext}
          width={"170px"}
        />
      </Box>
    </Box>
  );
};

export { ResumeAdd };
