// pages/search/search.js

Page({
    data: {
        inputShowed: false,
        inputVal: "",
        page: 0,
        hasMore: true,
        loading: false
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
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        const {value} = e.detail
        this.setData({
            inputVal: value,
            page: 0,
            hasMore: true,
            loading: false
        });
        if (value) {
            this.loadData()
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // this.inputTyping = debounce(this.inputTyping, 300)
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // const {loading, hasMore} = this.data
        // if (hasMore && !loading) {
        //     this.loadData()
        // }
    },
    loadData(){
        
    }
});