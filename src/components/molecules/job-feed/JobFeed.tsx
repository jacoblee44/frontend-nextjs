import { useJobFeedStyles } from "@/static/stylesheets";
import { Box, Typography } from "@mui/material";
import React from "react";
import workBag from "@/static/images/icons/work.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";

interface JobFeedProps {
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

const JobFeed: React.FC<JobFeedProps> = (props) => {
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
  var maxLength = 150
  var trimmedString = remhtm.substr(0, maxLength);
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

  return (
    <Box className={classes.root} onClick={props?.onClick}>
      <Typography className="job-status">{props?.jobStatus.toString()?.toLowerCase()}</Typography>
      <Typography component="h2" className="title">
        {props?.title?.toString()?.toLowerCase()}
      </Typography>
      <Box className="company">
        <Typography component="h4">
          {props?.companyName.toString()?.toLowerCase()} {props?.review} <StarIcon style={{marginLeft: 8, fontSize: 17}} />
        </Typography>
      </Box>
      <Typography className="sub-title">{props?.sub_title}</Typography>
      <Box className={"job-types-container"}>
        {jtypes && jtypes.length > 0 && jtypes.map((row: any, index) => (
          <Box key={'jt' + index} className="job-type" style={{ width: "auto", margin: "5px" }}>
            <Image src={workBag} alt="work" />
            {row && (
              <Typography style={{ paddingLeft: "5px" }}>{row}</Typography>
            )}
          </Box>
        ))}
      </Box>
      <Typography className="description">{trimmedString}...</Typography>
      <Typography className="time">{props?.time}</Typography>
    </Box>
  );
};

export { JobFeed };
