'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var useUrl = require('../../utils/service');
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'payorder',
    index: 0,
    allMoney: 582.02,
    order: {
      // restaurant: '人马大饭堂',
      // count: 5,
      // number: '20170326122',
      // time: '2017/3/26 13:23:02',
      // goods: [
      //   {
      //     name: '鱼香肉丝',
      //     count: 2,
      //     money: '23.00'
      //   },
      //   {
      //     name: '鱼香肉丝',
      //     count: 2,
      //     money: '23.00'
      //   },
      //   {
      //     name: '鱼香肉丝',
      //     count: 2,
      //     money: '23.00'
      //   },
      //   {
      //     name: '鱼香肉丝',
      //     count: 2,
      //     money: '23.00'
      //   },
      //   {
      //     name: '鱼香肉丝',
      //     count: 2,
      //     money: '23.00'
      //   }
      // ],
      // allMoney: 582.02,
      // concessional: ['不使用优惠券', '满100减20', '满100减30', '满300减10', '满500优惠5折'],
      // delMoney: [0, -20, -30, -100, 0.5]
    }
  },
  /**
   * 优惠券选择
   */
  concessionalChange: function concessionalChange(e) {
    // console.log(this.data.allMoney + (this.data.order.delMoney[e.detail.value]))
    if (this.data.order.delMoney[e.detail.value] < 1 && this.data.order.delMoney[e.detail.value] > 0) {
      this.data.order.allMoney = this.data.allMoney * this.data.order.delMoney[e.detail.value];
    } else {
      this.data.order.allMoney = parseInt(this.data.allMoney) + this.data.order.delMoney[e.detail.value];
    }
    this.setData({
      index: e.detail.value,
      order: this.data.order
    });
  },

  /**
   * 小数点后两位
   * @param floatvar
   * @returns {*}
   */
  changeTwoDecimalf: function changeTwoDecimalf(floatvar) {
    var fx = parseFloat(floatvar);
    if (isNaN(fx)) {
      return false;
    }
    fx = Math.round(fx * 10000) / 100.00;
    var sx = fx.toString();
    var posdecimal = sx.indexOf('.');
    if (posdecimal < 0) {
      posdecimal = sx.length;
      sx += '.';
    }
    while (sx.length <= posdecimal + 2) {
      sx += '0';
    }
    return sx;
  },

  /**
   * 支付货款
   */
  payMoney: function payMoney() {
    // let obj = {
    //   url: url,
    //   data: {
    //
    //   },
    //   method: 'GET',
    //   success (res) {
    //     // todo 付款流程
    //     // wx.requestPayment({
    //     //   'timeStamp': '',
    //     //   'nonceStr': '',
    //     //   'package': '',
    //     //   'signType': 'MD5',
    //     //   'paySign': '',
    //     //   'success':function(res){
    //     //   },
    //     //   'fail':function(res){
    //     //   }
    //     // })
    //   },
    //   fail (res) {
    //     console.log(res)
    //   }
    // }
    // wx.requset(obj)
  },

  /**
   * 获取订单详情信息
   * @param e
   */
  getOrderInfo: function getOrderInfo(params) {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.order_info,
      data: {
        session_key: wx.getStorageSync('session_key'),
        shop_id: params.s_id,
        o_id: params.o_id
      },
      success: function success(res) {
        // console.log(res)
        var order = res.data.data;
        if (order.coupons) {
          order.concessional = order.coupons;
          var delMoney = [];
          var coupons = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = order.coupons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              delMoney.push(parseInt(item.amount) * -1);
              coupons.push('满' + item.use_price + '减' + item.amount + '元');
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          order.delMoney = delMoney;
          order.allMoney = parseInt(order.order.order_price) + delMoney[0];
          order.coupons = coupons;
          return that.setData({
            order: order,
            allMoney: order.order.order_price
          });
        }
        order.allMoney = order.order.order_price;
        that.setData({
          order: order,
          allMoney: order.order.order_price
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    // console.log(e)
    this.getOrderInfo(params);
    // TODO: onLoad
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=payorder.js.map
