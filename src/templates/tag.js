import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostList from '../components/PostList'

const TagTemplate = ({ data }) => (
  <Layout>
    <h1>{data.tag.name}</h1>
    <p>There are {data.tag.count} posts with this tag.</p>
    <p>{data.tag.description}</p>
    {data.posts && <PostList posts={data.posts.edges} />}
  </Layout>
)

export const query = graphql`
  query TagQuery($id: String!) {
    tag: wordpressTag(id: { eq: $id }) {
      name
      count
      description
    }
    posts: allWordpressPost(
      filter: { tags: { elemMatch: { id: { eq: $id } } } }
    ) {
      edges {
        node {
          id
          title
          slug
          excerpt
        }
      }
    }
  }
`

export default TagTemplate