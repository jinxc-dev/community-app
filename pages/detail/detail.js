
import {getInfoDataByID} from '../../utils/apis'
const imgPath = getApp().globalData.uploadPath;
Page({
    data: {
        itemList: [],
        menuInfo: {},
        headerInfo: {},
        imgPath: imgPath,
        isShowList: true
    },
    onReady: function () {

    },

    onLoad: function (options) {
        console.log(options);
        if (options.id == "") {
            return;
        }
        this.setData({
            header_icon: options.icon
        })
        this.loadData(options.id);
    },
    
    onPhoneTap: function (event) {
        var phone = event.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone
        });
    },
    loadData(id) {
        var _this = this;
        getInfoDataByID({
            id: id,
            url: 'getSubMenuByID',
            success(res) {
                console.log(res);
                _this.data.menuInfo = res.sub_menu;
                _this.data.itemList = res.items;
                _this.setData({
                    menuInfo: _this.data.menuInfo,
                    itemList: _this.data.itemList,
                    headerInfo: {
                        title: res.sub_menu.menu_name
                    }
                })

            }
        })
    },

    showDetailItem(event) {
        var idx = event.currentTarget.dataset.idx;
        this.data.isShowList = false;
        this.setData({
            isShowList: false,
            headerInfo: {
                title: this.data.itemList[idx].menu_item_name,
                sub_title: this.data.itemList[idx].menu_item_headline
            },
            detailItem: this.data.itemList[idx]
        })

    }
})
