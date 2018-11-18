import dateFormat from '../../utils/dateformat.js'
Component({
    properties:{
        info: {
            type: Object,
            value: {}
        },
        uploadPath: {
            type:String,
            value: ""
        }
    },
    ready:function () {
        this.data.info.posted_on = dateFormat(new Date(this.data.info.posted_on), "mm-dd HH:MM");
        this.setData({
            info: this.data.info
        })
        
    },
})