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
    title: 'index',
    userInfo: null,
    userSite: '定位中',
    navList: [{
      navTitle: '餐饮动态',
      navIcon: 'iconfont icon-shalou',
      navUrl:''
    }, {
      navTitle: '美食求购',
      navIcon: 'iconfont icon-chuliyuyue',
      navUrl:''
    }, {
      navTitle: '美食推荐',
      navIcon: 'iconfont icon-erweima',
      navUrl:''
    }, {
      navTitle: '会员中心',
      navIcon: 'iconfont icon-chuliyuyue',
      navUrl:''
    }],
    navList2: [{
      navTitle: '餐饮会展',
      navIcon: 'iconfont icon-chuliyuyue',
      navUrl:''
    }, {
      navTitle: '加盟商家',
      navIcon: 'iconfont icon-chuliyuyue',
      navUrl:''
    }, {
      navTitle: '关于我们',
      navIcon: 'iconfont icon-chuliyuyue',
      navUrl:''
    }, {
      navTitle: '版权信息',
      navIcon: 'iconfont icon-chuliyuyue',
      navUrl:''
    }],
    hotShops: [
      {
        id:"1",
        shopImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        shopName: '青花椒砂锅鱼'
      },
      {
        id:"1",
        shopImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        shopName: '青花椒砂锅鱼'
      },
      {
        id:"1",
        shopImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        shopName: '青花椒砂锅鱼'
      },
      {
        id:"1",
        shopImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        shopName: '青花椒砂锅鱼'
      },
      {
        id:"1",
        shopImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        shopName: '青花椒砂锅鱼'
      },
      {
        id:"1",
        shopImg: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        shopName: '青花椒砂锅鱼'
      }
    ],
    restaurantInfo:[
      {
        id:"1",
        title:"asdasdasdasdasas",
        intro:"jkblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      },
      {
        id:"1",
        title:"asdasdasdasdasas",
        intro:"jkblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      },
      {
        id:"1",
        title:"asdasdasdasdasas",
        intro:"jkblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      },
      {
        id:"1",
        title:"asdasdasdasdasas",
        intro:"jkblbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      }
    ],
    nearShop: [
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '青花椒砂锅鱼2',
        price: '30',
        kind: '中国菜',
        distance: '8.6km',
        status: '无需排队',
        grade: 'five-star'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '青花椒砂锅鱼2',
        price: '30',
        kind: '中国菜',
        status: '无需排队',
        grade: 'four-star'
      },
      {
        img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: '青花椒砂锅鱼2',
        price: '128',
        kind: '中国菜',
        status: '无需排队',
        grade: 'one-star'
      }
    ],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    star: ['zero-star', 'one-star', 'two-star', 'three-star', 'four-star', 'five-star']
  },
  /**
   * 用户选择位置
   * @returns {boolean}
   */
  chooseLocation: function chooseLocation() {
    // console.log(1)
    var that = this;
    wx.chooseLocation({
      success: function success(res) {
        // console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        that.nearShop(res.longitude, res.latitude);
        if (res.name.length <= 0) {
          return that.setData({
            userSite: res.address
          });
        }
        that.setData({
          userSite: res.name
        });
      }
    });
  },

  /**
   * 用户搜索
   */
  goSearch: function goSearch() {
    wx.navigateTo({
      url: '../search/search'
    });
  },

  /**
   * 获取用户地理位置
   */
  getLocation: function getLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function success(res) {
        // console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        wx.setStorageSync('userSite', { longitude: res.longitude, latitude: res.latitude });
        var obj = {
          url: useUrl.serviceUrl.weizhi,
          data: {
            session_key: wx.getStorageSync('session_key'),
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function success(res) {
            // console.log(res)
            that.setData({
              userSite: res.data.data.address
            });
          }
        };
        app.requestInfo(obj);
        that.getNearShop(res.longitude, res.latitude);
        // 获取用户当前位置地名
        return;
        // todo delete return
        // let obj = {
        //   url: useUrl.serviceUrl.fujin_shop,
        //   data: {
        //     latitud: res.latitude,
        //     longitude: res.longitude,
        //     session_key: wx.getStorageSync('session_key')
        //   },
        //   success (res) {
        //     console.log(res)
        //     that.setData({
        //       userSite: res.data.data
        //     })
        //   }
        // }
        // app.requestInfo(obj)
      }
    });
  },

  /**
   * 获取热门商家
   */
  getHotShop: function getHotShop() {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.hot_shop,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        // console.log(res)
        that.setData({
          hotShop: res.data.data
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 获取附近商家
   */
  getNearShop: function getNearShop(longitude, latitude) {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.fujin_shop,
      data: {
        session_key: wx.getStorageSync('session_key'),
        latitude: latitude,
        longitude: longitude
      },
      success: function success(res) {
        // console.log(res)
        // return
        if (res.data.data.length === 0) return;
        that.setData({
          nearShop: res.data.data
        });
      }
    };
    app.requestInfo(obj);
  },

  /**
   * 获取首页轮播图
   */
  getAd: function getAd() {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.ad,
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function success(res) {
        // console.log(res)
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
    app.requestInfo(obj);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var that = this;
    var sessionKey = wx.getStorageSync('session_key');
    if (sessionKey) {
      // 有sessionKey
      // 获取用户位置信息
      that.getLocation();
      // 获取人们商家
      that.getHotShop();
      // 获取首页轮播图
      that.getAd();
      // 获取用户信息
      that.setData({
        userInfo: wx.getStorageSync('userInfo')
      });
      // let obj = {
      //   // withCredentials: true,
      //   success (res) {
      //     // console.log(res)
      //     that.setData({
      //       userInfo: res.userInfo
      //     })
      //     // that.data.userInfo = res.userInfo
      //   }
      // }
      // app.getUserInfo(obj)
      // that.getNearshop()
    } else {
      // 没有sessionKey
      app.mainLogin(that, that.getLocation, that.getHotShop, that.getAd);
    }
    // 获取地理位置

    // console.log(' ---------- onLoad ----------')
    // console.dir(app.data)
    // 读取session_key
    // let session_key = wx.getStorageSync('session_key')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    console.log(' ---------- onReady ----------');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // app.getUserInfo()
    //   .then(info => this.setData({ userInfo: info }))
    //   .catch(console.info)
    console.log(' ---------- onShow ----------');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    console.log(' ---------- onHide ----------');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    console.log(' ---------- onUnload ----------');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    console.log(' ---------- onPullDownRefresh ----------');
  }
});
//# sourceMappingURL=index.js.map
