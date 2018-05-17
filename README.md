# gatsby-plugin-mdx

[MDX](https://github.com/mdx-js/mdx) is a markdown loader, parser, and renderer that allows you to use JSX inside of a markdown file. 

## Install

Install the GatsbyJS plugin:

```
yarn add gatsby-plugin-mdx
```

Install MDX:

```
yarn add @mdx-js/mdx @mdx-js/loader loader-utils --dev
```

## How to use

In your `gatsby-config.js`

```
module.exports = {
  plugins: ['gatsby-plugin-mdx'],
};
```

## Usage

Check mdx document for syntax and examples: https://github.com/mdx-js/mdx#mdx-syntax

## Creating MDX pages

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
        allFile(filter:{extension:{eq:"md"}}) {
          edges {
            node {
              absolutePath
              relativeDirectory
              name
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return reject(result.errors)
      }

      // Create markdown pages.
      result.data.allFile.edges.forEach(({ node: {
        absolutePath,
        relativeDirectory,
        name
       } }) => {
        createPage({
          path: `/${relativeDirectory}/${name}`,
          component: absolutePath
        })
      })
    })
    .then(resolve)
  })
}
```

Create your markdown pages 🎉 

`src/pages/my-markdown-page.md`

```jsx
import MyComponent from '../components/MyComponent'

# Title

_some content_

<MyComponent />
```

