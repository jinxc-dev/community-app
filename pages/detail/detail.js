
import {getInfoDataByID} from '../../utils/apis'
import distance from '../../utils/distance'
import {geocoder, calculateDistance} from "../../utils/util"
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
        if (options.id == "") {
            return;
        }
        this.setData({
            header_icon: options.icon
        })        
        this.myLocation = {};
        var _this = this;
        wx.getLocation({
            type: 'gcj02', 
            success: function(res) {
                console.log(res);
                _this.myLocation = {
                    latitude: res.latitude,
                    longitude: res.longitude
                };
                _this.loadData(options.id);
            }
        })

        // this.loadData(options.id);
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
                _this.calcDistance(res.items);
                _this.setData({
                    menuInfo: _this.data.menuInfo,
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

    },

    calcDistance(items) {
        var _this = this;
        var w_result = [];

        for (var i = 0; i < items.length; i++) {
            // items[i].distance = null;
            var item = items[i];
            item.distance = null;
            geocoder({
                address: items[i].address,
                success(res) {
                    var pos = {
                        latitude: res.result.location.lat,
                        longitude:res.result.location.lng 
                    };
                    console.log(distance(pos.latitude, pos.longitude, _this.myLocation.latitude, _this.myLocation.longitude));
                    calculateDistance({
                        pos1: pos,
                        pos2: _this.myLocation,
                        success(res1){
                            item.distance = (res1.result.elements[0].distance / 1000).toFixed(1);
                            w_result.push(item);
                            if (i > items.length - 1) {
                                _this.sortDistance(w_result);
                            }
                            
                        },
                        fail(res) {
                            item.distance = null;
                            w_result.push(item);
                            if (i > items.length - 1) {
                                _this.sortDistance(w_result);
                            }
                        }
                    })

                },
                fail(res) {
                    item.distance = null;
                    w_result.push(item);
                    if (i > items.length - 1) {
                        _this.sortDistance(w_result);
                    }
                }
            });    
        }
        // return w_result;
    },

    sortDistance(data) {
        this.data.itemsList = data;
        this.data.itemsList.sort(function (a, b){
            if (a.distance == null) {
                return -1;
            }
            return b.distance - a.distance;
        });
        this.setData({
            itemList: this.data.itemsList
        })
    }
})
