import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

const CategoriesPage = ({ pageContext, data }) => {
  return (
    <Layout>
      {data.categories ? (
        <>
          <PostList title="All Categories" posts={data.categories.edges} />
          <Pagination pageContext={pageContext} />
        </>
      ) : (
        <h2>No posts have been categorized</h2>
      )}
    </Layout>
  )
}

export const CategoryListQuery = graphql`
  query CategoryListQuery($skip: Int!, $limit: Int!) {
    categories: allWordpressCategory(
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

export default CategoriesPage
