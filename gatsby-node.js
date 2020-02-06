const path = require(`path`)

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            rawMarkdownBody
            html
            frontmatter {
              slug
              title
            }
            internal {
              type
            }
            parent {
              id
              ... on File {
                id
                name
                relativePath
              }
            }
          }
        }
      }
    }
  `)
  console.log(JSON.stringify(result, null, 4))
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`./src/templates/post-template.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
