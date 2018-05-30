# gatsby-plugin-mdx

## Installation

### Dependencies

```
yarn add gatsby-plugin-mdx
```

then

```
yarn add @mdx-js/mdx @mdx-js/loader loader-utils --dev
```

### Configuration

Add in the config for mdx and source in the `pages/` directory.

`gatsby-config.js`

```js
module.exports = {
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`
      }
    }
  ]
};
```

Query all markdown files and create pages for each of them.

`gatsby-node.js`

```js
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

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
          return reject(result.errors);
        }

        // Create markdown pages.
        result.data.allFile.edges.forEach(
          ({ node: { absolutePath, relativeDirectory, name } }) => {
            createPage({
              path: `/${relativeDirectory}/${name}`,
              component: absolutePath
            });
          }
        );
      })
      .then(resolve);
  });
};
```

## Usage

Check mdx document for syntax and examples: https://github.com/mdx-js/mdx#mdx-syntax

TL;DR:

`src/pages/my-markdown-page.md`

```md
import MyComponent from '../components/MyComponent'

# Title

_some content_

<MyComponent />
```

## Example

Check `examples` folder for working examples

[Basic](https://github.com/nhducit/gatsby-plugin-mdx/blob/master/examples/basic/README.md):
