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
    title: 'detail',
    detailRules: '听到叫号请到迎宾台，过号不作废，延三桌安排',
    imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
    waitInfo: [
      // {
      //   kind: '餐桌类型',
      //   desk: '等待桌数',
      //   time: '预估时间'
      // },
      // {
      //   kind: '小桌（1-2人）',
      //   desk: '桌',
      //   number: '1',
      //   time: '--分钟'
      // },
      // {
      //   kind: '中桌（3-4人）',
      //   desk: '桌',
      //   number: '1',
      //   time: '--分钟'
      // },
      // {
      //   kind: '大桌（5人以上）',
      //   desk: '桌',
      //   time: '--分钟'
      // }
    ],
    restaurant: {
      // img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // name: '人马科技大饭堂',
      // distance: '100',
      // grade: 'four-star',
      // address: '汇德商业大厦501',
      // tel: '1361234567895',
      // time: '10:00-22:00'
    }
  },
  /**
   * 拨打电话
   */
  callPhone: function callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.restaurant.photo
    });
  },

  /**
   * 获取商店的轮播图
   */
  getShopAd: function getShopAd(that, sId) {
    var obj2 = {
      url: useUrl.serviceUrl.shop_ad,
      data: {
        session_key: wx.getStorageSync('session_key'),
        s_id: sId
      },
      success: function success(res) {
        if (res.data.data.length === 0) return;
        var imgUrls = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.data.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var index = _step.value;

            // console.log(index)
            imgUrls.push(index.thumb);
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

        that.setData({
          imgUrls: imgUrls
        });
      }
    };
    app.requestInfo(obj2);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(e) {
    // TODO: onLoad
    // 获取对应商家的信息
    var that = this;
    var sId = e.s_id;
    var obj = {
      url: useUrl.serviceUrl.xiangqing,
      data: {
        session_key: wx.getStorageSync('session_key'),
        s_id: sId
      },
      success: function success(res) {
        // console.log(res)
        that.setData({
          await: res.data.data.await,
          restaurant: res.data.data.shop_info
        });
      }
    };
    app.requestInfo(obj);
    // 获取商家轮播图
    that.getShopAd(that, sId);
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
//# sourceMappingURL=detail.js.map
