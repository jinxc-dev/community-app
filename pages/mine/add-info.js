import {setInfoData} from "../../utils/apis";
const app = getApp()
Page({
    data: {
        array: ['皇庭世纪小区'],
        index: 0,
        phone: '',
        name: '',
        address:""
    },
    onLoad: function (options) {
        var user = app.globalData.userInfo;
        console.log(user);
        this.setData({
            phone: user.mobile_phone,
            address: user.address,
            index: 0,
            name: user.receiver_name
        })

    },

    bindPickerChange: function (e) {
        this.data.index = e.detail.value;
        this.setData({
          index: e.detail.value
        })
    },

    onInputName(e) {
        console.log(e);
        this.data.name = e.detail.value;
    },

    onInputPhone(e) {
        this.data.phone = e.detail.value;
    },
    onInputAddress(e) {
        this.data.address = e.detail.value;
    },

    saveUserInfo() {
        console.log('xxxx');
        console.log(this.data);
        setInfoData({
            url: 'updateUserInfo',
            data: {
                open_id: wx.getStorageSync('openid'),
                name: this.data.name,
                phone: this.data.phone,
                community_id: this.data.index,
                address: this.data.address
            },
            success: function(res) {
                console.log(res);
                app.getUserInfo();
                wx.navigateBack({
                    delta: 1
                })
            }
        })

    }
})
