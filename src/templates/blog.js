import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import PostList from '../components/PostList'
import ScreenReaderText from '../components/styled/ScreenReaderText'

const Pagination = styled.nav``

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavItem = styled.li``

const BlogPage = ({ pageContext, data }) => {
  const { currentPage, numPages } = pageContext
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numPages
  const prevPage = currentPage === 2 ? `/blog/` : `/blog/${currentPage - 1}/`
  const nextPage = `/blog/${currentPage + 1}`
  const endSize = 1
  const midSize = 1
  let dots = false
  return (
    <Layout>
      {data.posts && <PostList title="All Posts" posts={data.posts.edges} />}
      <Pagination role="navigation">
        <ScreenReaderText as="h2">Posts Navigation</ScreenReaderText>
        <NavLinks>
          {!isFirstPage && (
            <NavItem>
              <Link to={prevPage} rel="prev">
                Previous
              </Link>
            </NavItem>
          )}
          {Array.from({ length: numPages }, (_, i) => {
            const index = i + 1
            const printLink =
              index <= endSize ||
              (index >= currentPage - midSize &&
                index <= currentPage + midSize) ||
              index > numPages - endSize

            if (index === currentPage) {
              dots = true
              return (
                <NavItem key={`page-${index}`}>
                  <span aria-current="page" className="current">
                    {index}
                  </span>
                </NavItem>
              )
            } else if (printLink) {
              dots = true
              return (
                <NavItem key={`page-${index}`}>
                  <Link to={i === 0 ? `/blog/` : `/blog/${index}/`}>
                    {index}
                  </Link>
                </NavItem>
              )
            } else if (dots) {
              dots = false
              return (
                <NavItem key={`page-${index}`}>
                  <span className="dots">&hellip;</span>
                </NavItem>
              )
            }
            return null
          })}
          {!isLastPage && (
            <NavItem>
              <Link to={nextPage} rel="next">
                Next
              </Link>
            </NavItem>
          )}
        </NavLinks>
      </Pagination>
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
