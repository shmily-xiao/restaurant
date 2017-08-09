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
    title: 'user',
    userInfo: null,
    userDetail: [{
      title: '正在排队',
      number: 0
    }, {
      title: '优惠券',
      number: 4
    }, {
      title: '积分',
      number: 0
    }],
    userList: [{
      icon: 'iconfont icon-xiaoxi',
      title: '我的排单号',
      id: 'number'
    }, {
      icon: 'iconfont icon-lingdang',
      title: '消息',
      id: 'message'
    }, {
      icon: 'iconfont icon-fapiao',
      title: '积分兑换',
      id: 'integral'
    }, {
      icon: 'iconfont icon-dingdan',
      title: '我的订单',
      id: 'order'
    }, {
      icon: 'iconfont icon-iconfontruzhu-copy',
      title: '商家入驻',
      id: 'merchant'
    }],
    user: {
      shopStatus: 0
    }
  },
  /**
   * 优惠券
   */
  getCoupon: function getCoupon() {
    var that = this;

    var obj = {
      url: useUrl.serviceUrl.coupons_num,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        // console.log(res)
        that.data.userDetail[1].number = res.data.data.count[0];
        that.setData({
          // couponsCount: res.data.data.count,
          userDetail: that.data.userDetail
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 获取用户积分信息
   */
  getjifen: function getjifen() {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.jifen,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        if (!res.data.data) return;
        var userDetail = that.data.userDetail;
        userDetail[2].number = res.data.data.score;
        that.setData({
          userDetail: userDetail
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 获取用户的全部排队号
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
        var userDetail = that.data.userDetail;
        userDetail[0].number = res.data.data.length;
        that.setData({
          userDetail: userDetail
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    });
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
    this.getCoupon();
    this.getjifen();
    this.getpaidui();
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
//# sourceMappingURL=user.js.map
