// pages/search/search.js

Page({
    data: {
        inputShowed: false,
        inputVal: "",
        keyList: []
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },

    inputTyping: function (e) {
        const {value} = e.detail;
        this.data.inputVal = e.detail.value;
        this.setData({
            inputVal: value
        });
    },
    onLoad: function () {
        this.data.keyList = wx.getStorageSync("key-list");
        if (this.data.keyList == "") {
            this.data.keyList = [];
        }
        this.setData({
            keyList: this.data.keyList
        })
    },

    onSearch: function () {
        if (this.data.inputVal == "") 
            return;

        this.data.keyList.push(this.data.inputVal);
        wx.setStorageSync("key-list", this.data.keyList);

        this.setData({
            keyList: this.data.keyList
        })
        wx.navigateTo({
            url: "./result?key=" + this.data.inputVal
        })
    },

    clearInput() {
        this.inputVal = "";
        this.setData({
            inputVal: "",
            inputShowed: false
        })
    },
    clearKeyList() {
        this.setData({
            keyList: []
        });
        this.keyList = [];
        wx.removeStorageSync("key-list");
    },
});