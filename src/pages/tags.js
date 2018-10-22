import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const TagsPage = () => (
  <StaticQuery
    query={graphql`
      {
        tags: allWordpressTag(filter: { count: { gt: 0 } }) {
          edges {
            node {
              wordpress_id
              name
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        {data.tags && <PostList title="All Tags" posts={data.tags.edges} />}
      </Layout>
    )}
  />
)

export default TagsPage
