import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const CategoryTemplate = ({ data }) => (
  <Layout>
    <h1>Category: {data.category.name}</h1>
    <p>There are {data.category.count} posts with this category.</p>
    <p>{data.category.description}</p>
    {data.posts && <PostList posts={data.posts.edges} />}
  </Layout>
)

export const query = graphql`
  query CategoryQuery($id: String!) {
    category: wordpressCategory(id: { eq: $id }) {
      name
      count
      description
    }
    posts: allWordpressPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
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
            fields {
              path
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplate
