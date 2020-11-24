import { Heading, Page, Layout, EmptyState, Card,TextField,Button } from "@shopify/polaris";
import React,{ useState,useCallback,useReducer } from "react";
import { act } from "react-test-renderer";
import OptionMaker from '../components/OptionMaker.js';


const optionsReducer=(state,action)=>{
  switch(action.type){
    case 'add':
      return [...state,action.option];
    case 'remove':
      const productIndex = state.findIndex(item => item.key == action.key);
      if(productIndex < 0) {
        return state;
      }
      const update = [...state];
      update.splice(productIndex, 1)
      return update
    default:
      return state;
  }
}

export default function Template({ shopOrigin }) {
  const [templateNameValue, setTemplateNameValue] = useState('');
  const [optionNameValue,setOptionNameValue] = useState('');

  const [theOptions,setTheOptions] = useReducer(optionsReducer,[]);

  const handleTemplateNameChange = useCallback((value) => setTemplateNameValue(value),[]);
  const handleOptionNameChange = useCallback((value)=> setOptionNameValue(value),[]);


  const add =()=>{
    let option = {'key':optionNameValue,obj: <OptionMaker 
      key={optionNameValue} 
      id={optionNameValue} 
      name={optionNameValue} 
      remove={remove}
    />}
    setTheOptions({option,type:'add'});
    setOptionNameValue("");

  }

  const remove =(key)=>{
    setTheOptions({'key':key,type:'remove'});
  }

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Layout>
            <Layout.Section secondary>
              <Card title="Options" sectioned>
                <TextField
                  label="Template Name"
                  value={templateNameValue}
                  onChange={handleTemplateNameChange}
                  placeholder="Example: ClothesTemplate "
                />
                <br/>
                <hr/>
                <TextField
                  label="New Option Name"
                  value={optionNameValue}
                  onChange={handleOptionNameChange}
                  placeholder="Example: Option size "
                />
                <br/>
                <Button onClick={add} >Add Option Field</Button>

              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card title="Template Layout" sectioned>
                {theOptions.length == 0 ?  <h1>No Options Added</h1> : theOptions.map(option=> option.obj)}
              </Card>
            </Layout.Section>
          </Layout>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

