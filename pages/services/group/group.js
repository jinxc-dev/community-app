// pages/search/search.js

Page({
    data: {
        info: {
            image: "/images/logo.png",
            title: "Test Hao App",
            date:"2018-09-18 18:24",
            tags:["tag1", "tag2"]
        }
    },
    onLoad: function () {
        this.setData({
            info:this.data.info
        });
    },
    loadData(){
        
    }
});