import { Button } from "@/components/atoms/button";
import { JobPostBanner } from "@/components/layouts";
import { useQuestionFormStyles } from "@/static/stylesheets/employee-job/questionFormStyles";
import {
  Box,
  Checkbox,
  Grid,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ChipBox } from "@/components/atoms/chip";
import { SelectInput } from "@/components/atoms/select";
import { TextInput } from "@/components/atoms/textInput";

interface AnswerBoxProps {
    ifields:string;
    ititle:string;
    iselected:string;
    isdefault:boolean;
    onCloseClick(): void;
}


export const AnswerBox: React.FC<AnswerBoxProps> = (props) => {
  
  let iputflds = props?.ifields.toString().split(':');
  let iputvals = iputflds[1].split(',');
  const [iselect, setiSelect] = useState(props?.iselected); 
  const [icheck, setiCheck] = useState(props?.iselected);
  const [itext, setiText] = useState("");
  const [itextarea, setiTextarea] = useState("");
  const [idropdown, setiDropdown] = useState(props?.iselected); 
  
  return (

    <Box>
        <Box className="qsn-box">
            <Typography component="h4">
                Applicant question:{" "}
                <span>
                {props?.ititle}
                </span>
            </Typography>

            {props?.isdefault == false && <CloseIcon onClick={props?.onCloseClick} /> }
        </Box>
        <Box className="content-box">
            
            {iputflds[0] == "radio" && iputvals && iputvals.length > 0 && iputvals.map((row: any) => (
            <Box className="radio-box" sx={{ height: 45, display: "flex" }}>
                <FormControlLabel
                value={row}
                control={<Radio />}
                label={row}
                checked={(iselect == row) ? true : false}
                onClick={() => { setiSelect(row) }}
                />
            </Box> 
            ))} 
             { iputflds[0] == "checkbox" && iputvals && iputvals.length > 0 && iputvals.map((row: any) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={(iselect == row) ? true : false}
                  onClick={() => { setiCheck(row) }}
                  value={icheck}
                />
              }
              label={row}
            />
            ))}
            {iputflds[0] == "select" &&
                <SelectInput
                data={iputvals}
                value={idropdown}
                onChange={(e) => { setiDropdown(e.target.value) }}
            />
            }
            {iputflds[0] == "text" &&
             <TextInput
             type={'text'}
             value={itext}
             onChange={(e) => setiText(iputflds[1]) }
            />
            }
            {iputflds[0] == "textarea" &&
             <textarea style={{ width: "100%", background: "#FAFAFA", color: "#000000", borderRadius: "10px", padding: "10px", resize: "none", }}
             rows={3}
             onChange={(e) => setiTextarea(iputflds[1]) }
             value = {itextarea}
           >
           </textarea>
          }
          <Box
                sx={{
                display: "flex",
                justifyContent: "space-between",
                }}
            >
              <Typography component="h2"></Typography>
                { /*<Typography component="h2">
                Applicant should be able to
            </Typography><ChipBox label="deal breaker" icon={<CheckIcon />} bg={false} /> */ }
                
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => alert('test')}
                    />
                  }
                  label="Deal Breaker"
                />
            </Box>
        </Box>
    </Box>
  );
};
