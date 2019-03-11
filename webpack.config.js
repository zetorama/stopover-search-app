const dotenv = require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

if (dotenv.error) {
  // fallback to defaults, expecting all the neccessary vars are just set in ENV
  const fallback = require('dotenv').config({ path: path.resolve(process.cwd(), '.env.defaults') })
  if (!fallback.error) dotenv.parsed = fallback.parsed
}

const { PORT = 8000 } = process.env

module.exports = {
    devtool: 'source-map',
    devServer: {
      proxy: {
        '/api': `http://localhost:${PORT}`,
      },
    },
    entry: './src/client-web/index.js',
    output: {
        path: path.join(__dirname, '/build/public'),
        filename: 'index.bundle.js',
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: ['css-loader']
                }
            )
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader'
                }
            ]
        },
      ],
    },
    plugins: [
        new webpack.DefinePlugin(
            Object.keys(dotenv.parsed).reduce(
                (env, key) => Object.assign(
                    env,
                    { [`process.env.${key}`]: JSON.stringify(dotenv.parsed[key]) },
                ),
                {},
            )
        ),
        new HtmlWebPackPlugin({
            hash: true,
            filename: 'index.html',  //target html
            template: './src/client-web/index.html', //source html
        }),
        new ExtractTextPlugin({ filename: 'css/style.css' }),
    ]
}
