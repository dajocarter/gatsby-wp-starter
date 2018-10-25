import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

const TagsPage = ({ pageContext, data }) => {
  return (
    <Layout>
      {data.tags ? (
        <>
          <PostList title="All Tags" posts={data.tags.edges} />
          <Pagination pageContext={pageContext} />
        </>
      ) : (
        <h2>No posts have been tagged</h2>
      )}
    </Layout>
  )
}

export const TagListQuery = graphql`
  query TagListQuery($skip: Int!, $limit: Int!) {
    tags: allWordpressTag(
      filter: { count: { gt: 0 } }
      sort: { fields: count, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          wordpress_id
          name
          fields {
            path
          }
        }
      }
    }
  }
`

export default TagsPage
