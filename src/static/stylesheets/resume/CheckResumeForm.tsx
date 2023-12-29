import { Button } from "@/components/atoms/button";
import { ReviewCard } from "@/components/layouts";
import deleteIcon from "@/static/images/icons/ic_delete.png";
import { Box, fabClasses, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { CustomDivider } from "@/components/atoms/divider";
import { useCheckResumeFormStyles } from "@/static/stylesheets/resume/checkResumeStyles";
import { TextInputDialog } from "@/components/molecules/modal/TextInputModal";
import { EditorInputDialog } from "@/components/molecules/modal/EditorInputModal";
import CreateIcon from "@mui/icons-material/Create";
import { LeftIconBox } from "@/components/atoms/textWithIcon";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import { useAuthInfo } from "@/hooks/custom";
import toast from "react-hot-toast";

interface CheckResumeFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickGoto?(step: number): void;
  onClickExit?(): void;
}

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

const CheckResumeForm: React.FC<CheckResumeFormProps> = (props) => {
  const classes = useCheckResumeFormStyles();
  const { userData } = useAuthInfo();
  const userId = userData?._id;
  const { values, setValue } = useFormMethods();
  let resumeId =
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : "";

  const [TextInputDialogOpen, setTextInputDialogOpen] = useState(false);
  const [EditorInputDialogOpen, setEditorInputDialogOpen] = useState(false);
  const [section, setSection] = useState("");
  const [tmpValue, setTmpValue] = useState("");
  const [actId, setActId] = useState(0);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
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
          setPhone(jobData.phonenumber);
          setCity(jobData.citystate);
          setSummary(jobData.resumeheadline);
          if (!resumeId) {
            setValue("resumeId", jobData._id);
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

  const handleDeleteWorkExp = (workexpId: any) => {
    apiClient
      .post({
        url: endpoints.private.deleteWorkExperience,
        data: {
          workexpid: workexpId,
        },
      })
      .then((res) => {
        getallWorkExperience();
      })
      .catch(() => {});
  };

  const handleEditWorkExp = (workexpId: any) => {
    setValue("workexpId", workexpId);
    if (props?.onClickGoto) {
      props?.onClickGoto?.(6);
    }
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

  const handleDeleteEdu = (eduId: any) => {
    apiClient
      .post({
        url: endpoints.private.deleteEducation,
        data: {
          eduid: eduId,
        },
      })
      .then((res) => {
        getallEducation();
      })
      .catch(() => {});
  };

  const handleEditEdu = (eduId: any) => {
    setValue("eduId", eduId);
    if (props?.onClickGoto) {
      props?.onClickGoto?.(4);
    }
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

  const handleDeleteAct = (cactiviId: any, type: any) => {
    apiClient
      .post({
        url: endpoints.private.deleteCurricularActivities,
        data: {
          curractid: cactiviId,
        },
      })
      .then((res) => {
        if (type == "Skills") {
          getallSkills();
        }
        if (type == "Certificates") {
          getallCertificates();
        }
        if (type == "Additional") {
          getallAdditional();
        }
        if (type == "Languages") {
          getallLanguages();
        }
        if (type == "Links") {
          getallLinks();
        }
        if (type == "Military") {
          getallMilitary();
        }
        if (type == "Awards") {
          getallAwards();
        }
        if (type == "Groups") {
          getallGroups();
        }
        if (type == "Patents") {
          getallPatents();
        }
        if (type == "Publications") {
          getallPublications();
        }
      })
      .catch(() => {});
  };

  const handleUpdateAct = () => {
    let data: { [key: string]: any } = {};
    data.resid = resumeId;
    if (actId > 0) {
      data.curractid = actId;
    } else {
      data.userid = userId;
    }
    data.activities = tmpValue;
    data.type = section;
    //console.log(data);

    apiClient
      .post({
        url:
          actId > 0
            ? endpoints.private.updateCurricularActivities
            : endpoints.private.createCurricularActivities,
        data,
      })
      .then((res) => {
        if (section == "Skills") {
          getallSkills();
        }
        if (section == "Certificates") {
          getallCertificates();
        }
        if (section == "Additional") {
          getallAdditional();
        }
        if (section == "Languages") {
          getallLanguages();
        }
        if (section == "Links") {
          getallLinks();
        }
        if (section == "Military") {
          getallMilitary();
        }
        if (section == "Awards") {
          getallAwards();
        }
        if (section == "Groups") {
          getallGroups();
        }
        if (section == "Patents") {
          getallPatents();
        }
        if (section == "Publications") {
          getallPublications();
        }
        setTextInputDialogOpen(false);
        setTmpValue("");
        setSection("");
        setActId(0);
      })
      .catch(() => {});
  };

  const handleUpdateSummary = () => {
    let data: { [key: string]: any } = {};
    data.resid = resumeId;
    data.resumeheadline = summary;
    console.log(data);
    apiClient
      .post({
        url: endpoints.private.resumeHeadline,
        data,
      })
      .then((res) => {
        setEditorInputDialogOpen(false);
      })
      .catch(() => {});
  };

  const handleClickNext = (saveExit: boolean) => {
    if (saveExit) {
      if (props?.onClickExit) {
        props?.onClickExit();
      }
    } else {
      if (props?.onClickNext) {
        props?.onClickNext();
      }
    }
  };

  useEffect(() => {
    if (resumeId > 0) {
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
    }
  }, [resumeId]);

  return (
    <Box className={classes.root} sx={{ position: "relative" }}>
      <Typography
        sx={{
          color: "#6D5086",
          fontSize: 24,
          cursor: "pointer",
          position: "absolute",
          right: "0px",
          top: "-75px",
        }}
        onClick={() => {
          handleClickNext(true);
        }}
      >
        {" "}
        Save and exit{" "}
      </Typography>
      <Box className="box">
        <Typography component="h2">what is your nameme ready?</Typography>
        <Typography component="span">
          Review and make any changes below
        </Typography>

        <Box className="info-box">
          <Box className="name-section">
            <Typography component="h2">
              {firstname} {lastname}
            </Typography>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => {
                props?.onClickGoto?.(1);
              }}
            >
              <CreateIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box className="info">
            <Typography>{city}</Typography>
            <Typography>{userData?.email}</Typography>
            <Typography>{phone}</Typography>
          </Box>

          {/*<LeftIconBox
            title="Add your headline or summary"
            onClick={() => { setEditorInputDialogOpen(true); }}
            type="normal"
          />*/}

          <Box
            className="title-section"
            onClick={() => {
              setEditorInputDialogOpen(true);
            }}
            style={{ width: 300, cursor: "pointer" }}
          >
            <IconButton aria-label="delete" size="medium">
              {summary != "" ? (
                <EditIcon fontSize="inherit" />
              ) : (
                <AddIcon fontSize="inherit" />
              )}
            </IconButton>
            <Typography style={{ fontWeight: 700, fontSize: "16px" }}>
              {summary != "" ? ` Edit` : ` Add`} your headline or summary
            </Typography>
          </Box>

          {summary != "" && (
            <Box className="info">
              <br></br>
              <Typography>{summary}</Typography>
            </Box>
          )}

          <Box className="title-section">
            <Typography component="h2">Work Experience</Typography>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                props?.onClickGoto?.(6);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <CustomDivider
            style={{
              borderColor: "#6D5086",
              margin: "4px 0",
              height: "1.5px",
              background: "#6D5086",
            }}
          />
          {allWorkExperience &&
            allWorkExperience.length > 0 &&
            allWorkExperience.map((row: any) => (
              <ReviewCard
                key={row?._id}
                id={row?._id}
                title={row?.jobtitle}
                sub_title={row?.company + " - " + row?.citystate}
                timePeriod={
                  month_list[row?.frommonth].value +
                  " " +
                  row?.fromyear +
                  " to " +
                  (!row?.currentlywork
                    ? month_list[row?.tomonth].value + " " + row?.toyear
                    : "Present")
                }
                onClickEdit={handleEditWorkExp}
                onClickDelete={handleDeleteWorkExp}
              />
            ))}

          <Box className="title-section">
            <Typography component="h2">Education</Typography>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                props?.onClickGoto?.(4);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <CustomDivider
            style={{
              borderColor: "#6D5086",
              margin: "4px 0",
              height: "1.5px",
              background: "#6D5086",
            }}
          />
          {allEducation &&
            allEducation.length > 0 &&
            allEducation.map((row: any) => (
              <ReviewCard
                key={row?._id}
                id={row?._id}
                title={row?.level + " in " + row?.fieldofstudy}
                sub_title={row?.schoolnumber}
                timePeriod={
                  month_list[row?.frommonth]?.value +
                  " " +
                  row?.fromyear +
                  " to " +
                  (!row?.currentlyenrolled
                    ? month_list[row?.tomonth]?.value + " " + row?.toyear
                    : "Present")
                }
                onClickEdit={handleEditEdu}
                onClickDelete={handleDeleteEdu}
              />
            ))}

          <Box className="title-section">
            <Typography component="h2">Skills</Typography>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                setSection("Skills");
                setTextInputDialogOpen(true);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <CustomDivider
            style={{
              borderColor: "#6D5086",
              margin: "4px 0",
              height: "1.5px",
              background: "#6D5086",
            }}
          />
          {allSkills &&
            allSkills.length > 0 &&
            allSkills.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSection("Skills");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Skills")}
                  />
                </Box>
              </Box>
            ))}

          <Box className="title-section">
            <Typography component="h2">Certifications / Licenses</Typography>
            <IconButton
              aria-label="add"
              size="small"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setSection("Certificates");
                setTextInputDialogOpen(true);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <CustomDivider
            style={{
              borderColor: "#6D5086",
              margin: "4px 0",
              height: "1.5px",
              background: "#6D5086",
            }}
          />
          {allCertificates &&
            allCertificates.length > 0 &&
            allCertificates.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSection("Certificates");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Certificates")}
                  />
                </Box>
              </Box>
            ))}

          <Box className="title-section">
            <Typography component="h2">Additional Information</Typography>
            <IconButton
              aria-label="add"
              size="small"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setSection("Additional");
                setTextInputDialogOpen(true);
              }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <CustomDivider
            style={{
              borderColor: "#6D5086",
              margin: "4px 0",
              height: "1.5px",
              background: "#6D5086",
            }}
          />
          {allAdditional &&
            allAdditional.length > 0 &&
            allAdditional.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    sx={{ cursor: "pointer" }}
                    size="medium"
                    onClick={() => {
                      setSection("Additional");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Additional")}
                  />
                </Box>
              </Box>
            ))}

          {allLanguages.length > 0 && (
            <>
              <Box className="title-section">
                <Typography component="h2">Languages</Typography>
                <IconButton
                  aria-label="add"
                  sx={{ cursor: "pointer" }}
                  size="medium"
                  onClick={() => {
                    setSection("Languages");
                    setTextInputDialogOpen(true);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          {allLanguages &&
            allLanguages.length > 0 &&
            allLanguages.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSection("Languages");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Languages")}
                  />
                </Box>
              </Box>
            ))}

          {allLinks.length > 0 && (
            <>
              <Box className="title-section">
                <Typography component="h2">Links</Typography>
                <IconButton
                  aria-label="add"
                  size="medium"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSection("Links");
                    setTextInputDialogOpen(true);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          {allLinks &&
            allLinks.length > 0 &&
            allLinks.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    sx={{ cursor: "pointer" }}
                    size="medium"
                    onClick={() => {
                      setSection("Links");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Links")}
                  />
                </Box>
              </Box>
            ))}

          {allMilitary.length > 0 && (
            <>
              <Box className="title-section">
                <Typography component="h2">Military</Typography>
                <IconButton
                  aria-label="add"
                  size="medium"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSection("Military");
                    setTextInputDialogOpen(true);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          {allMilitary &&
            allMilitary.length > 0 &&
            allMilitary.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSection("Military");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Military")}
                  />
                </Box>
              </Box>
            ))}

          {allAwards.length > 0 && (
            <>
              <Box className="title-section">
                <Typography component="h2">Awards</Typography>
                <IconButton
                  aria-label="add"
                  sx={{ cursor: "pointer" }}
                  size="medium"
                  onClick={() => {
                    setSection("Awards");
                    setTextInputDialogOpen(true);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          {allAwards &&
            allAwards.length > 0 &&
            allAwards.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSection("Awards");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Awards")}
                  />
                </Box>
              </Box>
            ))}

          {allGroups.length > 0 && (
            <>
              <Box className="title-section">
                <Typography component="h2">Groups</Typography>
                <IconButton
                  aria-label="add"
                  size="medium"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSection("Groups");
                    setTextInputDialogOpen(true);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          {allGroups &&
            allGroups.length > 0 &&
            allGroups.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    size="medium"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setSection("Groups");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Groups")}
                  />
                </Box>
              </Box>
            ))}

          {allPatents.length > 0 && (
            <>
              <Box className="title-section">
                <Typography component="h2">Patents</Typography>
                <IconButton
                  aria-label="add"
                  size="medium"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSection("Patents");
                    setTextInputDialogOpen(true);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          {allPatents &&
            allPatents.length > 0 &&
            allPatents.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    sx={{ cursor: "pointer" }}
                    size="medium"
                    onClick={() => {
                      setSection("Patents");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Patents")}
                  />
                </Box>
              </Box>
            ))}

          {allPublications.length > 0 && (
            <>
              <Box className="title-section">
                <Typography component="h2">Publications</Typography>
                <IconButton
                  aria-label="add"
                  sx={{ cursor: "pointer" }}
                  size="medium"
                  onClick={() => {
                    setSection("Publications");
                    setTextInputDialogOpen(true);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          {allPublications &&
            allPublications.length > 0 &&
            allPublications.map((row: any) => (
              <Box className="skill" key={row?._id}>
                <Typography component="h2">{row?.activities}</Typography>
                <Box className="action">
                  <IconButton
                    aria-label="delete"
                    sx={{ cursor: "pointer" }}
                    size="medium"
                    onClick={() => {
                      setSection("Publications");
                      setTmpValue(row?.activities);
                      setActId(row?._id);
                      setTextInputDialogOpen(true);
                    }}
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <Image
                    src={deleteIcon}
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteAct?.(row?._id, "Publications")}
                  />
                </Box>
              </Box>
            ))}

          {(allLanguages.length == 0 ||
            allLinks.length == 0 ||
            allMilitary.length == 0 ||
            allAwards.length == 0 ||
            allGroups.length == 0 ||
            allPatents.length == 0 ||
            allPublications.length == 0) && (
            <>
              <Box className="title-section">
                <Typography component="h2">Add Sections</Typography>
              </Box>
              <CustomDivider
                style={{
                  borderColor: "#6D5086",
                  margin: "4px 0",
                  height: "1.5px",
                  background: "#6D5086",
                }}
              />
            </>
          )}
          <Box className="add-section">
            {allLanguages.length == 0 && (
              <LeftIconBox
                title="Languages"
                onClick={() => {
                  setSection("Languages");
                  setTextInputDialogOpen(true);
                }}
                type="normal"
              />
            )}
            {allLinks.length == 0 && (
              <LeftIconBox
                title="Links"
                onClick={() => {
                  setSection("Links");
                  setTextInputDialogOpen(true);
                }}
                type="normal"
              />
            )}
            {/* {allMilitary.length == 0 && (
              <LeftIconBox
                title="Military Service"
                onClick={() => {
                  setSection("Military");
                  setTextInputDialogOpen(true);
                }}
                type="normal"
              />
            )}
            {allAwards.length == 0 && (
              <LeftIconBox
                title="Awards"
                onClick={() => {
                  setSection("Awards");
                  setTextInputDialogOpen(true);
                }}
                type="normal"
              />
            )} */}
            {allGroups.length == 0 && (
              <LeftIconBox
                title="Groups"
                onClick={() => {
                  setSection("Groups");
                  setTextInputDialogOpen(true);
                }}
                type="normal"
              />
            )}
            {allPatents.length == 0 && (
              <LeftIconBox
                title="Patents"
                onClick={() => {
                  setSection("Patents");
                  setTextInputDialogOpen(true);
                }}
                type="normal"
              />
            )}
            {/* {allPublications.length == 0 && (
              <LeftIconBox
                title="Publications"
                onClick={() => {
                  setSection("Publications");
                  setTextInputDialogOpen(true);
                }}
                type="normal"
              />
            )} */}
          </Box>
        </Box>

        <TextInputDialog
          open={TextInputDialogOpen}
          onClose={() => {
            setTextInputDialogOpen(false);
            setTmpValue("");
            setSection("");
            setActId(0);
          }}
          label={section}
          value={tmpValue}
          onChange={(value) => {
            setTmpValue(value);
          }}
          onClick={() => {
            if (tmpValue == "") {
              toast.error("Please Input all required fields!");
              return false;
            }
            handleUpdateAct();
          }}
        />

        <EditorInputDialog
          open={EditorInputDialogOpen}
          onClose={() => {
            setEditorInputDialogOpen(false);
          }}
          label="Headline or Summary"
          value={summary}
          onChange={(value) => {
            setSummary(value);
          }}
          onClick={() => {
            /*if (summary == "") {
              toast.error("Please Input all required fields!");
              return false;
            }*/
            handleUpdateSummary();
          }}
        />

        <Box className="bottom">
          <Button
            onClick={() => {
              handleClickNext(false);
            }}
            title="Continue"
            height="50px"
            width="150px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export { CheckResumeForm };
