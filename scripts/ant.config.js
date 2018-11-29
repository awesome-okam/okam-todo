/**
 * @file Build ant mini program build config
 * @author xiaohong8023@outlook.com
 */

'use strict';

const merge = require('okam-build').merge;

module.exports = merge({}, require('./base.config'), {
    output: {
        dir: 'ant_dist',
        depDir: 'src/common'
    },
    localPolyfill: [
        'async',
        'promise'
    ],
    processors: {
        babel7: {
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
});
