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
    <PublicLayout pageProps={{ title: "Cookie Statement" }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"banner"}>
          <Box sx={{ width: { md: '60%', sm: '60%', xs: '90%' }, margin: '0 auto' }}>
            <Typography component={"h2"}>Community Guideline</Typography>
            <Typography>
              DayRateWork  is committed to maintaining a positive and respectful community for all users of our software platform . These Community Guidelines are designed to ensure a safe and inclusive environment where users can connect, collaborate, and engage in a professional manner. By accessing or using the Platform, you agree to adhere to these guidelines. Failure to comply with these guidelines may result in the termination or suspension of your account.
            </Typography>
            <Box className={"back-button"} onClick={goBack}> <ArrowBackIosNewOutlinedIcon /> Go Back  </Box>
          </Box>
        </Box>

        <Box className={"content"}>
          <Typography component={"h3"}>1. Respect and Professionalism:</Typography>
          <Typography>a. Treat others with respect: Be courteous, kind, and considerate when interacting with other users. Do not engage in personal attacks, harassment, or discrimination based on race, ethnicity, gender, sexual orientation, religion, disability, or any other protected characteristic.</Typography>

          <Typography>
            b. Maintain professionalism: Use professional language and tone in all communications. Avoid offensive, vulgar, or inappropriate content that may be offensive or harmful to others.
          </Typography>

          <Typography>
            c. Be inclusive: Embrace diversity and inclusion. Do not engage in any behavior that excludes or discriminates against others based on their background, beliefs, or identity.
          </Typography>



          <Typography component={"h3"}>2. Compliance with Laws and Regulations: </Typography>
          <Typography>a. Follow applicable laws and regulations: Ensure that your actions on the Platform comply with all local, national, and international laws and regulations, including but not limited to employment, privacy, and data protection laws.</Typography>

          <Typography>
            b. Intellectual property: Respect intellectual property rights and do not infringe upon the copyrights, trademarks, or patents of others. Do not post or share content that violates intellectual property rights.
          </Typography>



          <Typography component={"h3"}>3. Prohibited Content and Activities: </Typography>
          <Typography>a. Offensive or harmful content: Do not post or share content that is offensive, defamatory, obscene, pornographic, or otherwise objectionable. Content that promotes violence, discrimination, or illegal activities is strictly prohibited.</Typography>

          <Typography>
            b. Spam and scams: Do not engage in spamming, phishing, or any fraudulent activities. Do not post or share deceptive or misleading information.
          </Typography>

          <Typography>
            c. Unauthorized access: Do not attempt to access or use another user's account without their permission. Do not engage in hacking, cracking, or any unauthorized activity that compromises the security or privacy of the Platform or its users.
          </Typography>
          <Typography>
            d. Impersonation: Do not impersonate another individual, organization, or entity. Use your real identity and provide accurate information when using the Platform.
          </Typography>
          <Typography>
            e. Malicious software: Do not upload or distribute any content that contains viruses, malware, or other harmful software that may disrupt or damage the Platform or users' devices.
          </Typography>




          <Typography component={"h3"}>4. Reporting Violations: </Typography>
          <Typography>a. Reporting misconduct: If you encounter any user who violates these Community Guidelines or engages in inappropriate behavior, please report it to us through the designated reporting channels provided on the Platform.</Typography>

          <Typography>
            b. False reports: Do not make false or malicious reports against other users. Reports should be made in good faith and based on genuine concerns.
          </Typography>




          <Typography component={"h3"}>5. Enforcement and Consequences: </Typography>
          <Typography>a. Violation consequences: Violation of these Community Guidelines may result in the removal, suspension, or termination of your account and access to the Platform, at our sole discretion. Repeat or severe violations may lead to permanent removal and may be reported to relevant authorities if necessary.</Typography>

          <Typography>
            b. Discretionary actions: We reserve the right to take appropriate actions, including removing or modifying content, disabling accounts, and cooperating with law enforcement authorities, as deemed necessary to enforce these guidelines and protect the community.
          </Typography>








          <Typography>These Community Guidelines are in place to foster a positive and respectful community on the DayRateWork Platform. We appreciate your cooperation in maintaining a safe and inclusive environment for all users.</Typography>

        </Box>
      </Box>
    </PublicLayout>
  );
};

export default CookieStatement;
