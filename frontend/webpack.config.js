const path = require("path");

module.exports = {
  mode: 'none',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../backend/static'),
  },
  target: 'web',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            "noEmit": false,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
