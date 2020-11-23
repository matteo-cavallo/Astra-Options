import { Heading, Page,Layout,EmptyState } from "@shopify/polaris";
import Link from 'next/link'

function Index({shopOrigin}){
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <EmptyState
            heading="Manage your Astra Options Templates"
            action={{content: 'Add New Template',url:'/template'}}
            secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg">
            <p>Track and receive your incoming inventory from suppliers.</p>
          </EmptyState>
        </Layout.Section>
      </Layout>
  </Page>
  );
};


export default Index;
