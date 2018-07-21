export function resolvableExtensions() {
  return [`.md`]
}

export function onCreateWebpackConfig = ({ actions }) => {
  const mdFiles = /\.mdx?$/
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: mdFiles,
          use: [
            'babel-loader?' + 'babelrc=false,' + 'presets[]=env,' + 'presets[]=react',
            '@mdx-js/loader',
          ],
        },
      ],
    },
  })
}
