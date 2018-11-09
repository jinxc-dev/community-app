
// const app = getApp()

Page({
    data: {
        menuData:[
            {
                icon: "/images/category/1.png",
                title: "联系人名称",
                items: [
                    { name: 'menu1', id: 23},
                    { name: 'menu1', id: 24},
                    { name: 'menu1', id: 25},
                    { name: 'menu1', id: 26},
                    { name: 'menu1', id: 27},
                    { name: 'menu1', id: 28},
                    { name: 'menu1', id: 29},
                    { name: 'menu1', id: 30},
                    { name: 'menu1', id: 31},
                    { name: 'menu1', id: 32}
                ]
            }, {
                icon: "/images/category/2.png",
                title: "联系人名称",
                items: [
                    { name: 'menu1', id: 23},
                    { name: 'menu1', id: 24},
                    { name: 'menu1', id: 25}
                ]
            }, {
                icon: "/images/category/3.png",
                title: "联系人名称",
                items: [
                    { name: 'menu1', id: 23},
                    { name: 'menu1', id: 24}
                ]
            }
        ], 
        menuInfo: []
    },
    onReady: function () {
        var w_data = this.data.menuData;
        for (var i = 0; i < w_data.length; i++) {
            var w_list = [];
            var n = 0;
            for (var j = 0; j < w_data[i].items.length; j++) {
                if (j % 2 == 0) {
                    w_list[n] = {};
                    w_list[n].first = w_data[i].items[j];
                } else {
                    w_list[n].second = w_data[i].items[j];
                    n++;
                }
            }
            this.data.menuInfo.push({
                icon: w_data[i].icon,
                title: w_data[i].title,
                items: w_list
            });
        }

        this.setData({
            menuInfo: this.data.menuInfo
        })
    },

    onLoad: function () {
    },

    loadData() {
        
    },
})
