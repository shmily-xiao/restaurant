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
    title: 'search',
    nearShop: [
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '30',
      //   kind: '中国菜',
      //   distance: '8.6km',
      //   status: '无需排队',
      //   grade: 'five-star'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '30',
      //   kind: '中国菜',
      //   status: '无需排队',
      //   grade: 'four-star'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '128',
      //   kind: '中国菜',
      //   status: '无需排队',
      //   grade: 'one-star'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '128',
      //   kind: '中国菜',
      //   status: '无需排队',
      //   grade: 'one-star'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '128',
      //   kind: '中国菜',
      //   status: '无需排队',
      //   grade: 'one-star'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '128',
      //   kind: '中国菜',
      //   status: '无需排队',
      //   grade: 'one-star'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '128',
      //   kind: '中国菜',
      //   status: '无需排队',
      //   grade: 'one-star'
      // },
      // {
      //   img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      //   name: '青花椒砂锅鱼',
      //   price: '128',
      //   kind: '中国菜',
      //   status: '无需排队',
      //   grade: 'one-star'
      // }
    ],
    search: false,
    searchText: null,
    history: [],
    chooseHistory: null,
    searchShow: true,
    star: ['zero-star', 'one-star', 'two-star', 'three-star', 'four-star', 'five-star']
  },
  /**
   * 清空搜索记录
   */
  cleanHistory: function cleanHistory() {
    this.setData({
      history: [],
      searchShow: false
    });
    wx.removeStorageSync('history');
  },

  /**
   * 改变标签选择
   * @param e
   */
  chooseTip: function chooseTip(e) {
    var index = e.currentTarget.dataset.choose;
    this.setData({
      chooseHistory: index
    });
    this.search(this.data.history[index]);
  },

  /**
   * 搜索返回
   */
  searchShop: function searchShop(e) {
    var searcheText = null;
    if (e.currentTarget.dataset.type === 'btn') {
      // 按钮搜索
      // console.log(this.data.searchText)
      searcheText = this.data.searchText;
    } else {
      // 打字框搜索
      // console.log(e.detail.value)
      searcheText = e.detail.value;
    }
    if (!searcheText) {
      wx.showModal({
        title: '饭店搜索',
        content: '请输入你要搜索的饭店名称',
        showCancel: false
      });
      this.setData({
        searchText: ''
      });
      return;
    }
    searcheText = searcheText.replace(/\s+/g, '');
    // console.log(searcheText.length)
    if (!searcheText.length) {
      wx.showModal({
        title: '饭店搜索',
        content: '请输入你要搜索的饭店名称',
        showCancel: false
      });
      this.setData({
        searchText: ''
      });
      return;
    }
    var that = this;
    // 设置缓存
    for (var index in that.data.history) {
      // 搜索项已经存在
      if (that.data.history[index] === searcheText) {
        // console.log(index)
        that.setData({
          chooseHistory: index
        });
        that.search(that.data.history[index]);
        return;
      }
    }
    var history = that.data.history;
    // console.log(history)
    if (!history) {
      history = [searcheText];
      that.data.history = history;
    } else {
      var count = history.unshift(searcheText);
      if (count >= 10) {
        that.data.history.pop();
      }
    }
    this.setData({
      chooseHistory: 0,
      searchShow: true
    });
    this.search(searcheText);
    wx.setStorage({
      key: 'history',
      data: that.data.history,
      success: function success() {
        that.setData({
          history: wx.getStorageSync('history')
        });
      }
    });
  },

  /**
   * 键盘输入改变搜索结果
   */
  searchInput: function searchInput(e) {
    // console.log(e.detail.value)
    this.setData({
      searchText: e.detail.value
    });
  },

  /**
   * 搜索操作
   */
  search: function search(keyword) {
    var that = this;
    var obj = {
      url: useUrl.serviceUrl.search,
      data: {
        session_key: wx.getStorageSync('session_key'),
        keyword: keyword,
        longitude: wx.getStorageSync('userSite').longitude,
        latitude: wx.getStorageSync('userSite').latitude
      },
      success: function success(res) {
        // console.log(res)
        that.setData({
          search: true
        });
        if (res.data.data.length === 0) return;
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
  onLoad: function onLoad() {
    // 读取搜索历史
    var history = wx.getStorageSync('history');
    if (!history) {
      this.setData({
        searchShow: false
      });
    }
    this.setData({
      history: history
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
//# sourceMappingURL=search.js.map
