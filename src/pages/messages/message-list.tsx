import React from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useMessageListStyles } from "@/static/stylesheets/messages/messageListStyles";
import { PublicLayout } from "@/components/layouts";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import { MessageCard, UserCard } from "@/components/molecules/messages";
import { CustomDivider } from "@/components/atoms/divider";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';

const MessageList = () => {
  const classes = useMessageListStyles();
  return (
    <PublicLayout pageProps={{title: "Message list"}} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"box"}>
            <Box className={"message-box"}>
              <Box className={"tob-bar"}>
                <Box className={"search"}>
                  <Typography><SearchIcon/> Search</Typography>
                  <IconButton>
                    <MoreVertIcon/>
                  </IconButton>
                </Box>
                <Box className={"user"}>
                  <Box>
                    <Typography component={"h2"}>Vanessa Abrams</Typography>
                    <Typography>11:25 AM PDT</Typography>
                  </Box>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <InfoIcon style={{color: '##595959 !important'}} />
                    <IconButton>
                      <MoreVertIcon/>
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box className={"bottom-bar"}>
                <Box className={"user-list"}>
                  <UserCard isActive={true} userName={"Mikita Kovalchuk"} profileImage={"https://images.unsplash.com/photo-1597004897768-c503466472cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                  <UserCard isActive={false} userName={"Ivan Kovshar"} time={"6:11 PM"} profileImage={"https://images.unsplash.com/photo-1530577197743-7adf14294584?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                  <UserCard isActive={false} userName={"Dan Antiperovich"} time={"Yesterday"} selected={true} profileImage={"https://images.unsplash.com/photo-1520302723644-46526f5a7c2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                  <UserCard isActive={true} userName={"Max Mishin"} time={"Tuesday"} />
                  <UserCard isActive={true} userName={"Max Mishin"} time={"Tuesday"} profileImage={"https://images.unsplash.com/photo-1520302723644-46526f5a7c2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                </Box>
                <Box className={"chat-box"}>
                  <MessageCard userName={"Ivan Kovshar"} message={"Hello!"} />
                  <MessageCard userName={"Vanessa Abrams"} message={"Hi, Ivan"} profileImage={"https://images.unsplash.com/photo-1597004897768-c503466472cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                  <MessageCard userName={"Ivan Kovshar"} message={"Do you work today?"} />
                  <CustomDivider dividerText={"Fri, Jul 15"} />
                  <MessageCard userName={"Ivan Kovshar"} message={"Are you there?"} />
                  <CustomDivider style={{borderColor: "#dcdcdc"}} />
                  <Box className={"type-box"}>
                    <Box className={"input-box"}>
                      <input placeholder={"Write a message..."} type={"text"} />
                    </Box>
                    <Box className={"option-bar"}>
                      <Box className={"left-icon-list"}>

                      </Box>
                      <Box className={"right-icon-list"}>
                        <AlternateEmailIcon/>
                        <AttachFileIcon/>
                        <SentimentSatisfiedAltIcon/>
                        <SettingsIcon/>
                        <SendIcon/>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default MessageList;
