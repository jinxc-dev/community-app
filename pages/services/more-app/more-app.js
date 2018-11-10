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
        
    },
    clickImage(url) {
        console.log(url);
        wx.previewImage({
            current:'/images/tgold-weixin-app.jpg',
            urls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg']
        })
    }
});