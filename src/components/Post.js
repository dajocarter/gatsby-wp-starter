import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import EntryContent from './styled/EntryContent'

const Article = styled.article``
const EntryHeader = styled.header``
const EntryTitle = styled.h3``
const EntryMeta = styled.div``
const PostedOn = styled.span``
const ByLine = styled.span``
const Author = styled.span``
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
                by <Author>{post.author.name}</Author>
              </ByLine>
            )}
          </EntryMeta>
        )}
      </EntryHeader>
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
                  <Link to={`/${tag.slug}/`}>{tag.name}</Link>
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
