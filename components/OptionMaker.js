import React,{useState,useCallback} from "react";
import { Card, TextField,FormLayout,Button,Select } from "@shopify/polaris";



function OptionMaker ({name,remove,saveForm}) {
  const inputTypeOptions =[
    {label: 'TextField', value: 'textfield'},
    {label: 'Select', value: 'select'},
    {label: 'Radius', value: 'radius'},
    {label: 'CheckBox', value: 'checkbox'},
  ];

  const [optionForm,setOptionForm] = useState({type:"textfield"});

  const handleOptionFormChange  =  useCallback((value,field) =>{ 
    setOptionForm({...optionForm,[field]:value});
    console.log(optionForm)
  });  


  return (
      <Card title={name} sectioned>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField label="Title"  value={optionForm.title} onChange={(value) => {handleOptionFormChange(value,"title");}} />
            <TextField label="Description" value={optionForm.description} onChange={(value) => {handleOptionFormChange(value,"description")}} />
            <Select    label="Input Type" options={inputTypeOptions} value={optionForm.type} onChange={(value) => {handleOptionFormChange(value,"type")}} />
            <TextField label="Required" value={optionForm.required} onChange={(value) => {handleOptionFormChange(value,"required")}} />
            <TextField label="Price" value={optionForm.price} onChange={(value) => {handleOptionFormChange(value,"price")}} />
            <TextField label="MoreOptions" value={optionForm.moreoption1} onChange={(value) => {handleOptionFormChange(value,"moreoption1")}} />
            <TextField label="MoreOptions2" value={optionForm.moreoption2} onChange={(value) => {handleOptionFormChange(value,"moreoption2")}} />
          </FormLayout.Group>
        </FormLayout><br/>
        <div style={{display: "flex"}}>
          <div style={{ color: "#bf0711",margin:"3px" }}>
            <Button monochrome outline onClick={()=>remove(name)}>Remove</Button>
          </div>

          <div style={{ color: "#5865C2",margin:"3px" }}>
            <Button monochrome outline onClick={()=>saveForm(name,optionForm)}>Save</Button>
          </div>
        </div>
        
      </Card>
  );
}


export default OptionMaker;

