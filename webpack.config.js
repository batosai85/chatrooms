const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    context: path.join(__dirname, "src"),
    entry: {
        app: "./bundle.js",
        vendor: ["jquery", "bootstrap"]
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "./js/bundle.js"
    },
    watch: true,
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader : "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use : [{  
                        loader : "css-loader",
                        options : {url : false, minimize: true}
                    },
                           "autoprefixer"],
                    fallback: "style-loader"
                }),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use : [{  
                        loader : "css-loader",
                        options : {url:false, minimize: true}
                    },
                           "less-loader"],
                    fallback: "style-loader"
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "file-loader",
                options: {
                    name: './images/[name].[ext]'
                },
                exclude: /node_modules/
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: './fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            toastr : "toastr"
        }),
        new ExtractTextPlugin("./css/styles.css"),
        new UglifyJSPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "./js/vendor.bundle.js"})
    
    ],
    resolve: {
        extensions: [" ", ".js", ".es6", ".css", ".less"]
    }
};
