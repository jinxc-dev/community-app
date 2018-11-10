// pages/search/search.js

Page({
    data: {
        info: {
            image: "/images/logo.png",
            title: "Test Hao App",
            date:"2018-09-18 18:24"
        }
    },
    onLoad: function () {
        // this.inputTyping = debounce(this.inputTyping, 300)
        this.setData({
            info: this.data.info
        })
    },
    loadData(){
        
    }
});