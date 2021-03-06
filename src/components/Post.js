import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import EntryContent from './styled/EntryContent'

const Article = styled.article``
const EntryHeader = styled.header``
const EntryTitle = styled.h3``
const EntryMeta = styled.div``
const PostedOn = styled.span``
const ByLine = styled.span``
const Author = styled.span``
const PostThumbnail = styled.div``
const EntryFooter = styled.footer``
const CatLinks = styled.span``
const TagLinks = styled.span``

const Post = ({ post }) => {
  return (
    <Article>
      <EntryHeader>
        <EntryTitle>
          <Link to={post.fields ? post.fields.path : post.slug} rel="bookmark">
            {post.title ? post.title : post.name}
          </Link>
        </EntryTitle>
        {post.date && (
          <EntryMeta>
            <PostedOn>
              Posted on{' '}
              <Link
                to={post.fields ? post.fields.path : post.slug}
                rel="bookmark"
              >
                {post.date}
              </Link>
            </PostedOn>
            {post.author && (
              <ByLine>
                {' '}
                by{' '}
                <Author>
                  <Link to={`/author/${post.author.slug}`}>
                    {post.author.name}
                  </Link>
                </Author>
              </ByLine>
            )}
          </EntryMeta>
        )}
      </EntryHeader>
      {post.featured_media && (
        <PostThumbnail>
          <Img
            fluid={post.featured_media.localFile.childImageSharp.fluid}
            alt={post.featured_media.alt_text}
          />
        </PostThumbnail>
      )}
      {post.excerpt && (
        <EntryContent dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      )}
      {post.content && (
        <EntryContent dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
      {(post.categories || post.tags) && (
        <EntryFooter>
          {post.categories && (
            <CatLinks>
              Posted in{' '}
              {post.categories.map((cat, i) => (
                <React.Fragment key={cat.wordpress_id}>
                  {!!i && ', '}
                  <Link to={cat.fields.path}>{cat.name}</Link>
                </React.Fragment>
              ))}
            </CatLinks>
          )}
          {post.tags && (
            <TagLinks>
              Tagged{' '}
              {post.tags.map((tag, i) => (
                <React.Fragment key={tag.wordpress_id}>
                  {!!i && ', '}
                  <Link to={tag.fields.path}>{tag.name}</Link>
                </React.Fragment>
              ))}
            </TagLinks>
          )}
        </EntryFooter>
      )}
    </Article>
  )
}

export default Post
