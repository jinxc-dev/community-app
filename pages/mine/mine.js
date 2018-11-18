// pages/mine/mine.js
import { getUserInfo, makePhoneCall } from '../../utils/util'
import { logout } from '../../utils/apis'

const app = getApp()
Page({
	data:{
		userInfo:{}
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
	}
})