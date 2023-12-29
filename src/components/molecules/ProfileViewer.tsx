import React, { useEffect, useState } from "react";
import {
    Box,
    Dialog,
    DialogContent,
    Typography,
    Drawer, ListItem, ListItemIcon, ListItemText
} from '@mui/material'
import { useResumeSearchModalStyles } from "@/static/stylesheets/modal/resumeSearchModalStyles";
import { CustomDivider } from "@/components/atoms/divider";
import CloseIcon from '@mui/icons-material/Close';
import image1 from '@/static/images/pictures/picture2.png';
import Image from 'next/image';
import { Button } from "@/components/atoms/button";
import { apiClient, endpoints } from "@/api";
import { useAuthInfo } from "@/hooks/custom";
import { useFormMethods } from "@/hooks/form";
import { InviteJobModal } from "@/components/molecules/modal/InviteJobModal";
import { createStructuredSelector } from "reselect";

interface ProfileViewerProps {
    resid?: number,
    className?: string
}

const ProfileViewer: React.FC<ProfileViewerProps> = (props) => {

    const classes = useResumeSearchModalStyles();
    const { userData } = useAuthInfo();
    const [open, setOpen] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [summary, setSummary] = useState('');

    const [allWorkExperience, setAllWorkExperience] = useState([]);
    const [allEducation, setAllEducation] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [allCertificates, setAllCertificates] = useState([]);
    const [conId, setConId] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [alljobslist, setAllJobslist] = useState([]);


    const { values, setValue } = useFormMethods();

    const userId = userData?._id;

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
    const getuserid = async () => {
        //const userId = userData?._id;
        await apiClient.post({
            url: endpoints.private.getResume,
            data: {
                resid: props?.resid,
            }
        }).then((res) => {
            if (res?.data) {
                const jobData = res?.data?.resume;
                setConId(jobData.userid);
                setFirstname(jobData.firstname);
                setLastname(jobData.lastname);
                setPhone(jobData.phonenumber);
                setCity(jobData.citystate);
                setSummary(jobData.resumeheadline);
                getemailbyuserid(jobData.userid);
            }
        }).catch(() => {
        });
    }

    const getemailbyuserid = async (conId: any) => {
        //const userId = userData?._id;
        console.log();
        await apiClient.post({
            url: endpoints.private.getUser,
            data: {
                userid: conId,
            }
        }).then((res) => {
            if (res?.data) {
                const jobData = res?.data?.user;
                setUserEmail(jobData.email);
            }
        }).catch(() => {
        });
    }

    const getallWorkExperience = () => {
        apiClient.post({
            url: endpoints.private.getallWorkExperience,
            data: {
                resid: props?.resid
            }
        }).then((res) => {
            setAllWorkExperience(res?.data?.workexpdata);
        }).catch(() => {
            setAllWorkExperience([]);
        });
    }

    const getallEducation = () => {
        apiClient.post({
            url: endpoints.private.getallEducation,
            data: {
                resid: props?.resid
            }
        }).then((res) => {
            setAllEducation(res?.data?.edudata);
        }).catch(() => {
            setAllEducation([]);
        });
    }

    const getallSkills = () => {
        apiClient.post({
            url: endpoints.private.getallCurricularActivities,
            data: {
                resid: props?.resid,
                type: 'Skills'
            }
        }).then((res) => {
            setAllSkills(res?.data?.cactividata);
        }).catch(() => {
            setAllSkills([]);
        });
    }

    const getallCertificates = () => {
        apiClient.post({
            url: endpoints.private.getallCurricularActivities,
            data: {
                resid: props?.resid,
                type: 'Certificates'
            }
        }).then((res) => {
            setAllCertificates(res?.data?.cactividata);
        }).catch(() => {
            setAllCertificates([]);
        });
    }

    const listjobtoinvite = () => {
        apiClient.post({
            url: endpoints.private.searchJobs,
            data: {
                keyword: "",
                userid: userId,
                jobstatus: 'active',
            }
        }).then((res) => {
            console.log(JSON.stringify(res?.data?.search));
            setAllJobslist(res?.data?.search);
        }).catch(() => {
        });
    }

    const handleinvitetojobs = (Jobid: any) => {
        var errmsg = "";
        apiClient.post({
            url: endpoints.private.invitejobtoApply,
            data: {
                jobid: Jobid,
                resid: props?.resid,
            }
        }).then((res) => {
            if (res?.data?.message) {
                alert("Already invited this Job");
            } else {
                alert("Invited Successfully");
            }
            console.log(JSON.stringify(res?.data?.jobinvite));
        }).catch(() => {
        });
    }

    var monthArr = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const checkdateformat = (pre: any, createddte: any) => {
        var createdStr = "";
        var timeStr = "";
        var created = createddte.split('T')[0];
        var today: any = new Date().toISOString().slice(0, 10);
        var dtStart: any = new Date(today);
        /*if(today == created){
          createdStr += "Today";
        } else { */
        var dtEnd: any = new Date(created);
        var diffInMs: any = dtStart - dtEnd;
        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        /*if(diffInDays < 7){
          createdStr += ""+diffInDays+" days ago";
        } else { */
        var dtsplit = created.split("-");
        createdStr += pre + " " + dtsplit[2] + " " + monthArr[parseInt(dtsplit[1])] + " " + dtsplit[0];
        //}
        //}
        return createdStr;
    }

    useEffect(() => {
        //if(props?.resid > 0){
        //loadresumeData();
        getallWorkExperience();
        getallEducation();
        getallSkills();
        getallCertificates();
        getuserid();
        listjobtoinvite();
        //}
    }, [props?.resid]);

    return (
        <Box className={classes.root + ' ' + props.className}>
            <Box className={"review-box"} mt={2}>
                <Typography sx={{ fontSize: 36, fontWeight: 600, color: '#000000' }}>{firstname} {lastname}</Typography>
                <Box className="info">
                    <Typography>{city}</Typography>
                    <Typography>{userEmail}</Typography>
                    <Typography>{phone}</Typography>
                </Box>

                <Box>
                    <Typography sx={{ fontSize: 28, fontWeight: 600, color: '#000000', marginTop: 3 }}>Work Experience</Typography>
                    <CustomDivider style={{ margin: '20px 0', borderColor: '#8F77A4', height: 2, background: '#8F77A4' }} />
                    {allWorkExperience && allWorkExperience.length > 0 && allWorkExperience.map((row: any) => (
                        <Box className={"card"}>
                            <Typography component={"h2"}>{row?.jobtitle}</Typography>
                            <Typography component={"h4"}>{row?.company + ' - ' + row?.citystate}</Typography>
                            <Typography>{month_list[row?.frommonth].value + ' ' + row?.fromyear + ' to ' + ((!row?.currentlywork) ? month_list[row?.tomonth].value + ' ' + row?.toyear : 'Present')}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box mt={4}>
                    <Typography sx={{ fontSize: 28, fontWeight: 600, color: '#000000', marginTop: 3 }}>Education</Typography>
                    <CustomDivider style={{ margin: '20px 0', borderColor: '#8F77A4', height: 2, background: '#8F77A4' }} />
                    {allEducation && allEducation.length > 0 && allEducation.map((row: any) => (
                        <Box className={"card"}>
                            <Typography component={"h2"}>{row?.level + ' in ' + row?.fieldofstudy}</Typography>
                            <Typography component={"h4"}>{row?.schoolnumber}</Typography>
                            <Typography component={"h4"}>{month_list[row?.frommonth]?.value + ' ' + row?.fromyear + ' to ' + ((!row?.currentlyenrolled) ? month_list[row?.tomonth]?.value + ' ' + row?.toyear : 'Present')}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box mt={4}>
                    <Typography sx={{ fontSize: 28, fontWeight: 600, color: '#000000', marginTop: 3 }}>Skills</Typography>
                    <CustomDivider style={{ margin: '20px 0', borderColor: '#8F77A4', height: 2, background: '#8F77A4' }} />
                    {allSkills && allSkills.length > 0 && allSkills.map((row: any) => (
                        <Box className={"card"}>
                            <Typography component={"h4"}>{row?.activities}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box mt={4}>
                    <Typography sx={{ fontSize: 28, fontWeight: 600, color: '#000000', marginTop: 3 }}>Certifications / Licenses</Typography>
                    <CustomDivider style={{ margin: '20px 0', borderColor: '#8F77A4', height: 2, background: '#8F77A4' }} />
                    {allCertificates && allCertificates.length > 0 && allCertificates.map((row: any) => (
                        <Box className={"card"}>
                            <Typography component={"h4"}>{row?.activities}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export { ProfileViewer };
