import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

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

const Paginate = ({ pageContext, pathPrefix }) => {
  const { currentPage, numPages } = pageContext
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numPages
  const prevPage =
    currentPage === 2 ? `/${pathPrefix}/` : `/${pathPrefix}/${currentPage - 1}/`
  const nextPage = `/${pathPrefix}/${currentPage + 1}`
  const endSize = 1
  const midSize = 1
  let dots = false

  return (
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
                <Link
                  to={i === 0 ? `/${pathPrefix}/` : `/${pathPrefix}/${index}/`}
                >
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
  )
}

export default Paginate
