import React from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material'
import { useUserCardStyles } from "@/static/stylesheets/messages/userCardStyles";
import styled from "@mui/material/styles/styled";
import img1 from '@/static/images/pictures/user.jpg';
import CircleIcon from '@mui/icons-material/Circle';
import { useMessageCardStyles } from "@/static/stylesheets/messages";


const tempImg = "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=45"

interface MessageCardProps {
  userName?: string;
  isActive?: boolean;
  time?: string;
  profileImage?: string;
  message?: string;
}
const MessageCard: React.FC<MessageCardProps> = (props) => {
  const classes = useMessageCardStyles(props?.isActive);
  var monthArr = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
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
      if(diffInDays < 7){
        createdStr += ""+diffInDays+" days ago";
      } else {        
        var dtsplit = created.split("-");
        createdStr += ""+dtsplit[2]+" "+monthArr[parseInt(dtsplit[1])]+" "+dtsplit[0];
      }
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
      <Box className={"user-box"} style={{paddingBottom:"5px"}}>
        <Box className={"avatar"}>
          <Avatar sx={{ bgcolor: "#6D5086", fontSize: 25, padding: '15px', textTransform:"uppercase" }}>{(typeof props?.userName !== "undefined") ? props?.userName.substring(0,2) : "U"}</Avatar>
          {/*<Avatar alt="Remy Sharp" src={props?.profileImage ?? tempImg} />
          <CircleIcon/>*/}
        </Box>
        <Box sx={{paddingLeft: '10px', marginTop: '-8px'}}>
          <Typography component={"h3"}>{props?.userName ?? ""}</Typography>
          <Typography component={"h4"}>{createdStr+' at '+timeStr}</Typography>
        </Box>
      </Box>
      <Box className={"user-box"} style={{paddingTop:"0px"}}>
        <Typography>{props?.message ?? ""}</Typography>
      </Box>
    </Box>
  );
};

export { MessageCard };
