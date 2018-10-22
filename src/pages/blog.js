import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const BlogPage = () => (
  <StaticQuery
    query={graphql`
      {
        posts: allWordpressPost(
          filter: { status: { eq: "publish" }, format: { eq: "standard" } }
          sort: { fields: date, order: DESC }
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
    `}
    render={data => (
      <Layout>
        {data.posts && <PostList title="All Posts" posts={data.posts.edges} />}
      </Layout>
    )}
  />
)

export default BlogPage
