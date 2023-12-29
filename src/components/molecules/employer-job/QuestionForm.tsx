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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ChipBox } from "@/components/atoms/chip";
import { SelectInput } from "@/components/atoms/select";
import { TextInput } from "@/components/atoms/textInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { apiClient, endpoints } from "@/api";
import { FormError } from "@/components/organisms/form-error";
import { useComponentState, useInput, useThrottle, useAppSelector } from "@/hooks";
import { DealQuesModal } from "@/components/molecules/modal/DealQuesModal";
import { updateDealQuestions, clearupdateDealQuesResponse, storeAuthInfo, logout} from "@/redux/actions";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { useFormMethods } from "@/hooks/form";
import { AuthService } from "@/services/auth";
import { useAuthInfo } from "@/hooks/custom";
import toast from "react-hot-toast";

import { AnswerBox } from "@/components/molecules/employer-job/AnswerBox";

interface QuestionFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  jobid:number;
}

export const QuestionForm: React.FC<QuestionFormProps> = (props) => {
  const classes = useQuestionFormStyles();
  const { bindInput, values, register, setValue, errors, hasError, clearErrors } = useFormMethods();
  interface PredealQuesCat {
    value: string;
    id: number;
    selected: boolean;
  }

  let predealquescatall: readonly PredealQuesCat[] = [];
  const [predealQuesCat, setPredealQuesCat] = useState(predealquescatall);

  const {
    state: {
      DealQuesModalOpen,
      PredealQuesList
    },
    setState,
  } = useComponentState({
    PredealQuesList: [],
    DealQuesModalOpen: false,
  });

  interface PredealQues {
    qtitle: string;
    inputfields: string;
    category: string;
  }

  let predealquesall: readonly PredealQues[] = [];
  const [predealQues, setPredealQues] = useState(predealquesall);


  const updateDealQuesResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_DEALQUES];

  let jobId = props?.jobid ? props?.jobid : values['jobId'];

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionCategory, setQuestionCategory] = useState(0);
  const [questionType, setquestionType] = useState("");
  const [questionInputFlds, setQuestionInputFlds] = useState("");
  const [tempquestionInputFlds, settempQuestionInputFlds] = useState("");
  const [questionDefault, setQuestionDefault] = useState<any>([]);
  const [customQuestion, setCustomQuestion] = useState<any>([]);

  //const [typeloaded, setTypeLoaded] = useState(false);

  /*const predealquestioncategory = (typeof values['dealbreaker.predealquestioncategory'] != undefined) ? values['dealbreaker.predealquestioncategory']:'', jobtypesError = (typeof errors['dealbreaker.predealquestioncategory'] != undefined) ? errors['dealbreaker.predealquestioncategory']:'';
  const predealquestiontitle = (typeof values['dealbreaker.predealquestiontitle'] != undefined) ? values['dealbreaker.predealquestiontitle']:'', jobschedulesError = (typeof errors['dealbreaker.predealquestiontitle'] != undefined) ? errors['dealbreaker.predealquestiontitle']:'';
  const predealinputfields = (typeof values['dealbreaker.predealinputfields'] != undefined) ? values['dealbreaker.predealinputfields']:'', contractlengthError = (typeof errors['dealbreaker.predealinputfields'] != undefined) ? errors['dealbreaker.predealinputfields']:'';*/


  const { userData: authUser } = useAuthInfo();
  const userid = authUser?._id;

  const handleSelectquesdialog = (selectedItem: any) => {
    setState({ DealQuesModalOpen: true })
    setQuestionCategory(selectedItem);
  }
  const handleSelectcopyques = async (catid: any) => {

    await apiClient.post({
      url: endpoints.private.getpredealQuestions,
      data: {
        predealcatid:catid,
      }
    }).then((res) => {
      if (res?.data) {
        const quesData = res?.data?.ques;
        //console.log(JSON.stringify(quesData));
        //setQuestionDefault([...questionDefault, catid]);
        questionDefault.push(catid);
        setQuestionDefault(questionDefault);
        listpredealquestions();
        listpredealquescat();
      }
    }).catch(() => {
    });
  }
  const savepredealquestionsans = async () => {
    await apiClient.post({
      url: endpoints.private.savepredealQuestions,
      data: {
        jobid:jobId,
      },
    }).then((res) => {
      if (res?.data) {
        const predealquesData = res?.data?.dques;
      }
    }).catch(() => {
    });
  }
  const listpredealquestions = async () => {

    await apiClient.post({
      url: endpoints.private.getallpredealQuestions
    }).then((res) => {
      if (res?.data) {
        const predealquesData = res?.data?.dques;
        //console.log(predealquesData);
        let predealquesnew = [];
        let quescatnew = questionDefault;
        for(var jd = 0; jd < predealquesData.length; jd++){
          predealquesnew.push({"qtitle":predealquesData[jd].predealquestiontitle, "inputfields":predealquesData[jd].predealinputfields, "category":predealquesData[jd].predealquestioncategory, "isdefault":predealquesData[jd].isdefault, "id":predealquesData[jd]._id});
          if(predealquesData[jd].isdefault === true) {
            console.log(predealquesData[jd].predealquestioncategory);
            //setQuestionDefault([...questionDefault, predealquesData[jd].predealquestioncategory]);
            quescatnew.push(predealquesData[jd].predealquestioncategory);
          }
        }
        setQuestionDefault(quescatnew);
        console.log(questionDefault)
        setPredealQues(predealquesnew);
        //setTypeLoaded(true);
      }
    }).catch(() => {
    });
  };
  const listpredealquescat = async () => {
    await apiClient.get({
      url: endpoints.private.getallpredealCategory
    }).then((res) => {
      if (res?.data) {
        const predealquescatData = res?.data?.dcat;
        let predealquescatnew = [];
        for(var jd = 0; jd < predealquescatData.length; jd++){
          predealquescatnew.push({"value":predealquescatData[jd].predealcategoryname, "id":predealquescatData[jd]._id, "selected":false})
        }
        setPredealQuesCat(predealquescatnew);
        //setTypeLoaded(true);
      }
    }).catch(() => {
    });
  };

  const handlecatclose = (index:any, cat:any) => {
    let predealquesnew = [];
    let quescatnew = predealQues;
    for(var jd = 0; jd < quescatnew.length; jd++){
      if(jd != index){
        predealquesnew.push(quescatnew[jd]);
      }
    }
    setPredealQues(predealquesnew);

    let predealqueslistnew = [];
    let quescatlistnew = predealQuesCat;

    for(var jd = 0; jd < quescatlistnew.length; jd++){
      if(quescatlistnew[jd].id != cat){
        predealqueslistnew.push(quescatlistnew[jd]);
      }
    }
    setPredealQuesCat(predealqueslistnew);

  }

  const handlecustclose = (index:any) => {
    let predealquesnew = [];
    let quescatnew = customQuestion;
    for(var jd = 0; jd < quescatnew.length; jd++){
      if(jd != index){
        predealquesnew.push(quescatnew[jd]);
      }
    }
    setCustomQuestion(predealquesnew);
  }

  useEffect(() => {
    if (updateDealQuesResponse && updateDealQuesResponse.success) {
      toast.success("User Name Updated Successfully!");
      setState({ DealQuesModalOpen: false});
      clearupdateDealQuesResponse();
      new AuthService().getAuthUser(userid, (userData) => {
        storeAuthInfo({userData: userData});
      });
    }

    if (updateDealQuesResponse && updateDealQuesResponse.error) {
      const error = updateDealQuesResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to update Questions!");
      }
      clearupdateDealQuesResponse();
    }
  }, [updateDealQuesResponse]);

  useEffect(() => {
    listpredealquestions();
    listpredealquescat();
  }, []);
  let iputflds = [];
  let iputflds1 = "";
  let iputvals = [];
  return (

    <Box className={classes.root}>
      <JobPostBanner
        title="Have to have it? Make it a deal breaker."
        description="We won’t notify you of candidates who don’t meet your deal breaker qualification questions. You can review then anytime on your candidate dashboard."
      />
      <Box className="box">
        {predealQues && predealQues.length > 0 && predealQues.map((row: any, index) => (
            (questionDefault.indexOf(row?.category) > -1) ? <AnswerBox ititle={row?.qtitle} ifields={row?.inputfields} isdefault={row?.isdefault} iselected={""} onCloseClick = { () => { handlecatclose(index,row?.category); } }/> :  ``
        ))}
        {customQuestion && customQuestion.length > 0 && customQuestion.map((row: any, index: any) => (
            <AnswerBox ititle={row?.qtitle} ifields={row?.qtype+':'+row?.inputfields} isdefault={false} iselected={""}  onCloseClick = { () => { handlecustclose(index); } } />
        ))}
        <Box>
        <Box className="content-box" style={{borderRadius: "10px"}}>
          <Typography
            sx={{
              border: "1px solid #000000",
              borderRadius: "10px",
              display: "flex",
              width: { md: "40%", sm: "50%", xs: "60%" },
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            Browse more qualification questions
            <KeyboardArrowDownIcon />

          </Typography>

            <Box className="chip">
              <Box style={{display:"flex", flexWrap:"wrap"}}>
              {predealQuesCat && predealQuesCat.length > 0 && predealQuesCat.map((row: any) => (
                (row?.value == 'Create custom question') ? (
                  <ChipBox label={row?.value} key={row?.value} selectType={(item) => handleSelectquesdialog?.(row?.id)} icon={<AddIcon />}  />
                ) : (
                  (questionDefault.indexOf(row?.id) <= -1) ? <ChipBox label={row?.value} key={row?.value} selectType={() => handleSelectcopyques(row?.id)} icon={<AddIcon />}  /> : ``
                )
              ))}
              </Box>
            </Box>
        </Box>
        </Box>
      </Box>

      <DealQuesModal
        open={DealQuesModalOpen}
        value={tempquestionInputFlds}
        onClose={() => setState({ DealQuesModalOpen: false })}
        onChange={(value,field) => {
          var qtitle = '';
          var qtype = '';
          var qinputflds = '';
          var qcat = 0;
          if(tempquestionInputFlds != ""){
            qtitle = tempquestionInputFlds.split('::')[2];
            qtype = tempquestionInputFlds.split('::')[0];
            qinputflds = tempquestionInputFlds.split('::')[1];
          }
          if(field=='questype') {
            setquestionType(value);
            settempQuestionInputFlds(value+'::'+qinputflds+'::'+qtitle+'::'+qcat+'::'+jobId);
          } else if(field=='quesinputflds') {
            setQuestionInputFlds(qtype+'::'+value);
            settempQuestionInputFlds(qtype+'::'+value+'::'+qtitle+'::'+qcat+'::'+jobId);
          } else if(field=='questitle'){
            setQuestionTitle(value);
            settempQuestionInputFlds(qtype+'::'+qinputflds+'::'+value+'::'+qcat+'::'+jobId);
          }
        }}
        onClick={() => {
          if (questionTitle == "" || ((questionType == 'radio' || questionType=="select" || questionType=="checkbox") && questionInputFlds == "")) {
            toast.error("Please Input all required fields!");
            return false;
          }
          var qtitle = '';
          var qtype = '';
          var qinputflds = '';
          if(tempquestionInputFlds != ""){
            qtitle = tempquestionInputFlds.split('::')[2];
            qtype = tempquestionInputFlds.split('::')[0];
            qinputflds = tempquestionInputFlds.split('::')[1];
          }
          var cusques = customQuestion;
          cusques.push({"qtitle":qtitle, "qtype":qtype, "inputfields":qinputflds, "category":0});
          setCustomQuestion(cusques);
          setquestionType('');
          setQuestionInputFlds('');
          setQuestionTitle('');
          settempQuestionInputFlds('');

        }}
      />

      <Box className="bottom">
        <Button
          onClick={props?.onClickPrev}
          title="< Back"
          width="170px"
          height="60px"
          btnType="border"
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { md: "row", sm: "column", xs: "column" },
          }}
        >
          <Button
            title="Show Preview"
            width="190px"
            height="60px"
            btnType="border"
          />
          <Button
            onClick={savepredealquestionsans}
            title="Save & Continue"
            width="220px"
            height="60px"
          />
        </Box>
      </Box>
    </Box>
  );
};
