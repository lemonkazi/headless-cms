const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(`
    query {
      WordPress {
        posts {
          nodes {
            title
            id
            slug
            uri
            elementorData
          }
        }
      }
    }
  `)

  result.data.WordPress.posts.nodes.forEach(edge => {
    createPage({
      path: `${edge.uri}`,
      component: blogPostTemplate,
      context: edge,
    })
  })
}
