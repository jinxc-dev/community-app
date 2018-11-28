
import {
    fetch, coordFormat,
    alert, confirm,
    getCurrentAddress
} from './util'

export function getSellers(options) {
    var {
        page,
        success
    } = options
    page = page || 0
        getApp().getCurAddress(address => {
            const location = address.location;
            fetch({
                url: 'index.php?m=Mall&c=Seller&a=getSellers',
                data: {
                    page,
                    city_name: address.city,
                    city_id: address.city_id,
                    district_name: address.district,
                    district_id: address.district_id,
                    longitude: address.location.longitude,
                    latitude: address.location.latitude
                },
                success
            })
        })
}

export function getInfoDataByID(options) {
    let {success} = options;
    var community_id = getApp().globalData.user_comm_id;
    fetch({
        url: options.url,
        data:{
            id: options.id,
            commid: community_id
        },
        success
    })
}

export function getCommunityList(options) {
    let {success} = options;
    fetch({
        url: 'getCommunities',
        data: {},
        method:'GET',
        success
    })
}

export function getInfoDataList(options) {
    let {success} = options;
    var community_id = getApp().globalData.user_comm_id;
    fetch({
        url:options.url + "/" + community_id,
        data:{},
        method:'GET',
        success
    })
}


export function setInfoData(options) {
    let {success, fail, complete} = options;
    var community_id = getApp().globalData.user_comm_id;
    fetch({
        url:options.url,
        data:Object.assign(options.data, {commid: community_id}),
        success,
        fail,
        complete

    })
}

export function insertUserInfo(options) {
    let {success} = options;
    fetch({
        url: "insertUserInfo",
        data: options.data,
        success
    })
}

export function userLogin(options) {
    let {success} = options;
    wx.login({
        success(res) {
            fetch({
                url: "userLogin",
                data: {
                    code: res.code
                },
                success
            })
        }
    })
}

