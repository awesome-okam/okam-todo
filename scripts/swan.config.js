/**
 * @file Build swan smart program build config
 * @author xiaohong8023@outlook.com
 */

'use strict';

const merge = require('okam-build').merge;

module.exports = merge({}, require('./base.config'), {
    polyfill: ['async'],
    // wx2swan: true,
    rules: []
});
