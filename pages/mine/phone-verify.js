
const app = getApp()
import WxValidate from '../../utils/WxValidate'
import Countdown from '../../utils/countdown'
import { alert, getPrevPage } from '../../utils/util'
import { getCode, login } from '../../utils/apis'
var initCount = 60
Page({
    data: {
        codeLabel: '获取验证码',
        phone: '',
    },
    onLoad: function (options) {
        this.callback = options.callback || 'callback'
        this.countdown = new Countdown(this, 'count')
        this.initValidate()
    },

    onUnload: function () {
        // 页面关闭
        if (this.countdown) {
            this.countdown.stop()
        }
    },
    initValidate() {
        this.validate = new WxValidate({
            phone: {
                required: true,
                tel: true,
            },
            code: {
                required: true,
            },
        }, {
            phone: {
                required: '请输入手机号',
                tel: '请输入有效手机号码'
            },
            code: {
                required: '请输入验证码',
            },
        })
    },
    onInputPhone(e) {

        this.setData({
            phone: e.detail.value
        })
    },
    onGetCode(e) {
        console.log(e)
        var that = this
        var {phone, count} = this.data
        if (count > 0) {
            return;
        }
        if (!/^1[34578]\d{9}$/.test(phone)) {
            return alert('请输入有效手机号码')
        }
        that.setData({
            count: initCount
        })
        that.countdown.start()
        getCode({
            phone,
            success(data) {
              console.log(data)
                that.setData({
                    codeLabel: '重新获取验证码'
                })
            },
            error(res) {
                that.countdown.stop()
                that.setData({
                    count: 0
                })
            }
        })
    },
    formSubmit(e) {
      console.log(e)
        var that = this
        var {loading} = this.data
        if(loading) {
            return;
        }
        if (!this.validate.checkForm(e)) {
            const error = this.validate.errorList[0]
            return alert(error.msg)
        }
        this.setData({
            loading: true
        })

        var {phone, code} = e.detail.value
        login({
            phone, code,
            success(data) {
                console.log(data)
                that.setData({

                    loading: false
                })
                getApp().setLoginInfo(data)
                var cb = getPrevPage()[that.callback]
                cb && cb(data)
                wx.navigateBack()
            },
            error() {
                that.setData({
                    loading: false
                })
            }
        })
    }
})
