
import {getInfoDataByID} from '../../../utils/apis'
const app = getApp()
Page({
    data: {
        iconPath: app.globalData.uploadPath
    },
    onReady: function () {

    },

    onLoad: function (options) {
        this.id = options.id;
        this.loadData(this.id);
    },
    
    loadData(id) {
        var _this = this;
        getInfoDataByID({
            id: id,
            url: 'getMenuByID',
            success(res) {
                console.log(res);
                if (res.main_menu != undefined) {
                    _this.setData({
                        menuInfo : res.main_menu,
                        itemList : res.sub_menus
                    })
                }
            }
        })
    },
})
