import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import EntryContent from '../components/styled/EntryContent'

const Article = styled.article``
const EntryHeader = styled.header``
const EntryTitle = styled.h1``

const PageTemplate = ({ data }) => (
  <Layout>
    <Article>
      <EntryHeader>
        <EntryTitle>{data.page.title}</EntryTitle>
      </EntryHeader>
    </Article>
    <EntryContent dangerouslySetInnerHTML={{ __html: data.page.content }} />
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
