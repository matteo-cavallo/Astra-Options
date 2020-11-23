import React from "react";
import { Card, Layout, TextField } from "@shopify/polaris";

export default OptionMaker = ()=> {
  return (
      <Card title="Astra Option" sectioned>
        <FormLayout>
          <FormLayout.Group condensed>
            <TextField label="Title" onChange={() => {}} />
            <TextField label="Description" onChange={() => {}} />
            <TextField label="Input Type" onChange={() => {}} />
            <TextField label="Required" onChange={() => {}} />
            <TextField label="Price" onChange={() => {}} />
          </FormLayout.Group>
        </FormLayout>
      </Card>
  );
}

