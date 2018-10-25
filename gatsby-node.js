const path = require('path')

/**
 * Create nested paths
 * e.g., /grandparent/parent/node-slug
 * and add to node
 */
exports.sourceNodes = ({ getNodes, actions }) => {
  const { createNodeField } = actions

  // Grag all nodes with hierarchy (pages, categories)
  const allNodes = getNodes()
  const pageNodes = allNodes.filter(
    node => node.internal.type === 'wordpress__PAGE'
  )
  const categoryNodes = allNodes.filter(
    node => node.internal.type === 'wordpress__CATEGORY'
  )

  // Build each node's path
  pageNodes.forEach(node => {
    // Save the original node for use down below
    const original = node
    // Start with the node's slug
    let path = `/${node.slug}/`
    // Recursively check for a parent and prepend parent's slug to path
    while (node.wordpress_parent) {
      node = pageNodes.find(
        parentNode => node.wordpress_parent === parentNode.wordpress_id
      )
      path = `/${node.slug}${path}`
    }
    // Add full path to node -- available at node.fields.path
    createNodeField({
      node: original,
      name: `path`,
      value: path,
    })
  })
  categoryNodes.forEach(node => {
    // Save the original node for use down below
    const original = node
    // Start with the node's slug
    let path = `${node.slug}/`
    // Recursively check for a parent and prepend parent's slug to path
    while (node.wordpress_parent) {
      node = categoryNodes.find(
        parentNode => node.wordpress_parent === parentNode.wordpress_id
      )
      path = `${node.slug}/${path}`
    }
    path = `/category/${path}`
    // Add full path to node -- available at node.fields.path
    createNodeField({ node: original, name: `path`, value: path })
  })
}

/**
 * Create pages from queries
 */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    // Gather templates
    const pageTemplate = path.resolve('./src/templates/page.js')
    const postTemplate = path.resolve('./src/templates/post.js')
    const blogTemplate = path.resolve('./src/templates/blog.js')
    const categoryTemplate = path.resolve('./src/templates/category.js')
    const tagTemplate = path.resolve('./src/templates/tag.js')
    const authorTemplate = path.resolve('./src/templates/author.js')
    // Query for all wordpress pages and posts then create pages for them
    resolve(
      graphql(`
        {
          pages: allWordpressPage(filter: { status: { eq: "publish" } }) {
            edges {
              node {
                id
                fields {
                  path
                }
              }
            }
          }
          posts: allWordpressPost(
            filter: { status: { eq: "publish" }, format: { eq: "standard" } }
          ) {
            edges {
              node {
                id
                slug
              }
            }
          }
          categories: allWordpressCategory {
            edges {
              node {
                id
                fields {
                  path
                }
              }
            }
          }
          tags: allWordpressTag {
            edges {
              node {
                id
                slug
              }
            }
          }
          users: allWordpressWpUsers {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.pages.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.path,
            component: pageTemplate,
            context: {
              id: node.id,
            },
          })
        })

        const posts = result.data.posts.edges
        const postsPerPage = 2
        const numPages = Math.ceil(posts.length / postsPerPage)
        // Create single posts
        posts.forEach(({ node }) => {
          createPage({
            path: `/${node.slug}/`,
            component: postTemplate,
            context: {
              id: node.id,
            },
          })
        })
        // Create a paginated blog, e.g., /blog/, /blog/2
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
            component: blogTemplate,
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })

        result.data.categories.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.path,
            component: categoryTemplate,
            context: {
              id: node.id,
            },
          })
        })

        result.data.tags.edges.forEach(({ node }) => {
          createPage({
            path: `/tag/${node.slug}/`,
            component: tagTemplate,
            context: {
              id: node.id,
            },
          })
        })

        result.data.users.edges.forEach(({ node }) => {
          createPage({
            path: `/author/${node.slug}/`,
            component: authorTemplate,
            context: {
              id: node.id,
            },
          })
        })
      })
    )
  })
}
