'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var useUrl = require('../../utils/service');
var WxParse = require('../../utils/wxParse/wxParse');
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'useroperation',
    operation: null,
    numberList: [],
    message: [],
    integral: [{
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      integralid: 'renma1',
      name: '人马大饭堂',
      delMoney: 20,
      useMoney: 100,
      needIntegral: 200
    }, {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      integralid: 'renma2',
      name: '人马大饭堂',
      delMoney: 20,
      useMoney: 100,
      needIntegral: 200
    }, {
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '人马大饭堂',
      integralid: 'renma3',
      delMoney: 20,
      useMoney: 100,
      needIntegral: 200
    }],
    currentCouponTab: 0,
    couponNumber: [{
      title: '未使用'
    }, {
      title: '使用记录'
    }, {
      title: '已过期'
    }],
    orderNumber: ['待支付', '全部'],
    orderList: {
      // pay: [
      //   {
      //     img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //     name: '人马大饭堂',
      //     code: 'No12312312',
      //     time: '2017-03-26 17:26',
      //     money: '238'
      //   }
      // ],
      // finish: [
      //   {
      //     img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //     name: '人马大饭堂',
      //     code: 'No12312312',
      //     time: '2017-03-26 17:26',
      //     money: '238',
      //     delMoney: '23',
      //     actMoney: '215',
      //     restaurantId: 'No123123',
      //     waiterId: 'waiter123123'
      //   }
      // ],
      // cancel: [
      //   {
      //     img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //     name: '人马大饭堂',
      //     code: 'No12312312',
      //     time: '2017-03-26 17:26',
      //     money: '238'
      //   }
      // ]
    },
    shopArray: ['请选择经营品类', '湘菜', '川菜', '粤菜', '沙县小吃', '徽菜', '茶点'],
    index: '0',
    showMessage: null
  },
  /**
   * 输入店名保存
   * @param e
   */
  shopNameInput: function shopNameInput(e) {
    this.setData({
      shopName: e.detail.value
    });
  },

  /**
   * 选择消息显示
   */
  chooseMessage: function chooseMessage(e) {
    this.setData({
      showMessage: e.currentTarget.dataset.message
    });
  },

  /**
   * 设置couponTab
   * @param e
   */
  chooseCouponTab: function chooseCouponTab(e) {
    this.setData({
      currentCouponTab: e.currentTarget.dataset.tabid
    });
  },

  /**
   * 去支付
   * @param e
   */
  goPay: function goPay(e) {
    wx.navigateTo({
      url: '../payorder/payorder?o_id=' + e.currentTarget.dataset.id + '&s_id=' + e.currentTarget.dataset.shop
    });
  },

  /**
   * 去打分或者打赏
   * @param e
   */
  goGratuity: function goGratuity(e) {
    // todo 释放
    var sid = e.currentTarget.dataset.restaurantid;
    var oid = e.currentTarget.dataset.oid;
    // let waiterId = e.currentTarget.dataset.waiterid
    // let kind = e.currentTarget.dataset.kind
    // let url = ''
    // if (kind === 'shop') {
    // url = '../grade/grade?restaurantId=' + restaurantId
    var url = '../grade/grade?s_id=' + sid + '&o_id=' + oid;
    // } else {
    //   url = '../gratuity/gratuity?waiterId=' + waiterId
    // }
    wx.navigateTo({
      url: url
    });
  },

  /**
   * 选择经营品类
   */
  chooseShopKind: function chooseShopKind(e) {
    this.setData({
      index: e.detail.value
    });
  },

  /**
   * 开始上传商家入驻相关信息
   */
  startShop: function startShop() {
    // todo 入驻信息添加到缓存中
    if (!this.data.shopName || this.data.index === '0') {
      return wx.showModal({
        title: '信息不完整',
        content: '请补充信息完整',
        showCancel: false
      });
    }
    var newShopInfo = {};
    newShopInfo.shopName = this.data.shopName;
    newShopInfo.shopKind = this.data.shopArray[this.data.index];
    wx.setStorageSync('newShopInfo', newShopInfo);
    wx.redirectTo({
      url: '../businessCooperation/businessCooperation?shopName=' + this.data.shopName + '&shopKind=' + this.data.shopArray[this.data.index]
    });
  },

  // 获取用户的订单
  getOrder: function getOrder() {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.order,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        if (!res.data.data.order_suoyou) return;
        // console.log(res)
        var data = res.data.data;
        var orderList = {};
        orderList.pay = data.order_weifu || [];
        var finish = [];
        var cancel = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data.order_suoyou[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item.status === '2' || item.status === '3' || item.status === '4') {
              finish.push(item);
            }
            if (item.status === '8' || item.status === '9') {
              cancel.push(item);
            }
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

        orderList.finish = finish;
        orderList.cancel = cancel;
        that.setData({
          orderList: orderList
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 获取用户的排单信息
   */
  getWaitInfo: function getWaitInfo() {
    // let obj = {
    //   url: useUrl.serviceUrl.queue,
    //   data: {
    //     session_key: wx.getStorageSync('session_key'),
    //   }
    // }
  },

  /**
   * 获取用户的优惠券
   */
  getCoupons: function getCoupons() {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.coupons_num,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        // console.log(res)
        that.setData({
          couponsCount: res.data.data.count,
          couponNoUseList: res.data.data.status_a,
          couponUseList: res.data.data.status_b,
          couponOutList: res.data.data.status_c
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 获取消息
   */
  getMation: function getMation() {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.mation,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        // console.log(res)
        var message = res.data.data;
        that.setData({
          message: message
        });
        var messageArr = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = message[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            // console.log(item)
            messageArr.push(item.content);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        console.log(messageArr);
        for (var i = 0; i < messageArr.length; i++) {
          WxParse.wxParse('message' + i, 'html', messageArr[i], that);
          if (i === messageArr.length - 1) {
            WxParse.wxParseTemArray('messageTemArr', 'message', messageArr.length, that);
          }
        }
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 从消息去到对应的商店
   */
  goshop: function goshop(e) {
    console.log(e);
    wx.redirectTo({
      url: '../ordering/ordering?s_id=' + e.currentTarget.dataset.id
    });
  },

  /**
   * 获取用户的全部排单号
   */
  getpaidui: function getpaidui() {
    var that = this;
    var userSite = wx.getStorageSync('userSite');
    var obj = {
      url: useUrl.serviceUrl.queue_num,
      data: {
        session_key: wx.getStorageSync('session_key'),
        latitude: userSite.latitude,
        longitude: userSite.longitude
      },
      success: function success(res) {
        if (!res.data.data) return;
        that.setData({
          numberList: res.data.data
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 获取所有的优惠券信息
   */
  getAllCoupons: function getAllCoupons() {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.getCouDetail,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        if (!res.data.data) return;
        that.setData({
          integral: res.data.data
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 兑换优惠券
   */
  getCoupon: function getCoupon(e) {
    // console.log(e)
    var obj = {
      url: useUrl.serviceUrl.cou_convert,
      data: {
        session_key: wx.getStorageSync('session_key'),
        shop_id: e.currentTarget.dataset.shop,
        cou_id: e.currentTarget.dataset.integralid
      },
      success: function success(res) {
        // console.log(res)
        wx.showModal({
          title: '领取优惠券',
          content: res.data.data,
          showCancel: false
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    // 由跳转链接设置标题
    var operation = params.operation;
    // 设置operation
    this.setData({
      operation: params.operation
    });
    // 判断用户申请的店铺状态
    if (params.shopStatus === '2' || params.shopStatus === '1') {
      return wx.redirectTo({
        url: '../businessCooperation/businessCooperation?shopStatus=' + params.shopStatus
      });
    }
    // 判断传入类型
    if (operation === 'number') {
      operation = '我的排单号';
      this.getpaidui();
    } else if (operation === 'message') {
      operation = '消息';
      this.getMation();
    } else if (operation === 'integral') {
      operation = '积分兑换';
      this.getAllCoupons();
    } else if (operation === 'order') {
      operation = '我的订单';
      this.getOrder();
    } else if (operation === 'merchant') {
      operation = '商家入驻';
    } else {
      operation = '优惠券';
      this.getCoupons();
    }
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: operation
    });
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
//# sourceMappingURL=useroperation.js.map
