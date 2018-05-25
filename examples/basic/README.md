# Basic example

To create MDX pages add the `gatsby-source-filesystem` plugin pointed at the `pages/` directory.

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
  ],
}
```

Next, query all markdown files and, using the `createPage` method, create corresponding pages for each of them.

`gatsby-node.js`

```js
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
```

Create your markdown pages 🎉

`src/pages/my-markdown-page.md`

```jsx
import React from 'react'
import RadarChart from './RadarChart'
import PolarChart from './PolarChart'
export default class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <RadarChart />
        <PolarChart />
      </div>
    )
  }
}
```
