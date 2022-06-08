module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  mode: 'production',
  devtool: 'source-map',
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
}
