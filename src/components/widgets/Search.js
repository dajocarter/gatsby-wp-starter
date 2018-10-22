import React, { Component } from 'react'
import styled from 'styled-components'

import ScreenReaderText from '../styled/ScreenReaderText'

const SearchWidget = styled.section``
const SearchForm = styled.form``
const SearchField = styled.input``
const SearchSubmit = styled.input``

export default class Search extends Component {
  render() {
    return (
      <SearchWidget>
        <SearchForm role="search">
          <label>
            <ScreenReaderText>Search for:</ScreenReaderText>
            <SearchField
              type="search"
              placeholder="Search ..."
              value=""
              name="search"
            />
          </label>
          <SearchSubmit type="submit" value="Search" />
        </SearchForm>
      </SearchWidget>
    )
  }
}
