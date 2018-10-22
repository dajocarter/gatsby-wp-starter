import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const CategoriesPage = () => (
  <StaticQuery
    query={graphql`
      {
        categories: allWordpressCategory(filter: { count: { gt: 0 } }) {
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
    `}
    render={data => (
      <Layout>
        {data.categories && (
          <PostList title="All Categories" posts={data.categories.edges} />
        )}
      </Layout>
    )}
  />
)

export default CategoriesPage
