import { useJobFeedStyles } from "@/static/stylesheets";
import { Box, Typography } from "@mui/material";
import React from "react";
import workBag from "@/static/images/icons/work.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@/components/atoms/button";

interface PostFeedProps {
  title: string;
  sub_title: string;
  description: string;
  jobType: string;
  time: string;
  companyName: string;
  review: number | any;
  jobStatus: string;

  onClick?(): void;
}

const PostFeed: React.FC<PostFeedProps> = (props) => {
  const classes = useJobFeedStyles();
  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const jtypes = props?.jobType.split(',');
  const jdes = props?.description;

  //var jdescr = jdes.replace(/<a.*>.*?<\/a>/ig,'');
  function removeHTML(str: any) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }

  var remhtm = removeHTML(jdes);
  var maxLength = 300
  var trimmedString = remhtm.substr(0, maxLength);
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

  return (
    <Box className={classes.root} onClick={props?.onClick}>
      {/* <Typography className="job-status">{props?.jobStatus.toString()?.toLowerCase()}</Typography> */}
      <Box className={"summary-cards-container"}>
        <Typography component="h2" className="title">
            {props?.title?.toString()?.toLowerCase()}
        </Typography>
      </Box>
      <Box className="company">
        <Typography component="h4">
          {props?.companyName.toString()?.toLowerCase()} 
        </Typography>
      </Box>
      
      <Box className={"job-types-container"}>
        <Button
            title={`Accept`}
            btnType={`default`}
            style={{ borderRadius: "10px 0 0 10px" }}
            className={"tab-button"}
          />
      </Box>
    </Box>
  );
};

export { PostFeed };
