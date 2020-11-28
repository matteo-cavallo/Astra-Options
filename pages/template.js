import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  InlineError,
} from "@shopify/polaris";
import React, { useState, useCallback, useReducer } from "react";
import OptionMaker from "../components/OptionMaker.js";

const optionsReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.form];
    case "remove": {
      let productIndex = state.findIndex((item) => item.key == action.key);
      if (productIndex < 0) {
        return state;
      }
      let update = [...state];
      update.splice(productIndex, 1);
      return update;
    }
    case "saveForm": {
      let productIndex = state.findIndex((item) => item.key == action.key);
      if (productIndex < 0) {
        return state;
      }
      let update = [...state];
      update[productIndex] = {
        ...update[productIndex],
        formData: action.formData,
      };
      return update;
    }
    default:
      return state;
  }
};

export default function Template({ shopOrigin }) {
  //Text State Manager
  const [templateNameValue, setTemplateNameValue] = useState("");
  const [optionNameValue, setOptionNameValue] = useState("");
  //Validation
  const [errorMessage, setErrorMessage] = useState({});
  //List State Management Reducer
  const [theOptions, setTheOptions] = useReducer(optionsReducer, []);
  //TextHandlers
  const handleTemplateNameChange = useCallback(
    (value) => setTemplateNameValue(value),
    []
  );
  const handleOptionNameChange = useCallback(
    (value) => setOptionNameValue(value),
    []
  );


  //validation method
  const checkName = (thiskey) => {
    let state = [...theOptions];
    let productIndex = -1;
    productIndex = state.findIndex((item) => item.key == thiskey);
    if (productIndex == -1) {
      return false;
    } else {
      return true;
    }
  };

  const add = () => {
    if (optionNameValue != null &&optionNameValue != "") {
      if(!checkName(optionNameValue)){
        //remove previus errors
        if (errorMessage.OptionName != "")setErrorMessage({ ...errorMessage, OptionName: "" ,OptionError:""});

        let option = {
          key: optionNameValue,
          form: (
            <OptionMaker
              key={optionNameValue}
              id={optionNameValue}
              name={optionNameValue}
              remove={remove}
              saveForm={saveForm}
            />
          ),
        };
        setTheOptions({ form: option, type: "add" });
        setOptionNameValue("");

      }else{
      setErrorMessage({ ...errorMessage, OptionName: "error", OptionError:"Option name already used!" });
      }
    } else {
      setErrorMessage({ ...errorMessage, OptionName: "error", OptionError:"Option name is required!" });
    }
  };

  const remove = (mykey) => {
    setTheOptions({ key: mykey, type: "remove" });
  };

  const saveForm = (mykey, formData) => {
    setTheOptions({ key: mykey, type: "saveForm", formData: formData });
    console.log(theOptions)
  };


  //Final method for saving all the template
  const saveTemplate = () => {
    if (templateNameValue != null && templateNameValue != "") {
      //remove previus errors
      if (errorMessage.TemplateName != "")setErrorMessage({ ...errorMessage, TemplateName: "" });

      

    } else {
      setErrorMessage({ ...errorMessage, TemplateName: "NoTemplateName" });
    }
    //TODO:get template name
    //TODO:get the options
    //TODO:push to firebase
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Layout>
            <Layout.Section>
              <Card title="Template Layout" sectioned>
                {theOptions.length == 0 ? (
                  <h1>No Options Added</h1>
                ) : (
                  theOptions.map((option) => option.form)
                )}
              </Card>
            </Layout.Section>
            <Layout.Section secondary>
              <Card title="Options" sectioned>
                <TextField
                  label="Template Name"
                  value={templateNameValue}
                  onChange={handleTemplateNameChange}
                  placeholder="Example: ClothesTemplate "
                />
                <br />
                <Button primary onClick={saveTemplate}>
                  Save Template
                </Button>
                <br />
                <br />
                {errorMessage.TemplateName == "NoTemplateName" && (
                  <InlineError
                    message="Template name is required"
                    fieldID="TemplateNameErrorField"
                  />
                )}
                <br />
                <hr />
                <TextField
                  label="New Option Name"
                  value={optionNameValue}
                  onChange={handleOptionNameChange}
                  placeholder="Example: Option size "
                />
                <br />
                <Button onClick={add}>Add Option Field</Button>
                <br />
                <br />
                {errorMessage.OptionName == "error" && (
                  <InlineError
                    message={errorMessage.OptionError}
                    fieldID="optionNameErrorField"
                  />
                )}
              </Card>
            </Layout.Section>
          </Layout>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
