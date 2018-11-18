// pages/search/search.js
import {getInfoDataByID} from "../../../utils/apis"
import dateFormat from '../../../utils/dateformat.js'
const uploadPath = getApp().globalData.uploadPath
Page({
    data: {
    },
    onLoad: function (options) {
        this.loadData(options.id);
    },
    loadData(id){
        var _this = this;
        getInfoDataByID({
            id: id,
            url: 'getOwnerByID',
            success(res) {
                console.log(res);
                _this.setData({
                    avatar: uploadPath + res.owner_avatar,
                    date: dateFormat(new Date(res.created_date), "mm-dd HH:MM"),
                    name: res.username,
                    phone: res.phone,
                    barcode: uploadPath + res.owner_barcode,
                    owner_name: res.community_owner_name,
                    wechat_id: res.community_owner_wechatid
                });
            }
        })
    },
    chooseBarcode(e) {
        var img = this.data.barcode;
        wx.previewImage({
            current:img,
            urls: [img]
        })
    },

    onPhoneTap: function (event) {
        console.log(event);
        var phone = event.currentTarget.dataset.phone;
        console.log(phone);
        if (phone == "" || phone == null) {
            phone = "123456789";
        }
        wx.makePhoneCall({
            phoneNumber: phone
        });
    },


    copyTBL:function(e){
        var self=this;
        console.log(self.data.wechat_id);
        wx.setClipboardData({
            data: self.data.wechat_id,
            success: function(res) {
            }
        });
    }

});