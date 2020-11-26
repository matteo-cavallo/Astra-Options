import React,{useState,useCallback} from "react";
import { Card, Layout, TextField,FormLayout,Button } from "@shopify/polaris";

function OptionMaker ({name,remove}) {
  const [optionForm,setOptionForm] = useState({});
  const handleOptionFormChange = useCallback((value,field) =>{ 
    setOptionForm({...optionForm,[field]:value}),[];
    console.log(optionForm)
});
  return (
      <Card title={name} sectioned>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField label="Title"  value={optionForm.title} onChange={(value) => {handleOptionFormChange(value,"title")}} />
            <TextField label="Description" value={optionForm.description} onChange={(value) => {handleOptionFormChange(value,"description")}} />
            <TextField label="Input Type" value={optionForm.type} onChange={(value) => {handleOptionFormChange(value,"type")}} />
            <TextField label="Required" value={optionForm.required} onChange={(value) => {handleOptionFormChange(value,"required")}} />
            <TextField label="Price" value={optionForm.price} onChange={(value) => {handleOptionFormChange(value,"price")}} />
            <TextField label="MoreOptions" value={optionForm.moreoption1} onChange={(value) => {handleOptionFormChange(value,"moreoption1")}} />
            <TextField label="MoreOptions2" value={optionForm.moreoption2} onChange={(value) => {handleOptionFormChange(value,"moreoption2")}} />
          </FormLayout.Group>
        </FormLayout><br/>
        <Button onClick={()=>remove(name)}>Remove</Button>
      </Card>
  );
}


export default OptionMaker;

