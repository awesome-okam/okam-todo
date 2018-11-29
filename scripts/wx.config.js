/**
 * @file Build weixin mini program build config
 * @author xiaohong8023@outlook.com
 */

'use strict';

const merge = require('okam-build').merge;

module.exports = merge({}, require('./base.config'), {
    output: {
        dir: 'wx_dist',
        depDir: 'src/common'
    },

    localPolyfill: [
        'async',
        'promise'
    ],

    dev: {
        processors: {
            postcss: {
                options: {
                    plugins: {
                        'postcss-url': {
                            url: 'inline'
                        }
                    }
                }
            }
        }
    }
});
