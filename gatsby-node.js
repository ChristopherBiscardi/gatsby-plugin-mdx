exports.modifyWebpackConfig = ({ config, stage }) => {
  const mdFiles = /\.md$/;
  config.loader(`mdx`, {
    test: mdFiles,
    loaders: ['babel-loader?' + 'babelrc=false,' + 'presets[]=env,' + 'presets[]=react', '@mdx-js/loader']
  });
};
