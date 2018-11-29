/**
 * @file 小程序入口
 * @author xxx
 */

'use strict';

import store from './store/index';

export default {
    config: {
        pages: [
            'pages/todo/list',
            'pages/todo/add'
        ],

        window: {
            navigationBarBackgroundColor: '#211E2E',
            navigationBarTextStyle: 'white',
            backgroundTextStyle: 'light',
            enablePullDownRefresh: true,
            backgroundColor: '#ccc'
        },

        networkTimeout: {
            request: 30000
        }
    },
    $store: store,
    $promisifyApis: [
        'getSystemInfo'
    ],

    async onLaunch() {
        let result = await this.$api.getSystemInfo();
        console.log('launch system info', result);
        console.log('show onLaunch...');
    },

    onShow() {
        this.$api.getSystemInfo().then(function (res) {
            console.log('systemInfo', res);
        });
        console.log('show app...');
    },


    onHide() {
        console.log('hide app...');
    }
};


