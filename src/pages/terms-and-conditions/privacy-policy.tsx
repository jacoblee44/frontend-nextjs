import React from 'react';
import { Box, Typography } from '@mui/material'
import { PublicLayout } from "@/components/layouts";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { usePrivacyPolicyStyles } from "@/static/stylesheets/privacyPolicies";
import { routePaths } from "@/config";
import { useRouter } from "next/router";

const PrivacyPolicy = () => {
  const classes = usePrivacyPolicyStyles();
  const router = useRouter();
  const goBack = () => {
    router.push(routePaths.legalTerms)
  }
  return (
    <PublicLayout pageProps={{ title: "Privacy policy" }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"banner"}>
          <Box sx={{ width: { md: '40%', sm: '60%', xs: '90%' }, margin: '0 auto' }}>
            <Typography component={"h2"}>Privacy Policy</Typography>
            <Typography> Last updated: 19/06/2023</Typography>
            <Box className={"back-button"} onClick={goBack}> <ArrowBackIosNewOutlinedIcon /> Go Back  </Box>
          </Box>
        </Box>

        <Box className={"content"}>
          {/* <Typography component={"h2"}>Dayratework</Typography> */}

          <Typography>
            DayRateWork  is committed to protecting the privacy and personal information of the users of the DayRateWork platform . This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Platform. By accessing or using the Platform, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy. If you do not agree with this Privacy Policy, please refrain from using the Platform.
          </Typography>

          <Typography>

             <Typography  component={"h3"}> Information We Collect:   </Typography>
             <Typography>  
            a. Personal Information: 
            When you create an account or use certain features of the Platform, we may collect personal information such as your name, email address, phone number, location, and billing information. We may also collect any personal information you voluntarily provide to us through your interactions with the Platform. 
               </Typography>

               <Typography>  
            b. Job Seeker Information: <br />
             If you are a job seeker, we may collect additional information such as your resume, work experience, education history, skills, and job preferences. This information is used to match you with relevant job openings and improve the job search experience. <br />

               </Typography>
             <Typography>  
            c. Employer Information: <br />
             If you are an employer, we may collect information about your company, job openings, and hiring preferences. This information is used to facilitate the posting of job openings and the recruitment process. <br />
               </Typography>

               <Typography>  
            d. Usage Information: <br />
             We collect information about your interactions with the Platform, including your IP address, browser type, device information, pages visited, and actions taken. This information is collected through cookies, web beacons, and similar technologies and helps us improve the performance and functionality of the Platform.
               </Typography>

          </Typography>



          <Typography  component={"h3"}> Use of Information: </Typography>
          <Typography>
            a. Providing and Improving the Platform: We use your personal information to provide you with access to the Platform and its features. This includes processing job applications, matching job seekers with job openings, facilitating communication between job seekers and employers, and improving the overall user experience.
          </Typography>
          <Typography>  
            b. Communication: We may use your personal information to communicate with you, including responding to your inquiries, providing updates about the Platform, and sending you relevant job alerts or notifications.
               </Typography>
            <Typography>  
            c. Personalization: We may use your personal information to personalize your experience on the Platform, such as recommending job openings or displaying tailored content based on your preferences.
               </Typography>
            <Typography>  
            d. Analytics and Research: We may use aggregated and anonymized information for analytical and research purposes to understand user behavior, trends, and preferences. This information helps us improve the Platform's functionality, features, and performance.
               </Typography>
            <Typography>  
            e. Marketing: With your consent, we may use your personal information to send you promotional emails, newsletters, or other marketing communications about our services or third-party products and services that we believe may be of interest to you.
               </Typography>


       
               <Typography  component={"h3"}>
            Sharing of Information: </Typography>

            <Typography>  
            a. Job Applications and Profiles: If you are a job seeker, we may share your profile information and job applications with employers or recruiters to facilitate the job search process. However, we do not control how employers or recruiters handle and use your information, and their use of your information is subject to their own privacy policies.
               </Typography>
            <Typography>  
            b. Third-Party Service Providers: We may share your personal information with trusted third-party service providers who assist us in operating, maintaining, and enhancing the Platform. These service providers are bound by confidentiality obligations and are only permitted to use your information for the purposes specified by us.
               </Typography>
            <Typography>  
            c. Legal Compliance: We may disclose your personal information if required to do so by law, regulation, legal process, or governmental request. We may also disclose your information to enforce our rights, protect the security of the Platform, or investigate potential violations of our policies.
               </Typography>
            <Typography>  
            d. Business Transfers: In the event of a merger, acquisition, sale, or other transfer of all or a portion of our business, your personal information may be transferred to the acquiring entity or new owner, subject to the provisions of this Privacy Policy.
               </Typography>

       

               <Typography  component={"h3"}>
            Data Security and Privacy: </Typography>

          <Typography>
            Data Security:
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission over the internet or electronic storage system can be guaranteed to be 100% secure. Therefore, we cannot guarantee the absolute security of your information.

          </Typography>

          <Typography>

            Data Retention:
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We will securely delete or anonymize your information when it is no longer needed for the purposes stated herein.
          </Typography>



          <Typography>

            Children's Privacy:
            The Platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete such information as soon as possible.

          </Typography>


          <Typography  component={"h3"}>
          Your Rights: </Typography>  
          <Typography>
            a. Access and Correction: You have the right to access and update your personal information through your account settings. If you believe that any of your information is inaccurate or incomplete, please contact us, and we will make reasonable efforts to correct it.
          </Typography>

          <Typography>  
            b. Opt-out: You may opt out of receiving promotional emails or marketing communications from us by following the unsubscribe instructions provided in the emails or contacting us directly.
               </Typography>
            <Typography>  
            c. Data Protection Rights: Depending on your location, you may have certain data protection rights, including the right to request access, rectification, erasure, restriction, or portability of your personal information. To exercise your rights, please contact us using the contact information provided at the end of this Privacy Policy.
               </Typography>



               <Typography  component={"h3"}>
               Changes to the Privacy Policy:</Typography> 
          <Typography>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Privacy Policy on the Platform or by other means of communication. Your continued use of the Platform after the effective date of the updated Privacy Policy constitutes your acceptance of the revised terms.

          </Typography>


          <Typography  component={"h3"}>
          Contact Us: </Typography> 
          <Typography>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at <b>support@dayratework.co.uk</b>.

          </Typography>


          <Typography>

            By using the DayRateWork Platform, you acknowledge that you have read, understood, and agreed to this Privacy Policy. If you do not agree to this Privacy Policy, please refrain from using the Platform.
          </Typography>



        </Box>
      </Box>
    </PublicLayout>
  );
};

export default PrivacyPolicy;
