
Component({
    properties:{
        info:{
            type: Object,
            value: {}
        }
    },
    ready:function () {
        console.log('header-item');
        console.log(this.data.info);
        this.setData({
            info: this.data.info
        })
    },
})