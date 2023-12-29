import React from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material'
import { useUserCardStyles } from "@/static/stylesheets/messages/userCardStyles";
import styled from "@mui/material/styles/styled";
import img1 from '@/static/images/pictures/user.jpg';
import CircleIcon from '@mui/icons-material/Circle';


const tempImg = "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=45"

interface UserCardProps {
  userName?: string;
  isActive?: boolean;
  selected?: boolean;
  time?: string;
  profileImage?: string;
  onClick?():void;
}
const UserCard: React.FC<UserCardProps> = (props) => {
  const classes = useUserCardStyles(props?.isActive, props?.selected);
  var createdStr = "";   
  var timeStr = "";
  if(typeof props?.time !== "undefined" && props?.time !== "") { 
    var created = props?.time.split('T')[0];
    var today:any = new Date().toISOString().slice(0, 10);        
    var dtStart:any = new Date(today);
    if(today == created){
      createdStr += "Today";
    } else {
      var dtEnd:any = new Date(created);
      var diffInMs:any  = dtStart - dtEnd;
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      createdStr += ""+diffInDays+" days ago";
    }
    
    var time = props?.time.split('T')[1].slice(0, 5).split(':');
    if(parseInt(time[0]) > 12){
      timeStr = (parseInt(time[0])-12)+':'+time[1]+' PM'
    } else if(parseInt(time[0]) == 12){
      timeStr = time[0]+':'+time[1]+' PM'
    } else if(parseInt(time[0]) == 0){
      timeStr = '12:'+time[1]+' AM'
    } else {
      timeStr = time[0]+':'+time[1]+' AM'
    }
  }
  return (
    <Box className={classes.root}>
      <Box className={"user-box"} onClick={props?.onClick} style={{cursor:"pointer"}}>
        <Box className={"avatar"}>
          
          <Avatar sx={{ bgcolor: "#6D5086", fontSize: 25, padding: '15px', width: 40, height: 40, textTransform:"uppercase" }}>{(typeof props?.userName !== "undefined") ? props?.userName.substring(0,2) : "U"}</Avatar>
          {/*<Avatar alt="Remy Sharp" src={props?.profileImage ?? tempImg} />*/}
          <CircleIcon/>
        </Box>
        <Box sx={{width: 250, paddingLeft: '10px'}}>
          <Typography component={"h3"} sx={{lineHeight: "1.2em"}}>{props?.userName ?? ""}</Typography>
          <Typography component={"h4"}><span>Last Msg:</span> {createdStr}</Typography>
        </Box>
        <Typography className={"timer"}>
          {timeStr ?? ""}
        </Typography>
      </Box>
    </Box>
  );
};

export { UserCard };
