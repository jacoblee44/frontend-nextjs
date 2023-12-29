import { Button } from "@/components/atoms/button";
import { ReviewCard } from "@/components/layouts";
import { useSkillFormStyles } from "@/static/stylesheets/resume/skillFormStyles";
import deleteIcon from "@/static/images/icons/ic_delete.png";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "@/components/atoms/textInput";
import { CustomDivider } from "@/components/atoms/divider";
import { LeftIconBox, RightIconBox } from "@/components/atoms/textWithIcon";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { useAuthInfo } from "@/hooks/custom";

interface SkillFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

const SkillForm: React.FC<SkillFormProps> = (props) => {
  const classes = useSkillFormStyles();
  const { userData } = useAuthInfo();
  const userId = userData?._id;

  const { values, setValue } = useFormMethods();
  let resumeId =
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : 0;
  const [allCurricularActivities, setAllCurricularActivities] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const initSugSkills = [
    "User Experience (UX)",
    "User Interface (UI)",
    "Sketch",
  ];
  const [sugSkills, setSugSkills] = useState([]);

  const getallCurricularActivities = () => {
    apiClient
      .post({
        url: endpoints.private.getallCurricularActivities,
        data: {
          resid: resumeId,
          type: "Skills",
        },
      })
      .then((res) => {
        setAllCurricularActivities(res?.data?.cactividata);
      })
      .catch(() => {
        setAllCurricularActivities([]);
      });
  };

  const handleAddSuggestedSkill = (skill: any) => {
    if (skill != "") {
      let data: { [key: string]: any } = {};
      data.resid = resumeId;
      data.userid = userId;
      data.activities = skill;
      data.type = "Skills";

      apiClient
        .post({
          url: endpoints.private.createCurricularActivities,
          data,
        })
        .then((res) => {
          setNewSkill("");
          getallCurricularActivities();
        })
        .catch(() => {});
    }
  };

  const handleAddSkill = () => {
    if (newSkill != "") {
      handleAddSuggestedSkill(newSkill);
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
        window.localStorage.setItem("gotostep", "3");
        window.localStorage.setItem("resid", resumeId);
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

  //to handle delete sug skill when user add it to his skills
  useEffect(() => {
    const data: any = initSugSkills.filter((element: any) => {
      if (allCurricularActivities && allCurricularActivities.length > 0) {
        const isFound = allCurricularActivities.find(
          (el: any) => el.activities == element
        );
        if (!isFound) {
          return element;
        }
      }
    });
    setSugSkills(data);
    // console.log(data);
  }, [allCurricularActivities.length]);

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
        <Typography component="h2">
          what is your name of your skills?
        </Typography>
        <Typography component="span">
          We recommend adding at least 6 skills.
        </Typography>
        <div className="flex flex-wrap gap-2 skills">
          {allCurricularActivities &&
            allCurricularActivities.length > 0 &&
            allCurricularActivities.map((row: any) => (
              <RightIconBox
                key={row?._id}
                title={row?.activities}
                onClick={() => handleDeleteAct?.(row?._id)}
              />
            ))}
        </div>
        <Box className="form">
          <div className="w-[80%]">
            <TextInput
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </div>
          <div className="w-[17%] add-skill-btn">
            <IconButton
              aria-label="add"
              size="medium"
              onClick={handleAddSkill}
              className="w-full"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
        </Box>

        <CustomDivider
          style={{ borderColor: "#6D5086", height: "2px", margin: "20px 0" }}
        />

        <Typography component="h3">
          Do you want to add any of these skills?
        </Typography>
        <div className="flex flex-wrap gap-2 suggestions-skills">
          {/* <LeftIconBox
            title="User Experience (UX)"
            onClick={() => handleAddSuggestedSkill?.("User Experience (UX)")}
          />
          <LeftIconBox
            title="User Interface (UI)"
            onClick={() => handleAddSuggestedSkill?.("User Interface (UI)")}
          />
          <LeftIconBox
            title="Sketch"
            onClick={() => handleAddSuggestedSkill?.("Sketch")}
          /> */}
          {sugSkills.map((el, i) => (
            <LeftIconBox
              key={i}
              title={el}
              onClick={() => handleAddSuggestedSkill?.(el)}
            />
          ))}
        </div>
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

export { SkillForm };
