const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath:'/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin()

    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader"]
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            
        ]
    },
    
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    }
};
