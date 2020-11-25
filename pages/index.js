import {
  Tabs,
  Page,
  Layout,
  EmptyState,
  Card,
  ResourceList,
  ResourceItem,
  Avatar,
  TextStyle,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { getTemplatesByShop } from "../firebase/firebase.config";

function Index({ shopOrigin }) {
  const [selectedTab, setSelected] = useState(0);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    getTemplatesByShop(shopOrigin).then((d) => {
      setTemplates(d);
    });
  }, []);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-templates",
      content: "All",
      accessibilityLabel: "All templates",
      panelID: "all-templates-content",
    },
  ];

  return (
    <Page
      title="Templates"
      primaryAction={{ content: "Create template" }}
      separator
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <Card>
                <ResourceList
                  resourceName={{ singular: "template", plural: "templates" }}
                  items={templates}
                  renderItem={(item) => {
                    const { id, url, name, location, description } = item;

                    return (
                      <ResourceItem
                        id={id}
                        url={url}
                        accessibilityLabel={`View details for ${name}`}
                      >
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                        <div>{description}</div>
                      </ResourceItem>
                    );
                  }}
                />
              </Card>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default Index;
