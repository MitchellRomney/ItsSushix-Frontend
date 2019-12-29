const path = require('path')
const webpack = require('webpack')
module.exports = {
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