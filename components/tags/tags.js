
Component({
    properties:{
        tags: {
            type: Array,
            value: []
        }
    },
    ready:function () {
        this.setData({
            tags: this.data.tags
        });
        
    },
})