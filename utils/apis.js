
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
    fetch({
        url: options.url,
        data:{id: options.id},
        success
    })
}

export function getInfoDataList(options) {
    let {success} = options;
    fetch({
        url:options.url,
        data:{},
        method:'GET',
        success
    })
}

