//index.js
//获取应用实例
import {getSellers} from '../../utils/apis'
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        banner:[
            {
                image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
            },
            {
                image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'    
            },
            {
                image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'    
            },
            {
                image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'    
            }
        ],
        weixinGroup: [
            {
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1",
                subTitle: "SUB-Description",
                tags: ["tag1", "tag2"]
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM2dfsafasfdasfasfdasfdasfd",
                subTitle: "SUB-Description",
                tags: ["tag1", "tag2"]
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1",
                subTitle: "SUB-Description",
                tags: ["tag1", "tag2"]
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM2dfsafasfdasfasfdasfdasfd",
                subTitle: "SUB-Description",
                tags: ["tag1", "tag2"]
            },
        ],
        ownerList: [
            {
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1",
                subTitle: "SUB-Description"
            }
        ],
        appList: [
            {
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1"
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM2dfsafasfdasfasfdasfdasfd"
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1"
            }
        ],
        servicesList: [
            {
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1"
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM2dfsafasfdasfasfdasfdasfd"
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1"
            }, {
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1"
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM2dfsafasfdasfasfdasfdasfd"
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1"
            }, {
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM1"
            },{
                avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                title: "ITEM2dfsafasfdasfasfdasfdasfd"
            }
        ],
        bannerList: [
            {
                image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                description: "ITEM1",
                date: "2018-10-17 18:26"
            },{
                image: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                description: "ITEM1",
                date: "2018-10-17 18:26"
            },{
                image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                description: "ITEM1",
                date: "2018-10-17 18:26"
            }
        ],
        communityItems : [
            {
                name: '社区基础信息'
            },{
                name: 'Item2'
            },{
                name: 'Item3'
            },{
                name: 'Item4'
            }
        ]
    },
    onReady: function () {
        console.log('ready');
    },

    onLoad: function () {
        console.log('load');
    },


    loadData() {
        
    },


})
