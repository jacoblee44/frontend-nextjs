import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { TextInput } from "@/components/atoms/textInput";
import { SelectInput } from "@/components/atoms/select";

interface ChangeDealQuesModalDialogProps {
  value?: string,
  label?: string
  data?: [],
  open: boolean,
  onChange?(value: string, field: string): void,
  onClick?(): void,
  onClose?(): void,
}

interface QuestionType {
  code: string;
  value: string;
}

const questions: readonly QuestionType[] = [
  { code: 'checkbox', value: 'checkbox' },
  { code: 'radio', value: 'radio' },
  { code: 'selectfield', value: 'selectfield' },
  { code: 'textarea', value: 'textarea' },
  { code: 'textfield', value: 'texfield' },
]

const DealQuesModal: React.FC<ChangeDealQuesModalDialogProps> = (props) => {
  return (
    <>
      <Dialog
        open={props?.open}
      >
        <DialogContent>
          <div style={{width: 300}}>
          <TextInput
              type={"hidden"}
              value={props?.value?.split('::')[4]}
              />
          <TextInput
              type={"hidden"}
              value={props?.value?.split('::')[3]}
              />
          <TextInput
              type={"text"}
              label="Question Title"
              value={props?.value?.split('::')[2]}
              onChange={(e) => {
                if(props?.onChange) {
                  props?.onChange(e?.target?.value,'questitle');
                }
              }}
              />
              <SelectInput
                label="Question Type"
                required={true}
                value={props?.value?.split('::')[0]}
                data={questions}
                onChange={(e) => {
                  if(props?.onChange) {
                    props?.onChange(e?.target?.value,'questype');
                  }
                }}
              />
             <TextInput
              type={"text"}
              label={"Answer Options"}
              value={props?.value?.split('::')[1]}
              onChange={(e) => {
                if(props?.onChange) {
                  props?.onChange(e?.target?.value,'quesinputflds');
                }
              }}
              />             
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props?.onClick}>Submit</Button>
          <Button onClick={props?.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { DealQuesModal };
