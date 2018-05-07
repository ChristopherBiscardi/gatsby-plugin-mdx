'use strict';

// const webpack = require(`webpack`)

// Add Glamor support
exports.modifyWebpackConfig = function (_ref) {
  var config = _ref.config,
      stage = _ref.stage;

  var mdFiles = /\.md$/;
  config.loader('mdx', {
    test: mdFiles,
    loaders: ['babel-loader?' + 'babelrc=false,' + 'presets[]=env,' + 'presets[]=react', '@mdx-js/loader']
  });
};

// Add Glamor support
// exports.modifyBabelrc = ({ babelrc }) => {
//   return Object.assign(babelrc, {
//     plugins: babelrc.plugins.concat(['@mdx-js/loader']),
//   })
// }