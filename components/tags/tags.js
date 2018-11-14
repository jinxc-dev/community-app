
Component({
    properties:{
        tags: {
            type: String,
            value: ""
        }
    },
    ready:function () {
        console.log("tags:" + this.data.tags);
        var tags = this.data.tags.split(',');        
        this.setData({
            tagList: tags
        });
        
    },
})