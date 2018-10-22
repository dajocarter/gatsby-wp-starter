import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Logo = styled.h1`
  margin: 0;

  a {
    color: white;
    text-decoration: none;
  }
`

const Header = ({ siteTitle }) => (
  <Container>
    <Wrapper>
      <Logo>
        <Link to="/">{siteTitle}</Link>
      </Logo>
    </Wrapper>
  </Container>
)

export default Header
