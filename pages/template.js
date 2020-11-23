import { Heading, Page, Layout, EmptyState, Card,TextField,Button } from "@shopify/polaris";
import { useState,useCallback } from "react";
import {OptionMaker} from '../components/OptionMaker.js';

function Template({ shopOrigin }) {
  const [templateNameValue, setTemplateNameValue] = useState("");
  const options = [<OptionMaker />]
  const handleTextFieldChange = useCallback((value) => setTemplateNameValue(value),[]);

  const createTextField = ()=>{
    //options.push(<OptionMaker/>);
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
                  onChange={handleTextFieldChange}
                  placeholder="Example: ClothesTemplate "
                />
                <br/>
                <Button on >Add Option Field</Button>

              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card title="Order details" sectioned>
                {options}
              </Card>
            </Layout.Section>
          </Layout>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default Template;
