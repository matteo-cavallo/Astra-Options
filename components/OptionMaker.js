import React from "react";
import { Card, Layout, TextField,FormLayout,Button } from "@shopify/polaris";

function OptionMaker ({name,remove}) {

  return (
      <Card title={name} sectioned>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField label="Title" onChange={() => {}} />
            <TextField label="Description" onChange={() => {}} />
            <TextField label="Input Type" onChange={() => {}} />
            <TextField label="Required" onChange={() => {}} />
            <TextField label="Price" onChange={() => {}} />
            <TextField label="MoreOptions" onChange={() => {}} />
            <TextField label="MoreOptions2" onChange={() => {}} />
          </FormLayout.Group>
        </FormLayout><br/>
        <Button onClick={()=>remove(name)}>Remove</Button>
      </Card>
  );
}


export default OptionMaker;

