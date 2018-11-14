// pages/search/search.js
import {getInfoDataByID} from "../../../utils/apis"
import dateFormat from '../../../utils/dateformat.js'
const app = getApp()
Page({
    data: {
        info: null
    },
    onLoad: function (options) {
        
        this.setData({
            info:this.data.info
        });
        this.loadData(options.id);
    },
    loadData(id){
        var _this = this;
        getInfoDataByID({
            id: id,
            url: 'getWechatGroup',
            success(res) {
                // console.log(res);
                console.log(res.tag);
                _this.setData({
                    info: {
                        image: app.globalData.uploadPath + res.image,
                        title: res.wechat_group_name,
                        tags: res.tag,
                        date: dateFormat(new Date(res.created_on), "mm-dd HH:MM"),
                        description: res.description,
                        owner_barcode: app.globalData.uploadPath + res.wechat_group_owner_barcode,
                        barcode: app.globalData.uploadPath + res.wechat_group_barcode
                    }
                })

            }
        })
    },
    chooseOwnerBarcode() {
        var img = this.data.info.owner_barcode;
        wx.previewImage({
            current: img,
            urls: [img]
        })
    },
    chooseBarcode() {
        var img = this.data.info.barcode;
        wx.previewImage({
            current: img,
            urls: [img]
        })
    }
});