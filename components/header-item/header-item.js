
Component({
    properties:{
        info:{
            type:Object,
            value: {}
        }
    },
    ready:function () {
        this.setData({
            info: this.data.info
        })
    },
})