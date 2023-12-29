import React from 'react';
import { usePrivacyPolicyStyles } from "@/static/stylesheets/privacyPolicies";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { PublicLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const CookieStatement = () => {
  const classes = usePrivacyPolicyStyles();
  const router = useRouter();
  const goBack = () => {
    router.push(routePaths.legalTerms)
  }
  return (
    <PublicLayout pageProps={{title: "Cookie Statement"}} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"banner"}>
          <Box sx={{width: {md: '60%', sm: '60%', xs: '90%'}, margin: '0 auto', marginTop: {md: 0, sm: 8, xs: 2},  marginBottom: {md: 0, sm: 8, xs: 2} }}>
            <Typography  component={"h2"}>Terms & Services</Typography>
            <Typography>These Terms  govern the use of the DayRateWork platform provided by DayRateWork  for job seekers and employers seeking contract job opportunities. By accessing or using the Platform, you agree to be bound by this Agreement  </Typography>
            <Box className={"back-button"} onClick={goBack}> <ArrowBackIosNewOutlinedIcon/> Go Back  </Box>
          </Box>
        </Box>



        <Box className={"content"}>
        <Typography  component={"h2"}>  Job Seekers:</Typography> 
        
        <Typography>These Terms and Conditions govern the use of the platform  provided by DayRateWork for job applicants  seeking contract job opportunities. By accessing or using the Platform, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please refrain from using the Platform. </Typography>
        
        <br />
          <Typography  component={"h3"}>1. Description of Service</Typography>
          <Typography>
             <ul>
              <li>
              Job Ads and Listings: The Platform provides job seekers with access to a comprehensive database of contract job listings. The Company strives to provide accurate and up-to-date job information, including job titles, descriptions, requirements, compensation, and other relevant details. However, the Company does not guarantee the accuracy, completeness, or quality of the job ads and listings on the Platform.

              </li>

              <li>
              Resume and Profiles: Job seekers have the option to create and maintain a profile on the Platform, including uploading a resume. By uploading a resume or creating a profile, job seekers grant the Company permission to use their resume and profile information for the purpose of matching them with relevant job opportunities. Job seekers are responsible for ensuring the accuracy and completeness of their resume and profile information.
              </li>

              <li>
              Job Application: The Platform enables job seekers to apply for contract job opportunities by submitting their application through the Platform. Job seekers understand that the decision to hire or interview candidates rests solely with the employers, and the Company does not guarantee job placement or interview offers.
              </li>

              <li>
               Job Matches and Recommended Jobs: The Platform utilizes algorithms and data analysis to match job seekers with relevant job opportunities based on their profile information, job preferences, and search history. The Company strives to provide accurate job matches and recommended jobs, but cannot guarantee the suitability, availability, or success of job applications or job matches.
              </li>

             </ul>
            
           </Typography>
           <Typography component={"h3"}>2. User Accounts and Security</Typography>
          <Typography>
            <ul>
              <li>
              Account Creation: Job seekers must create an account to access certain features and services on the Platform. Job seekers are responsible for maintaining the confidentiality of their account credentials and are solely responsible for all activities that occur under their account.
              </li>
              <li>
              User Responsibilities: Job seekers agree to provide accurate, current, and complete information during the registration process and to promptly update their profile information as needed. Job seekers must not share their account credentials with any third party or allow unauthorized access to their account.
              </li>
              <li>
              Security Measures: The Company employs reasonable security measures to protect job seeker data and account information. However, job seekers acknowledge that no method of transmission or storage is completely secure, and the Company cannot guarantee the absolute security of job seeker data.
              </li>
            </ul>
      
           </Typography>

          <Typography component={"h3"}>3. Pricing</Typography>
          <Typography>
          Use of the Platform: The use of the Platform for job seekers is free of charge, unless explicitly stated otherwise for certain premium features or services. The Company reserves the right to introduce fees for additional services or features, and any fees will be clearly communicated to job seekers before their use. <br />
          Third-Party Services: Job seekers may encounter third-party services or offers on the Platform that may have associated fees or charges. The Company is not responsible for any transactions or agreements made between job seekers and third-party providers.
             </Typography>
     

          <Typography component={"h3"}>4. Payment Terms </Typography>
          <Typography> If any fee-based services or features are utilized by the job seeker, payment terms and conditions will be provided separately and must be agreed upon before access is granted to the paid services.</Typography>
          
          <Typography component={"h3"}>5. Termination Provision </Typography>
          <Typography>Job seekers may terminate their use of the Platform at any time by discontinuing access to the Platform. The Company may also terminate a job seeker's access to the Platform for any violation of these terms or for any other reason deemed necessary by the Company. Termination by the Company may result in the removal of the job seeker's account and associated data.
          </Typography>


          <Typography component={"h3"}>6. Intellectual Property </Typography>
          <Typography>
            <ul>
              <li>
              Ownership: All intellectual property rights in the Platform, including but not limited to trademarks, copyrights, and proprietary information, shall remain the exclusive property of the Company.
              </li>
              <li>
              Limited License: The Company grants job seekers a limited, non-exclusive, non-transferable, and revocable license to access and use the Platform solely for the purpose of searching for and applying to contract job opportunities.
              </li>
              <li>
              Prohibited Use: Job seekers shall not reproduce, modify, distribute, create derivative works, or exploit any part of the Platform without the prior written consent of the Company.
              </li>
            </ul>
          </Typography>
        

          <Typography component={"h3"}>7. Limitation of Liability </Typography>
          <Typography>

            <ul>
              <li>
              Job Ads and Listings: The Company is not responsible for the accuracy, completeness, or quality of the job ads and listings on the Platform. Job seekers acknowledge and understand that the Company does not endorse or guarantee the legitimacy or suitability of the job opportunities listed on the Platform. Job seekers agree to undertake their own due diligence and assessment of job opportunities.
              </li>
              <li>
              Communication: The Platform may facilitate communication between job seekers and employers. However, the Company is not responsible for any communication or interactions that occur outside the Platform. Job seekers are solely responsible for evaluating the legitimacy, safety, and suitability of any communication or interaction with employers.
              </li>
              <li>
              Third-Party Content: The Platform may contain links or references to third-party websites, services, or content. The Company does not endorse or assume any responsibility for the accuracy, completeness, or quality of such third-party content.
              </li>
              <li>
              No Guarantee: Job seekers acknowledge that the Company does not guarantee job placement, interview offers, or any specific outcome related to the use of the Platform.
              </li>
              <li>
              Indemnification: Job seekers agree to indemnify and hold the Company harmless from any claims, damages, liabilities, costs, or expenses arising from their use of the Platform or any violation of these terms.
              </li>
            </ul>
          </Typography>

          <Typography component={"h3"}>8. Data Protection and Privacy </Typography>
          <Typography>
            <ul>
              <li>
              Job Seeker Data: The Company collects and processes personal information from job seekers as described in the Privacy Policy. Job seekers consent to the collection, storage, and use of their personal data in accordance with the Privacy Policy.
              </li>
              <li>
              Resume and Profile Information: Job seekers understand that their resume and profile information may be shared with employers when they apply for job opportunities through the Platform. The Company takes reasonable measures to protect job seeker data, but cannot guarantee absolute security.
              </li>
              <li>
              Data Usage and Analytics: The Company may collect and use job seeker data, including usage patterns and preferences, for the purposes of improving the Platform, enhancing user experience, and generating aggregated statistical data. The Company may also utilize data analytics and algorithms to provide personalized job recommendations to job seekers.
              </li>
            </ul>
          </Typography>


          <Typography component={"h3"}>9. Dispute Resolution Process </Typography>
          <Typography>  
            <ul>
              <li>
              Class Action Waivers: Job seekers and the Company agree to resolve any disputes or claims arising from the use of the Platform individually, and waive any right to participate in class action lawsuits, class-wide arbitrations, or consolidated actions.
              </li>
              <li>
              Good Faith Negotiations: Any disputes arising from the use of the Platform shall be resolved amicably through good faith negotiations between the job seeker and the Company. If an amicable resolution cannot be reached, both parties agree to submit to the exclusive jurisdiction and venue of the competent courts in [Jurisdiction] for the resolution of any legal disputes.
              </li>
            </ul>
          </Typography> 
          
          <Typography  component={"h3"}>10. Modification of the Agreement</Typography>
          <Typography>The Company reserves the right to modify these Terms and Conditions at any time. Job seekers will be notified of any material changes to the Agreement, and continued use of the Platform after such notification constitutes acceptance of the modified terms.</Typography>

          <Typography  component={"h3"}>11. Severability </Typography>
          <Typography>If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. </Typography>

    
          
          
          <br /> <br />

          <Typography  component={"h2"}> Employers:</Typography> <br />
          <Typography>These Terms and Conditions govern the use of the DayRateWork platform provided by DayRateWork for employers posting contract job openings. By accessing or using the Platform, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please refrain from using the Platform. </Typography>
        
        <br />
          <Typography  component={"h3"}>1. Description of Service</Typography>
          <Typography>
             <ul>
              <li>
              Job Posting: The Platform allows employers to post contract job openings, including job titles, descriptions, requirements, compensation, and other relevant details. Employers are responsible for ensuring the accuracy, completeness, and legality of the job postings.

              </li>

              <li>
              Candidate Selection: Employers can review and evaluate job seeker applications received through the Platform. The Company does not guarantee the availability, suitability, or qualifications of job seekers, and the hiring decision rests solely with the employers.
              The Platform provides job matching functionality that suggests potential candidates based on employer-provided job requirements and job seeker profiles. However, the Company does not guarantee the accuracy or suitability of the suggested job matches.
              </li>
              <li>
              Salary Information: The Platform may provide employers with access to salary information to help inform their compensation decisions. Employers acknowledge that salary information provided on the Platform is for reference purposes only and should be used as a guideline rather than as definitive data.
              </li>

              <li>
              Screening Tools: The Platform may offer screening tools that allow employers to assess the qualifications and suitability of job seekers. Employers are responsible for ensuring that their screening processes comply with applicable laws and regulations.
              </li>

              <li>
              Communication: The Platform facilitates communication between employers and job seekers. Employers are responsible for ensuring that all communications with job seekers comply with applicable laws and regulations, including equal opportunity and non-discrimination laws.
              </li>

              <li>
              Candidate Import: The Platform may offer the ability for employers to import candidate data from external sources. Employers acknowledge that they are responsible for obtaining the necessary consents and complying with applicable data protection laws when importing candidate data.
              </li>
              <li>
              Data Analytics: The Company may analyze aggregated data and usage patterns on the Platform to provide employers with insights and recommendations for improving their hiring processes. The Platform may provide additional tools and features to enhance the employer's hiring process, such as analytics, reporting, and integration options. The availability and terms of these extended company tools may be subject to separate agreements and fees
              </li>

             </ul>
            
           </Typography>
           <Typography component={"h3"}>2. User Accounts and Security</Typography>
          <Typography>
            <ul>
              <li>
              Account Creation: Employers must create an account to access certain features and services on the Platform. Employers are responsible for maintaining the confidentiality of their account credentials and are solely responsible for all activities that occur under their account.
              </li>
              <li>
              User Responsibilities: Employers agree to provide accurate, current, and complete information during the registration process and to promptly update their profile information as needed. Employers must not share their account credentials with any third party or allow unauthorized access to their account.
              </li>
              <li>
              Security Measures: The Company employs reasonable security measures to protect employer data and account information. However, employers acknowledge that no method of transmission or storage is completely secure, and the Company cannot guarantee the absolute security of employer data.
              </li>
            </ul>
      
           </Typography>

          <Typography component={"h3"}>3. Pricing</Typography>
          <Typography>
          Job Posting: The Platform offers various pricing options for employers to post contract job openings. The Company reserves the right to modify the pricing and payment terms, and any changes will be communicated to employers in advance. <br />
          Third-Party Services: Employers may encounter third-party services or offers on the Platform that may have associated fees or charges. The Company is not responsible for any transactions or agreements made between employers and third-party providers.
             </Typography>
     

          <Typography component={"h3"}>4. Payment Terms </Typography>
          <Typography> Employers agree to pay the applicable fees for using fee-based services or features on the Platform. Payment terms and conditions will be provided separately, and employers must agree to these terms before accessing the paid services.</Typography>
          
          <Typography component={"h3"}>5. Termination Provision </Typography>
          <Typography>
            <ul>
              <li>
              Voluntary Termination: Employers may terminate their use of the Platform at any time by discontinuing access to the Platform and closing their account. Upon termination, the employer's account information and data may be retained by the Company as outlined in the Privacy Policy.
              </li>
              <li>
              Termination by the Company: The Company may terminate an employer's access to the Platform if the employer violates these terms or for any other reason deemed necessary by the Company. Termination by the Company may result in the removal of the employer's account and associated data.
              </li>
            </ul>
            
         
          </Typography>


          <Typography component={"h3"}>6. Intellectual Property </Typography>
          <Typography>
            <ul>
              <li>
              Ownership: All intellectual property rights in the Platform, including but not limited to trademarks, copyrights, and proprietary information, shall remain the exclusive property of the Company.
              </li>
              <li>
              Limited License: The Company grants employers a limited, non-exclusive, non-transferable, and revocable license to access and use the Platform solely for the purpose of posting job openings and evaluating job seeker applications.
              </li>
              <li>
              Prohibited Use: Employers shall not reproduce, modify, distribute, create derivative works, or exploit any part of the Platform without the prior written consent of the Company.

              </li>
            </ul>
          </Typography>
        

          <Typography component={"h3"}>7. Limitation of Liability </Typography>
          <Typography>

            <ul>
              <li>
              Job Postings: Employers are solely responsible for the accuracy, completeness, and legality of the job postings on the Platform. The Company does not endorse or assume any responsibility for the content of job postings.
              </li>
              <li>
              Candidate Evaluation: Employers are solely responsible for evaluating and selecting job seekers for their job openings. The Company does not guarantee the availability, suitability, or qualifications of job seekers.
              </li>
              <li>
              Third-Party Content: The Platform may contain links or references to third-party websites, services, or content. The Company does not endorse or assume any responsibility for the accuracy, completeness, or quality of such third-party content.
              </li>
              <li>
              No Guarantee: The Company does not guarantee the number of job seeker applications, the success of hiring efforts, or any specific outcome related to the use of the Platform.
              </li>
              <li>
              Indemnification: Employers agree to indemnify and hold the Company harmless from any claims, damages, liabilities, costs, or expenses arising from their use of the Platform or any violation of these terms.
              </li>
            </ul>
          </Typography>

          <Typography component={"h3"}>8. Data Protection and Privacy </Typography>
          <Typography>
            <ul>
              <li>
              Employer Data: The Company collects and processes personal information from employers as described in the Privacy Policy. Employers consent to the collection, storage, and use of their personal data in accordance with the Privacy Policy.
              </li>
              <li>
              Candidate Data: Employers understand that they will have access to job seeker information and data submitted through the Platform. Employers agree to handle job seeker data in compliance with applicable data protection and privacy laws and to use such data only for legitimate hiring purposes.
              </li>
              <li>
              Data Usage and Analytics: The Company may collect and use employer data, including usage patterns and preferences, for the purposes of improving the Platform, enhancing user experience, and generating aggregated statistical data.
              </li>
            </ul>
          </Typography>


          <Typography component={"h3"}>9. Dispute Resolution Process </Typography>
          <Typography>  
            <ul>
              <li>
              Class Action Waivers: Employers and the Company agree to resolve any disputes or claims arising from the use of the Platform individually, and waive any right to participate in class action lawsuits, class-wide arbitrations, or consolidated actions.
              </li>
              <li>
              Good Faith Negotiations: Any disputes arising from the use of the Platform shall be resolved amicably through good faith negotiations between the employer and the Company. If an amicable resolution cannot be reached, both parties agree to submit to the exclusive jurisdiction and venue of the competent courts in [Jurisdiction] for the resolution of any legal disputes.
              </li>
            </ul>
          </Typography> 
          
          <Typography  component={"h3"}>10. Modification of the Agreement</Typography>
          <Typography>The Company reserves the right to modify these Terms and Conditions at any time. Employers will be notified of any material changes to the Agreement, and continued use of the Platform after such notification constitutes acceptance of the modified terms.</Typography>

          <Typography  component={"h3"}>11. Severability </Typography>
          <Typography>If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. </Typography>

          <br /><br />
    
          <Typography  component={"h2"}> All Users:</Typography> <br />
          <Typography  component={"h3"}>1. Rules for Using the Site </Typography>
          <Typography>
            <ul>
              <li>
              Compliance: Users agree to comply with all applicable laws, regulations, and these Terms and Conditions when using the Platform. Users shall not engage in any activities that may infringe upon the rights of others or violate the privacy, security, or integrity of the Platform.
              </li>
              <li>
              Prohibited Activities: Users shall not engage in any activities that are illegal, fraudulent, harmful, offensive, or disruptive to the proper functioning of the Platform. This includes but is not limited to unauthorized access, data scraping, spamming, or spreading malware.
              </li>
              <li>
              Account Security: Users are responsible for maintaining the confidentiality of their account credentials and ensuring the security of their account. Users shall not share their account credentials with any third party or allow unauthorized access to their account.

              </li>
            </ul>
          </Typography>


          <Typography  component={"h3"}>2. User Content </Typography>
          <Typography>
            <ul>
              <li>
              Ownership: Users retain ownership of any content they submit or upload to the Platform, including but not limited to job seeker profiles, job postings, messages, and feedback. However, by submitting User Content, users grant the Company a non-exclusive, worldwide, royalty-free, and transferable license to use, reproduce, modify, adapt, distribute, and display the User Content for the purposes of providing and improving the Platform.
              </li>
              <li>
              User Responsibilities: Users are solely responsible for the accuracy, legality, and appropriateness of their User Content. Users shall not submit or upload any content that is infringing, defamatory, offensive, or violates the rights of others.
              </li>
              <li>
              User Content Removal: The Company reserves the right to remove or disable any User Content that violates these Terms and Conditions or is otherwise objectionable. Users acknowledge that the Company has no obligation to monitor User Content but may do so at its discretion.
              </li>
              <li>
              License to User Content and Feedback: By submitting User Content to the Platform, users represent and warrant that they have the necessary rights to grant the license described in Section 2(a) and that the User Content does not infringe upon the rights of any third party.
              
              <br />
              Users may provide feedback, suggestions, or ideas to the Company regarding the Platform. Users grant the Company a non-exclusive, worldwide, royalty-free, and perpetual license to use, reproduce, modify, adapt, distribute, and display the Feedback for any purpose without any obligation or compensation to the user.
              </li>
            </ul>
          </Typography>



          <Typography  component={"h3"}>3. Creating and Accessing User Accounts </Typography>
          <Typography>
            <ul>
              <li>
              Account Creation: Users may be required to create an account to access certain features and services on the Platform. Users agree to provide accurate, current, and complete information during the registration process and to promptly update their profile information as needed.
              </li>
              <li>
              Account Termination: Users may terminate their account at any time by following the account closure process provided on the Platform. The Company reserves the right to terminate a user's account for violation of these Terms and Conditions or for any other reason deemed necessary by the Company.
              </li>
              <li>
              Contact Information: Users agree to provide accurate and up-to-date contact information, including email address, phone number, and billing information if applicable. Users are responsible for maintaining the accuracy of their contact information.
              </li>
             
            </ul>
          </Typography>


          <Typography  component={"h3"}>4. Payments, Ads, and Subscription </Typography>
          <Typography>
            <ul>
              <li>
              Payment Policies: Users agree to pay any applicable fees for using fee-based services or features on the Platform. Payment terms and conditions will be provided separately, and users must agree to these terms before accessing the paid services.
              </li>
              <li>
              Advertising: The Platform may display advertisements from third-party advertisers. Users acknowledge that the Company is not responsible for the content, accuracy, or legality of such advertisements.
              </li>
              <li>
              Subscription Services: If the Platform offers subscription services, additional terms and conditions may apply, including renewal terms, cancellation policies, and pricing details. Users will be provided with these terms before subscribing to such services.
              </li>
             
            </ul>
          </Typography>



          <Typography  component={"h3"}>5. Billing Policies </Typography>
          <Typography>
            <ul>
              <li>
              Billing Information: Users shall provide accurate and up-to-date billing information if required for payment processing. Users authorize the Company or its third-party payment processors to charge the designated payment method for any applicable fees.
              </li>
              <li>
              Automatic Renewal: If a subscription service is offered, users may be enrolled in automatic renewal unless they cancel their subscription before the renewal date. Users are responsible for managing their subscription settings and canceling their subscription if desired.
              </li>
         
             
            </ul>
          </Typography>



        


          <Typography component={"h3"}>Other Key Points </Typography>
          <Typography> 
          <b>a.</b> Intellectual Property: All intellectual property rights in the Platform, including but not limited to trademarks,  logos, text, graphic, copyrights, and proprietary information, shall remain the exclusive property of the Company. Users shall not reproduce, modify, distribute, or create derivative works based on the Platform without the Company's prior written consent. <br/>

          <b>b.</b> External Sites: The Platform may contain links or references to third-party websites, services, or content. The Company does not endorse or assume any responsibility for the accuracy, completeness, or quality of such third-party content. Users access external sites at their own risk and should review the terms and privacy policies of those sites. <br/>

          <b>c.</b>  Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the Company is registered. All users of the Platform, including job seekers and employers, shall comply with applicable laws and regulations while using the Platform. The Company shall not be held liable for any violations of such laws or regulations by users. <br/>
          <b>d.</b>  Severability: If any provision of this Agreement is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.  <br/>
          <b>e.</b>  Entire Agreement: This Agreement constitutes the entire agreement between the parties regarding the use of the Platform and supersedes all prior agreements or understandings, whether written or oral.  <br/>

          <b>f.</b> Modifications to the Agreement:
          The Company reserves the right to modify these Terms and Conditions at any time. Users will be notified of any material changes to the Agreement, and continued use of the Platform after such notification constitutes acceptance of the modified terms.
          </Typography>


          <Typography>   By accessing or using the DayRateWork Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any part of this Agreement, you must not use the Platform.
          </Typography>





        </Box>
      </Box>
    </PublicLayout>
  );
};

export default CookieStatement;
