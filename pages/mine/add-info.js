import {setInfoData, getCommunityList} from "../../utils/apis";
const app = getApp()
Page({
    data: {
        array: ['皇庭世纪小区'],
        index: 0,
        phone: '',
        name: '',
        address:"",
        community_id: 0
    },
    onLoad: function (options) {
        var user = app.globalData.userInfo;
        var _this = this;
        getCommunityList({
            success(res) {
                console.log(res);
                _this.data.communityList = res;
                _this.data.community_id = app.globalData.user_comm_id;
                console.log(_this.data.community_id);
                for (var i = 0; i < res.length; i++) {
                    if (res[i].community_id == _this.data.community_id) {
                        _this.data.index = i;
                        break;     
                    }
                }
                console.log(_this.data.index);
                _this.setData({
                    communityList: _this.data.communityList,
                    index: _this.data.index
                })
            }
        });
        this.setData({
            phone: user.mobile_phone,
            address: user.address,
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
    
    onChanageCommunity(e) {
        this.setData({
            index: e.detail.value
        })
        this.data.community_id = this.data.communityList[e.detail.value].community_id;
        console.log(this.data.community_id);
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
                community_id: this.data.community_id,
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
