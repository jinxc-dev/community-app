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
        // var str = this.data.info.tag_line;
        // console.log(str.length);
        // if (str.length > 20) {
        //     this.data.info.tag_line = str.substr(0, 20) + "...."; 
        // }
        this.setData({
            info: this.data.info
        })
        
    },
})