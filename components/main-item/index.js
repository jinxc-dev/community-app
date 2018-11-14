
Component({
    properties:{
        avatar: {
            type: String,
            value:""
        },
        title: {
            type: String,
            value:""
        },
        subTitle: {
            type:String,
            value: ""
        },
        tags: {
            type: String,
            value:""
        },
        isRound: {
            type: Boolean,
            value: false
        },
        isSmall: {
            type:Boolean,
            value: false
        }
    },
    data: {
        isSubTitle: false,
        isTags: false,
    },
    ready:function () {

        var set_data = {
            avatar: this.data.avatar,
            isTags: false,
            isSubTitle: false,
            tags: this.data.tags,
            sizeStyle: "",
            roundStyle: "",
            isRound: this.data.isRound
        }
        if (this.data.subTitle != "") {
            set_data.isSubTitle = true;
        } 
        if (this.data.tags != "") {
            set_data.isTags = true;
        }
        if (this.data.isRound == true) {
            set_data.roundStyle = "round";
        } 
        if (this.data.isSmall == true) {
            set_data.sizeStyle = "sm";
        } 

        this.setData(set_data);

    }
})