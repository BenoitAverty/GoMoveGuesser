function getEntrySources(sources) {
  if(process.env.NODE_ENV !== 'prod') {
    sources.push('webpack-dev-server/client?http://localhost:3000');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  entry: getEntrySources(['./app/index.js']),
  output: {
    filename: 'app/gomoveguesser.dist.js',
    sourcemapFilename: 'app/gomoveguesser.dist.js.map'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devServer: {
    proxy: {
      '/api/*': 'http://localhost:8080/'
    }
  },
  devtool: 'source-map'
}
