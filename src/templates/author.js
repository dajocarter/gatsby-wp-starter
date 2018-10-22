import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const AuthorTemplate = ({ data }) => (
  <Layout>
    <h1>Author: {data.user.name}</h1>
    {data.posts && <PostList posts={data.posts} />}
  </Layout>
)

export const query = graphql`
  query AuthorQuery($id: String!) {
    user: wordpressWpUsers(id: { eq: $id }) {
      name
      posts: authored_wordpress__POST {
        wordpress_id
        title
        slug
        date(formatString: "MMMM D, YYYY")
        content
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
`

export default AuthorTemplate
