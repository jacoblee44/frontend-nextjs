import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { AdminLayout } from "@/components/layouts";
//import { useMessageStyles } from "@/static/stylesheets/messages";
import { useMessageListStyles } from "@/static/stylesheets/messages/messageListStyles";
import { CustomDivider } from "@/components/atoms/divider";
import { Button } from "@/components/atoms/button";
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from "@/static/images/pictures/message.jpg";
import InfoIcon from '@mui/icons-material/Info';
import { MessageCard, UserCard } from "@/components/molecules/messages";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';
import { useAuthInfo } from "@/hooks/custom";
import { apiClient, endpoints } from "@/api";
import toast from "react-hot-toast";

const Message = () => {
  const classes = useMessageListStyles()
  const { loggedIn, userData } = useAuthInfo();
  const userId = userData?._id;
  const userAcc = userData?.accounttype;
  const userCurrName = userData?.displayname;

  const [messageUsers, setMessageUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selUser, setSelUser] = useState(0);
  const [selUserName, setSelUserName] = useState('');  
  const [writeMessage, setWriteMessage] = useState('');  
  const [searchKey, setSearchKey] = useState('');
  const [loaded, setLoaded] = useState(false);
 
  const loadMessageUsers = async () => {   
    let data: { [key: string]: any } = {};
    if(userAcc =='employer') {
      data.emp = userId; 
    } else {
      data.userid = userId; 
    }
    data.keyword = searchKey;
    //console.log(JSON.stringify(data));
    await apiClient.post({
      url: (userAcc =='employer') ? endpoints.private.getConUsersbyEmp : endpoints.private.getEmpUsersbyCon,
      data,
    }).then((res) => {
      //alert(JSON.stringify(res?.data));
      if (res?.data) {
        const usrData = res?.data?.usrlst;
        //alert(JSON.stringify(usrData));
        setMessageUsers(usrData);
        setSelUser(usrData[0].uniqueusers[0]._id);
        setSelUserName(usrData[0].uniqueusers[0].displayname);
        /*if(typeof usrData[0].firstname !== "undefined" && usrData[0].firstname !== ""){
          setSelUserName(usrData[0].firstname+" "+usrData[0].lastname);
        } else {
          setSelUserName(usrData[0].email);
        }*/
      }
      setLoaded(true);
    }).catch(() => {
    });
  } 

  const loadMessages = async () => {  
    setMessages([]); 
    let data: { [key: string]: any } = {};
    if(userAcc =='employer') {
      data.empid = userId; 
      data.userid = selUser; 
    } else {
      data.empid = selUser;
      data.userid = userId; 
    }
    //alert(JSON.stringify(data));
    await apiClient.post({
      url: endpoints.private.getAllConversation,
      data,
    }).then((res) => {
      if (res?.data) {
        const usrData = res?.data?.convmsg;
        //alert(JSON.stringify(usrData));
        setMessages(usrData);
      }
    }).catch(() => {
    });
  } 

  const handleSendMessage = () => {
    if(writeMessage == ""){
      toast.error("Please write message to continue!");
      return;
    }

    let data: { [key: string]: any } = {};
    if(userAcc =='employer') {
      data.empid = userId; 
      data.userid = selUser; 
    } else {
      data.empid = selUser;
      data.userid = userId; 
    }
    data.jobid = 0; 
    data.subject = ''; 
    data.message = writeMessage; 
    data.messageby = userId; 

    //alert(writeMessage);
    apiClient.post({
      url: endpoints.private.createConversation,
      data,
    }).then((res) => {
      if (res?.data) {
        const usrData = res?.data?.convid;
        //alert(JSON.stringify(usrData));
        setWriteMessage('');
        loadMessages();
      }
    }).catch(() => {
    });

  }

  useEffect(() => {
    loadMessageUsers();
  }, [userData]);

  useEffect(() => {
    loadMessages();
  }, [selUser]);

  useEffect(() => {
    loadMessageUsers();
  }, [searchKey]);

  var [localdate,setLocalDate] = useState(new Date());
  
  //let timeStr = new Date().toLocaleTimeString();
  useEffect(() => {
      var timer = setInterval(()=>setLocalDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });

  return (
    <AdminLayout pageProps={{ title: "Message", }}>
      <Box className={classes.root}>
        <Box className={"box"}>
          {loaded && messageUsers && messageUsers.length < 1 && (
          <Box className={"welcome-box"}>
            <Image src={MessageIcon} alt={"Message"} width={200} height={200} />
            <Box>
              <Typography component={"h2"}>Welcome to Messages</Typography>
              <Typography>When an {(userData?.accounttype=="employer") ? `contractor` : `employer`} contacts you.<br/> you will see messages here.</Typography>
              {(userData?.accounttype=="employer") ? (
                <>
                  <Button title={"Post a job"} width={"275px"} onClick={() => alert()} />
                  <Button title={"Search resumes"} width={"275px"} onClick={() => alert()} btnType={"border"} />
                </>
              ):(
                <>
                  <Button title={"Find jobs"} width={"275px"} onClick={() => alert()} />
                  <Button title={"Upload your resume"} width={"275px"} onClick={() => alert()} btnType={"border"} />
                </>
              )}              
            </Box>
          </Box>
          )}

          {loaded && messageUsers && messageUsers.length > 0 && (
          <Box className={"message-box"}>

            <Box className={"tob-bar"}>
              <Box className={"search"}>
                <Typography><SearchIcon/> <input type={'text'} placeholder={"Search"} onChange={(e) => {setSearchKey(e.target.value);}} style={{width:"230px", height:"30px", border:"none", outline:"none"}} /></Typography>
                <IconButton>
                  <MoreVertIcon/>
                </IconButton>
              </Box>
              <Box className={"user"}>
                <Box>
                  <Typography component={"h2"}>{userCurrName}</Typography>
                  <Typography>{localdate.toLocaleTimeString()}{/*PDT*/}</Typography>
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
                {messageUsers && messageUsers.length > 0 && messageUsers.map((row: any, index) => (
                  <UserCard key={'uc'+index} 
                  isActive={(selUser == row?.uniqueusers[0]._id) ? true : false} 
                  onClick={() => { setSelUserName(row?.uniqueusers[0].displayname); setSelUser(row?.uniqueusers[0]._id); }}
                  userName={row?.uniqueusers[0].displayname.replace('@',' @')} 
                  time={row?.createddate} 
                  profileImage={"https://images.unsplash.com/photo-1597004897768-c503466472cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"}
                   />                
                ))}
                {/*<UserCard isActive={true} userName={"Mikita Kovalchuk"} profileImage={"https://images.unsplash.com/photo-1597004897768-c503466472cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                <UserCard isActive={false} userName={"Ivan Kovshar"} time={"6:11 PM"} profileImage={"https://images.unsplash.com/photo-1530577197743-7adf14294584?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                <UserCard isActive={false} userName={"Dan Antiperovich"} time={"Yesterday"} selected={true} profileImage={"https://images.unsplash.com/photo-1520302723644-46526f5a7c2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                <UserCard isActive={true} userName={"Max Mishin"} time={"Tuesday"} />
              <UserCard isActive={true} userName={"Max Mishin"} time={"Tuesday"} profileImage={"https://images.unsplash.com/photo-1520302723644-46526f5a7c2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />*/}
              </Box>
              <Box className={"chat-box"}>
                <Box className={"type-box"}>
                  <Box className={"input-box"}>
                    <textarea placeholder={"Write a message..."} onChange={(e) => setWriteMessage(e.target.value)} style={{width:"100%", border:"none", outline:"none"}}></textarea>
                  </Box>
                  <Box className={"option-bar"}>
                    <Box className={"left-icon-list"}>
                    </Box>
                    <Box className={"right-icon-list"}>
                      {/*<AlternateEmailIcon/>
                      <AttachFileIcon/>
                      <SentimentSatisfiedAltIcon/>
                      <SettingsIcon/>*/}
                      <SendIcon onClick={handleSendMessage} />
                    </Box>
                  </Box>
                </Box>
                {/*<CustomDivider style={{borderColor: "#dcdcdc"}} />*/}
                {messages && messages.length > 0 && messages.map((row: any, index) => (  
                  (row?.message != "") ? (
                    <>
                    <CustomDivider style={{borderColor: "#dcdcdc"}} />
                    <MessageCard key={'mc'+index} time={row?.createddate} userName={(row?.messageby === userId) ? userCurrName : selUserName } message={row?.message} /> 
                    </>
                  ) : ``
                ))}
                {/*messages && messages.length > 0 && messages.map((row: any, index) => (  
                  <MessageCard key={'mc'+index} userName={(row?.messageby === userId) ? userCurrName : selUserName } message={row?.message} />
                ))*/}
                {/*<MessageCard userName={"Vanessa Abrams"} message={"Hi, Ivan"} profileImage={"https://images.unsplash.com/photo-1597004897768-c503466472cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"} />
                <MessageCard userName={"Ivan Kovshar"} message={"Do you work today?"} />
                <CustomDivider dividerText={"Fri, Jul 15"} />
                <MessageCard userName={"Ivan Kovshar"} message={"Are you there?"} />*/}               
                
              </Box>
            </Box>
          </Box>
          )}
        </Box>
        {/*<Grid container spacing={4}>
          <Grid item md={4} sm={5} xs={12}>
            <Box className={"left-box"}>
              <Typography component={"h2"}>Messages</Typography>
              <CustomDivider style={{borderColor: '#c2c2c2', height: '2px', background: '#c2c2c2'}} />
            </Box>
          </Grid>
          <Grid item md={8} sm={7} xs={12}>
            <Box className={"right-box"}>
                
            </Box>
          </Grid>
        </Grid>*/}

      </Box>
    </AdminLayout>
  );
};

export default Message;
