
import {geocoder} from "../../utils/util"
const g_location = getApp().globalData.location;

Page({
	data: {
		latitude: 23.099994,
		longitude: 113.324520,
		markers: [{
			id: 1,
			latitude: 23.099994,
			longitude: 113.324520
		}]
	},
	onReady: function (e) {
		this.mapCtx = wx.createMapContext('myMap');
		

	},
	onLoad: function(options) {
		var address = options.address;
		this.setLocation(getApp().globalData.location);
		var _this = this;
		geocoder({
			address: address,
			success(res) {
				console.log(res);
				_this.setLocation(res.result.location);
			}
		});

	},

	setLocation: function (loc) {
		this.setData({
			latitude: loc.lat,
			longitude: loc.lng,
			markers: [{
				id: 1,
				latitude: loc.lat,
				longitude: loc.lng
			}]			
		})
	},
	getCenterLocation: function () {
		this.mapCtx.getCenterLocation({
			success: function(res){
				console.log(res.longitude)
				console.log(res.latitude)
			}
		})
	},
	moveToLocation: function () {
		this.mapCtx.moveToLocation()
	},

})
	