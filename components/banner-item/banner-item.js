
Component({
    properties:{
        info: {
            type: Object,
            value: {}
        }
    },
    ready:function () {
        this.setData( {
            // image: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
            info: this.data.info
        })
        
    },
})