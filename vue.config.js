const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/styles/base.scss";
                `,
            }
        }
    },
    devServer: {
        watchOptions: {
            poll: true
        }
    }
};