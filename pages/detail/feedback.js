
// const app = getApp()
import {getInfoDataList, setInfoData} from '../../utils/apis'
const app = getApp()
Page({
    data: {
        context: "",
    },
    onReady: function () {

    },

    onLoad: function () {
                
    },

    onInputContext(e) {
        this.data.context = e.detail.value;
    },

    saveContext() {
        console.log(app.globalData.userInfo);
        var _this = this;
        if (this.data.context == "") {
            return;
        }
        wx.showLoading();
        setTimeout(function(){
            wx.hideLoading()
          },1500)
        setInfoData({
            url: 'sendFeedback',
            data: {
                user_id: app.globalData.userInfo.community_user_id,
                context: _this.data.context
            }, 
            success(res) {
                wx.navigateBack({
                    delta: 1
                });
            }            
        })
    }
})
