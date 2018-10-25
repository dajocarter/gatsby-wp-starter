import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Post from '../components/Post'

const SiteContent = styled.div``
const ContentArea = styled.div``
const SiteMain = styled.main``
const PostNavigation = styled.nav``
const WidgetArea = styled.aside``

const PostTemplate = ({ data }) => (
  <Layout>
    <SiteContent>
      <ContentArea>
        <SiteMain>
          <Post post={data.post} />
          <PostNavigation role="navigation" />
        </SiteMain>
      </ContentArea>
      <WidgetArea />
    </SiteContent>
  </Layout>
)

export const query = graphql`
  query PostQuery($id: String!) {
    post: wordpressPost(id: { eq: $id }) {
      wordpress_id
      title
      slug
      date(formatString: "MMMM D, YYYY")
      content
      author {
        name
        slug
      }
      categories {
        wordpress_id
        name
        fields {
          path
        }
      }
      tags {
        wordpress_id
        name
        fields {
          path
        }
      }
    }
  }
`

export default PostTemplate
