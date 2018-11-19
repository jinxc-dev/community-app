// pages/mine/mine.js
// import { getInfoDataList, makePhoneCall } from '../../utils/util'
import { getInfoDataList } from '../../utils/apis'

const app = getApp()
Page({
	data:{
		userInfo:{},
		ownerInfo: {},
	},
	onLoad:function(options){
		var that = this

		if (app.globalData.userInfo) {
			console.log(app.globalData.userInfo);
            this.setData({
                userInfo: app.globalData.userInfo,
                loginInfo: true
            })
        } else {
			app.getUserInfo();
			this.setData({
				userInfo: app.globalData.userInfo,
				loginInfo: true
			});
		}

		getInfoDataList({
            url:'getOwners',
            success(res) {
                if (res.length > 0) {
                    that.data.ownerInfo = res[0];
                }
            }
        })
		

	},
	onReady:function(){

	},
	onShow:function(){
		// 页面显示
		var that = this
	},


	callback(loginInfo) {
		this.setData({
			loginInfo: loginInfo.user_info
		})
	},
	showAlert() {
		console.log(this.data.ownerInfo);
		var wechat_id = this.data.ownerInfo.community_owner_wechatid;
		wx.showModal({
            title: '联系管家',
            content: '点击复制微信号 ' + wechat_id + ' 添加管家，使用时遇到问题都可以马上咨询管家',
            confirmText: "确定",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    wx.setClipboardData({
						data: wechat_id
					});
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });
	}
})