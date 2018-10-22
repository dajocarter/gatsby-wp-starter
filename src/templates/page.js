import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const PageTemplate = ({ data }) => (
  <Layout>
    <h1>{data.page.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: data.page.content }} />
  </Layout>
)

export const query = graphql`
  query PageQuery($id: String!) {
    page: wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`

export default PageTemplate
