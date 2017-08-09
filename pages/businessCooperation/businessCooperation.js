'use strict';

// 获取全局应用程序实例对象
// const app = getApp()
var tcity = require('../../utils/city');
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'businessCooperation',
    // 地区选择相关 -s
    provinces: [],
    province: '',
    citys: [],
    city: '',
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    // 地区选择相关 -e
    shopAddress: '添加地图标记',
    showMain: true,
    allHidden: false,
    hiddenMain: false,
    shenheText: '资质信息已提交，审核中......',
    // 图片上传
    addPicText: '立即上传',
    faceImg: '../../images/4.png',
    insideImg: '../../images/5.png',
    IdFaceImg: '../../images/6.png',
    licenseImg: '../../images/2.png',
    restaurantLicenseImg: '../../images/3.png',
    imgFilePath: {},
    upStatus: 0,
    license: [{ name: '营业执照', value: '营业执照', checked: 'true' }, { name: '特许证件', value: '特许证件' }],
    licenseTime: [{ name: '长期有效', value: '长期有效', checked: 'true' }, { name: '固定有效期', value: '固定有效期' }],
    restaurantLicenseTime: [{ name: '长期有效', value: '长期有效', checked: 'true' }, { name: '固定有效期', value: '固定有效期' }]
  },
  /**
   * 信息录入
   * @param e
   */
  inputMessage: function inputMessage(e) {
    var obj = {};
    obj[e.currentTarget.dataset.type] = e.detail.value;
    this.setData(obj);
  },

  /**
   * 执行下一步操作
   */
  //
  //
  nextStep2: function nextStep2() {
    if (!this.data.xkzAddress || !this.data.xkzNumber || !this.data.xkzName || !this.data.zzAddress || !this.data.zzNumber || !this.data.zzName || !this.data.frIdNumber || !this.data.frName || this.data.IdFaceImg.indexOf('wxfile') === -1 || this.data.licenseImg.indexOf('wxfile') === -1 || this.data.restaurantLicenseImg.indexOf('wxfile') === -1) {
      return wx.showModal({
        title: '抱歉',
        content: '请补全资质信息，再进行下一步操作',
        showCancel: false
      });
    }
    var newShopInfo = wx.getStorageSync('newShopInfo');
    newShopInfo.frName = this.data.frName;
    newShopInfo.frIdNumber = this.data.frIdNumber;
    newShopInfo.shopLicense = this.data.shopLicense;
    newShopInfo.shopLicenseTime = this.data.shopLicenseTime;
    newShopInfo.shopServiceLicenseTime = this.data.shopServiceLicenseTime;
    newShopInfo.zzName = this.data.zzName;
    newShopInfo.zzNumber = this.data.zzNumber;
    newShopInfo.zzAddress = this.data.zzAddress;
    newShopInfo.xkzName = this.data.xkzName;
    newShopInfo.xkzNumber = this.data.xkzNumber;
    newShopInfo.xkzAddress = this.data.xkzAddress;
    wx.setStorageSync('newShopInfo', newShopInfo);
    // todo 上传资料和图片
    // console.log(this.data.imgFilePath)
    // for(var item in this.data.imgFilePath) {
    // let path = this.data.imgFilePath[item]
    // console.log(item + ':' +path)
    // wx.uploadFile({
    //   url: '.......',
    //   filePath: path,
    //   name: item,
    //   success () {
    //
    //   }
    // })
    // }
    // wx.request({
    //
    // })
    this.setData({
      allHidden: true
    });
  },

  /**
   * 单项选择设置
   * @param e
   */
  radioChange: function radioChange(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    // console.log(e)
    if (e.currentTarget.dataset.type === 'license') {
      this.setData({
        shopLicense: e.detail.value
      });
    } else if (e.currentTarget.dataset.type === 'licensetime') {
      this.setData({
        shopLicenseTime: e.detail.value
      });
    } else {
      this.setData({
        shopServiceLicenseTime: e.detail.value
      });
    }
  },

  /**
   * 选择地区
   * @param e
   */
  bindChange: function bindChange(e) {
    // console.log(e);
    var val = e.detail.value;
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] !== t[0]) {
      console.log('province no ');
      var citys = [];
      var countys = [];

      for (var i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name);
      }
      for (var _i = 0; _i < cityData[val[0]].sub[0].sub.length; _i++) {
        countys.push(cityData[val[0]].sub[0].sub[_i].name);
      }
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      });
      return;
    }
    if (val[1] !== t[1]) {
      console.log('city no');
      var _countys = [];
      for (var _i2 = 0; _i2 < cityData[val[0]].sub[val[1]].sub.length; _i2++) {
        _countys.push(cityData[val[0]].sub[val[1]].sub[_i2].name);
      }
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: _countys,
        values: val,
        value: [val[0], val[1], 0]
      });
      return;
    }
    if (val[2] !== t[2]) {
      // console.log('county no')
      this.setData({
        county: this.data.countys[val[2]],
        values: val,
        value: [val[0], val[1], val[2]]
      });
      return;
    }
  },
  /**
   * 地区显示开关
   */
  open: function open() {
    this.setData({
      condition: !this.data.condition
    });
  },
  /**
   * 添加店铺图片
   */
  addPic: function addPic() {
    this.setData({
      showMain: false
    });
  },

  /**
   * 选择地址
   */
  addMapSite: function addMapSite() {
    var that = this;
    wx.chooseLocation({
      success: function success(res) {
        // console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          shopAddress: res.name || res.address || '添加地图标记'
        });
      }
    });
    // todo 添加地址后展示地址
  },

  /**
   * 保存上传后的店铺图片
   */
  saveShopImg: function saveShopImg() {
    this.setData({
      showMain: true
    });
    if (this.data.upStatus === 1) {
      this.setData({
        addPicText: '重新上传图片'
      });
    }
  },

  /**
   * 上传门脸图
   */
  upFacePic: function upFacePic(e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function success(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];
        // console.log(tempFilePaths)
        if (e.currentTarget.dataset.shop === 'faceImg') {
          that.data.imgFilePath.faceImg = tempFilePaths;
          that.setData({
            faceImg: tempFilePaths,
            imgFilePath: that.data.imgFilePath
          });
        } else if (e.currentTarget.dataset.shop === 'insideImg') {
          that.data.imgFilePath.insideImg = tempFilePaths;
          that.setData({
            insideImg: tempFilePaths,
            imgFilePath: that.data.imgFilePath
          });
        } else if (e.currentTarget.dataset.shop === 'IdFaceImg') {
          that.data.imgFilePath.IdFaceImg = tempFilePaths;
          that.setData({
            IdFaceImg: tempFilePaths,
            imgFilePath: that.data.imgFilePath
          });
        } else if (e.currentTarget.dataset.shop === 'licenseImg') {
          that.data.imgFilePath.licenseImg = tempFilePaths;
          that.setData({
            licenseImg: tempFilePaths,
            imgFilePath: that.data.imgFilePath
          });
        } else if (e.currentTarget.dataset.shop === 'restaurantLicenseImg') {
          that.data.imgFilePath.restaurantLicenseImg = tempFilePaths;
          that.setData({
            restaurantLicenseImg: tempFilePaths,
            imgFilePath: that.data.imgFilePath
          });
        }
        that.setData({
          upStatus: 1
        });
      }
    });
  },

  /**
   * 显示资质信息
   */
  nextStep: function nextStep() {
    if (this.data.shopAddress === '添加地图标记' || this.data.insideImg.indexOf('wxfile') === -1 || this.data.faceImg.indexOf('wxfile') === -1 || !this.data.addressDetail || !this.data.lxrName || !this.data.lxrPhone) {
      return wx.showModal({
        title: '抱歉',
        content: '请补全相关信息，再进行下一步操作',
        showCancel: false
      });
    }
    var newShopInfo = wx.getStorageSync('newShopInfo');
    newShopInfo.shopAreaAddress = this.data.province + this.data.city + this.data.county;
    newShopInfo.shopDetailAddress = this.data.addressDetail;
    newShopInfo.shopMapLatitude = this.data.latitude;
    newShopInfo.shopMapLongitude = this.data.longitude;
    newShopInfo.shopLxrName = this.data.lxrName;
    newShopInfo.shopLxrPhone = this.data.lxrPhone;
    wx.setStorageSync('newShopInfo', newShopInfo);
    this.setData({
      hiddenMain: true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(e) {
    // TODO: onLoad
    // 2 表示审核通过
    if (e.shopStatus === '2') {
      return this.setData({
        allHidden: true,
        shenheText: '恭喜您通过审核了'
      });
    }
    // 1表示审核处理中
    if (e.shopStatus === '1') {
      return this.setData({
        allHidden: true,
        shenheText: '请耐心等待，您的审核正在处理中'
      });
    }
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    var provinces = [];
    var citys = [];
    var countys = [];
    for (var i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    // console.log('省份完成')
    for (var _i3 = 0; _i3 < cityData[0].sub.length; _i3++) {
      citys.push(cityData[0].sub[_i3].name);
    }
    // console.log('city完成')
    for (var _i4 = 0; _i4 < cityData[0].sub[0].sub.length; _i4++) {
      countys.push(cityData[0].sub[0].sub[_i4].name);
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    });
    // console.log('初始化完成')
    console.log(e);
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
//# sourceMappingURL=businessCooperation.js.map
