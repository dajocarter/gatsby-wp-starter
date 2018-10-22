import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

const RecentPostsWidget = styled.section``
const WidgetTitle = styled.h2``
const List = styled.ul``
const ListItem = styled.li``

const RecentPosts = () => (
  <StaticQuery
    query={graphql`
      query {
        posts: allWordpressPost(sort: { fields: date, order: DESC }, limit: 5) {
          edges {
            node {
              wordpress_id
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <RecentPostsWidget>
        <WidgetTitle>Recent Posts</WidgetTitle>
        {data.posts &&
          data.posts.edges && (
            <List>
              {data.posts.edges.map(({ node }) => (
                <ListItem key={node.wordpress_id}>
                  <Link to={`/${node.slug}/`}>{node.title}</Link>
                </ListItem>
              ))}
            </List>
          )}
      </RecentPostsWidget>
    )}
  />
)

export default RecentPosts
