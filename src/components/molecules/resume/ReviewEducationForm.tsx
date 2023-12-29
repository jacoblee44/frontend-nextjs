import { Button } from "@/components/atoms/button";
import { ReviewCard } from "@/components/layouts";
import { useEducationReviewFormStyles } from "@/static/stylesheets/resume";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";

interface ReviewEducationFormProps {
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
const ReviewEducationForm: React.FC<ReviewEducationFormProps> = (props) => {
  const classes = useEducationReviewFormStyles();
  const { values, setValue } = useFormMethods();
  let eduId = typeof values["eduId"] !== "undefined" ? values["eduId"] : 0;

  let resumeId =
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : 0;

  const [allEducation, setAllEducation] = useState([]);

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

  const handleEditEdu = (eduId: any) => {
    setValue("eduId", eduId);
    if (props?.onClickGoto) {
      props?.onClickGoto?.(4);
    }
  };

  useEffect(() => {
    if (resumeId > 0) {
      getallEducation();
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
        <Typography component="h2">Review education</Typography>
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
        <Box className="bottom">
          <Button
            onClick={props?.onClickPrev}
            title="Add another"
            height="60px"
            btnType="border"
          />
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

export { ReviewEducationForm };
