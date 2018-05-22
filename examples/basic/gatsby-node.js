/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allFile(filter: { extension: { eq: "md" } }) {
          edges {
            node {
              absolutePath
              relativeDirectory
              name
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          return reject(result.errors)
        }

        // Create markdown pages.
        result.data.allFile.edges.forEach(
          ({ node: { absolutePath, relativeDirectory, name } }) => {
            createPage({
              path: `${relativeDirectory}/${name}`,
              component: absolutePath,
            })
          }
        )
      })
      .then(resolve)
  })
}
