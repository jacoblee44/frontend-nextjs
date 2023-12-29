import React from "react";
import { Box, Typography } from "@mui/material";
import editIcon from "@/static/images/icons/edit.png";
import deleteIcon from "@/static/images/icons/ic_delete.png";
import Image from "next/image";
import { useReviewCardStyles } from "@/static/stylesheets";
import { useFormMethods } from "@/hooks/form";

interface ReviewCardProps {
  id?: number;
  title?: string;
  sub_title?: string;
  timePeriod?: string;
  style?: "normal" | "border";
  onClickEdit?(eduId: any): void;
  onClickDelete?(eduId: any): void;
}

const ReviewCard: React.FC<ReviewCardProps> = (props) => {
  const classes = useReviewCardStyles(props?.style);
  const { values, setValue } = useFormMethods();

  return (
    <Box className={classes.root}>
      <Box className="card py-[12px]">
        <Typography component="h2">{props?.title}</Typography>
        <Typography component="h4">{props?.sub_title}</Typography>
        <Typography>{props?.timePeriod}</Typography>
        <Box className="btn-group">
          <Image
            src={editIcon}
            alt=""
            onClick={() => {
              props?.onClickEdit?.(props?.id);
            }}
          />
          <Image
            src={deleteIcon}
            alt=""
            onClick={() => {
              props?.onClickDelete?.(props?.id);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { ReviewCard };
