const dotenv = require('dotenv').config()
const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
