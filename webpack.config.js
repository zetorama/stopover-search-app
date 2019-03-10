require('dotenv').config()
const path = require('path')
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
        path: path.join(__dirname, '/build/client-web'),
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
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                  ],
                  plugins: [
                    ['@babel/plugin-transform-runtime', { regenerator: true } ],
                  ],
                }
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
        new HtmlWebPackPlugin({
            hash: true,
            filename: 'index.html',  //target html
            template: './src/client-web/index.html', //source html
        }),
        new ExtractTextPlugin({ filename: 'css/style.css' }),
    ]
}
