import React from 'react'

import Post from './Post'

const PostList = ({ title, posts }) => {
  return (
    <>
      {title && <h2>{title}</h2>}
      {posts &&
        posts.map(({ node }) => <Post key={node.wordpress_id} post={node} />)}
    </>
  )
}

export default PostList
