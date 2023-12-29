import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useEmployeeProfileStyles } from "@/static/stylesheets/employee/employeeProfileStyles";
import { PublicLayout, PrivateLayout } from "@/components/layouts";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PrivateResumeIcon from "@/static/images/icons/private_resume.png";
import ResumeIcon from "@/static/images/pictures/resume.png";
import ResumeReviewIcon from "@/static/images/pictures/resume_review.png";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { CustomDivider } from "@/components/atoms/divider";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { useAuthInfo } from "@/hooks/custom";
import { apiClient, endpoints } from "@/api";

const EmployeeProfile = () => {
  const classes = useEmployeeProfileStyles();
  const router = useRouter();
  const { userData } = useAuthInfo();
  const userId = userData?._id;

  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");
  const [ispublic, setIspublic] = useState(false);
  const [created, setCreated] = useState("");

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
          if (
            typeof jobData.firstname !== "undefined" &&
            typeof jobData.lastname !== "undefined"
          ) {
            setFirstname(jobData.firstname);
            setLastname(jobData.lastname);
            setAvatar(
              jobData.firstname.substr(0, 1) + jobData.lastname.substr(0, 1)
            );
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
            if (typeof jobData?.ispublic !== "undefined") {
              setIspublic(jobData?.ispublic);
            }
          } else if (
            typeof userData?.firstname !== "undefined" &&
            typeof userData?.lastname !== "undefined"
          ) {
            setFirstname(userData?.firstname);
            setLastname(userData?.lastname);
            setAvatar(
              userData?.firstname.substr(0, 1) + userData?.lastname.substr(0, 1)
            );
          }
          if (typeof jobData.phonenumber !== "undefined") {
            setPhone(jobData.phonenumber);
          } else if (typeof userData?.phone !== "undefined") {
            setPhone(userData?.phone);
          }
          if (typeof jobData.citystate !== "undefined") {
            setCity(jobData.citystate);
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    //loadresumeData();
    if (
      typeof userData?.firstname !== "undefined" &&
      typeof userData?.lastname !== "undefined"
    ) {
      setFirstname(userData?.firstname);
      setLastname(userData?.lastname);
      setAvatar(
        userData?.firstname.substr(0, 1) + userData?.lastname.substr(0, 1)
      );
    }
    if (typeof userData?.phone !== "undefined") {
      setPhone(userData?.phone);
    }
  }, [userData]);

  return (
    <PublicLayout
      pageProps={{
        title: "Employee profile",
      }}
      globalAccess={true}
    >
      <Box className={classes.root}>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexDirection: "column",
            marginBottom: 3,
          }}
          className="profile-img-contaienr"
        >
          <Avatar
            sx={{
              bgcolor: "#6D5086",
              fontSize: 40,
              padding: "35px",
              width: 120,
              height: 120,
            }}
            className="profile-img"
            src={avatar}
          />
          <Typography
            sx={{ fontSize: 25, color: "#6D5086", fontWeight: 600 }}
            className="capitalize profile-name "
          >
            {firstname} {lastname}
          </Typography>
        </Box> */}
        
        <Box className={"box"}>
          <Box className={"info"}>
            <Box>
              <Typography>{userData?.email}</Typography>
              <Typography>{phone}</Typography>
              <Typography>{city}</Typography>
            </Box>
            <a href={routePaths.accountSettings}>
              <ArrowForwardIosIcon />
            </a>
          </Box>
        </Box>

        <Box className={"box"}>
          <Box className={"info"}>
            <Box>
              <Typography>View Profile</Typography>
              <Typography>{phone}</Typography>
              <Typography>{city}</Typography>
            </Box>
            <a href={routePaths.employees.showResume}>
              <ArrowForwardIosIcon />
            </a>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 25,
            fontWeight: 500,
            color: "#000000",
            marginTop: "10px",
          }}
          className="profile-resume-title"
        >
          Resume
        </Typography>
        <Box className={"box"}>
          <Box className={"resume"}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <div className="image-container">
                <Image src={ResumeIcon} alt={""} />
              </div>
              <Box>
                <Typography component={"h2"}>DayRateWork Resume</Typography>
                <Typography>{created}</Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Image src={PrivateResumeIcon} alt={""} />{" "}
                  {ispublic ? "Public" : "Private"}
                </Typography>
              </Box>
            </Box>
            <a href={routePaths.employees.createResume}>
              <ArrowForwardIosIcon />
            </a>
          </Box>
        </Box>

        {/*<Box className={"professional"}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15 }}>
            <Box>
              <Typography component={"h2"}>Get a professional resume review</Typography>
              <Typography>Improve your resume</Typography>
            </Box>
            <Image src={ResumeReviewIcon} alt={"Review"} />
          </Box>
          <CloseIcon />
        </Box>*/}

        {/* improve section */}
        {/* <Typography sx={{ fontSize: 25, color: '#000000', fontWeight: 500, margin: '20px 0' }}>Improve your job
          matches</Typography> */}
        {/* <Box className={"text-box"}>
          <Box>
            <Typography component={"h2"}>Job preferences</Typography>
            <Typography>
              Save specific details like medium desired pay and schedule.
            </Typography>
          </Box>
          <ArrowForwardIosIcon />
        </Box> */}

        {/*<Box className={"text-box"}>
          <Box>
            <Typography component={"h2"}>Skills test</Typography>
            <Typography>Take assessments to showcase your top skills and stand out to employers.</Typography>
          </Box>
          <ArrowForwardIosIcon />
        </Box>*/}
        {/*<Box className={"text-box"}>
          <Box>
            <Typography component={"h2"}>Ready to work</Typography>
            <Typography>{`Let employers know that you're available to start working as soon as possible.`}</Typography>
          </Box>
          <ArrowForwardIosIcon />
        </Box>*/}

        {/* help section */}
        {/* <Box className={"job-seekers"}>
          <Typography component={"h2"}>Help other job seekers</Typography>
          <CustomDivider style={{ borderColor: "#dadada" }} />
          <Typography component={"h3"}>
            Participate in our salary survey <ArrowForwardIosIcon />
          </Typography>
          <CustomDivider style={{ borderColor: "#dadada" }} />
          <Typography component={"h3"}>
            {`Review companies you've worked for `}
            <ArrowForwardIosIcon />
          </Typography>
          <CustomDivider style={{ borderColor: "#dadada" }} />
          <Typography component={"h3"}>
            Review your certification programs <ArrowForwardIosIcon />
          </Typography>
          <CustomDivider style={{ borderColor: "#dadada" }} />
          <Typography component={"h3"}>
            Manage your demographic data <ArrowForwardIosIcon />
          </Typography>
          <CustomDivider style={{ borderColor: "#dadada" }} />
        </Box> */}
      </Box>
    </PublicLayout>
  );
};

export default EmployeeProfile;
