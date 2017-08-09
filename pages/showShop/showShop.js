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
    title: '排队取号',
    nearShop: [],
    star: ['zero-star', 'one-star', 'two-star', 'three-star', 'four-star', 'five-star']
  },
  /**
   * 排队、预约取号
   */
  getpaidui: function getpaidui(param) {
    var that = this;
    var userSite = wx.getStorageSync('userSite');
    var url = useUrl.serviceUrl[param];
    var obj = {
      url: url,
      data: {
        session_key: wx.getStorageSync('session_key'),
        latitude: userSite.latitude,
        longitude: userSite.longitude
      },
      success: function success(res) {
        if (!res.data.data) return;
        that.setData({
          nearShop: res.data.data
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(e) {
    // console.log(e)
    if (e.type === '1') {
      wx.setNavigationBarTitle({
        title: '预约取号'
      });
      this.setData({
        title: '预约订座'
      });
      this.getpaidui('yuding_shop');
    } else {
      this.getpaidui('paidui_shop');
    }
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
//# sourceMappingURL=showShop.js.map
