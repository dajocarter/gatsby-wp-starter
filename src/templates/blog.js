import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

const BlogPage = ({ pageContext, data }) => {
  return (
    <Layout>
      {data.posts && <PostList title="All Posts" posts={data.posts.edges} />}
      <Pagination pageContext={pageContext} pathPrefix="blog" />
    </Layout>
  )
}

export const BlogListQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    posts: allWordpressPost(
      filter: { status: { eq: "publish" }, format: { eq: "standard" } }
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          wordpress_id
          title
          slug
          date(formatString: "MMMM D, YYYY")
          excerpt
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
            slug
          }
        }
      }
    }
  }
`

export default BlogPage
