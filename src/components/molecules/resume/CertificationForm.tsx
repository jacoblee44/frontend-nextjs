import { Button } from "@/components/atoms/button";
import { ReviewCard } from "@/components/layouts";
import deleteIcon from "@/static/images/icons/ic_delete.png";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "@/components/atoms/textInput";
import { CustomDivider } from "@/components/atoms/divider";
import { LeftIconBox, RightIconBox } from "@/components/atoms/textWithIcon";
import { useCertificationFormStyles } from "@/static/stylesheets/resume/certificationFormStyles";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { useAuthInfo } from "@/hooks/custom";

interface CertificationFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

const CertificationForm: React.FC<CertificationFormProps> = (props) => {
  const classes = useCertificationFormStyles();
  const { userData } = useAuthInfo();
  const userId = userData?._id;

  const { values, setValue } = useFormMethods();
  let resumeId =
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : 0;
  const [allCurricularActivities, setAllCurricularActivities] = useState([]);
  const [newCertificate, setNewCertificate] = useState("");
  const [awardBody, setAwardBody] = useState("");

  const getallCurricularActivities = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Certificates",
        },
      })
      .then((res) => {
        setAllCurricularActivities(res?.data?.cactividata);
      })
      .catch(() => {
        setAllCurricularActivities([]);
      });
  };

  const handleAddCertificate = () => {
    if (newCertificate != "" && awardBody != "") {
      let data: { [key: string]: any } = {};
      data.resid = resumeId;
      data.userid = userId;
      data.activities = newCertificate;
      data.type = "Certificates";
      data.awardBody = awardBody;

      apiClient
        .post({
          url: endpoints.private.createCurricularActivities,
          data,
        })
        .then((res) => {
          setNewCertificate("");
          setAwardBody("");
          getallCurricularActivities();
        })
        .catch(() => {});
    }
  };

  const handleDeleteAct = (cactiviId: any) => {
    apiClient
      .post({
        url: endpoints.private.deleteCurricularActivities,
        data: {
          curractid: cactiviId,
        },
      })
      .then((res) => {
        getallCurricularActivities();
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
      getallCurricularActivities();
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
      <Box className="box ">
        <Typography component="h2">
          What certifications or licenses do you have?
        </Typography>
        {allCurricularActivities &&
          allCurricularActivities.length > 0 &&
          allCurricularActivities.map((row: any) => (
            <Box className="skills" key={row?._id}>
              <RightIconBox
                title={row?.activities}
                onClick={() => handleDeleteAct?.(row?._id)}
              />
            </Box>
          ))}

        <Box className="form">
          <div className="inputs-group items-end">
            <div className="i-group">
              <TextInput
                label="Name of certification:"
                type="text"
                value={newCertificate}
                onChange={(e) => setNewCertificate(e.target.value)}
              />
            </div>
            <div className="i-group">
              <TextInput
                label="Awarding body:"
                type="text"
                value={awardBody}
                onChange={(e) => setAwardBody(e.target.value)}
              />
            </div>
            <div className="g-button">
              <IconButton
                aria-label="add"
                size="medium"
                onClick={handleAddCertificate}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        </Box>

        <Box className="bottom">
          <Button
            onClick={() => {
              handleClickNext(false);
            }}
            title="Continue"
            height="60px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export { CertificationForm };
