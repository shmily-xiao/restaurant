'use strict';

/*eslint-disable*/
var baseUrl = 'http://diancan.j8j0.com/api';
var serviceUrl = {
  // 用户登陆 get
  login: baseUrl + '/user/login',
  // 升级用户信息 post {iv, encryptedData, session_key}
  updateUserInfo: baseUrl + '/user/updateUserInfo',
  // 获取用户信息 post {session_key}
  getUserInfo: baseUrl + '/user/getUserinfo',
  // 用户地理位置 post {session_key, latitude, longitude}
  weizhi: baseUrl + '/user/weizhi',
  // 消息
  mation: baseUrl + '/user/mation',
  // 用户积分信息
  jifen: baseUrl + '/user/jifen',
  // 获取热门商店 post {session_key}
  hot_shop: baseUrl + '/shop/hot_shop',
  // 获取附近商家 post {session_key, longitude, latitude}
  fujin_shop: baseUrl + '/shop/fujin_shop',
  // 搜索商家 post {session_key, keyword}
  search: baseUrl + '/shop/search',
  // 商家优惠券显示 post {session_key, s_id}
  coupons: baseUrl + '/shop/coupons',
  // 领取优惠券 post {session_key, s_id, cou_id}
  coupons_detail: baseUrl + '/shop/coupons_detail',
  // 获取商家信息 post {session_key, s_id}
  shop_info: baseUrl + '/shop/shop_info',
  // 排队取号 post {session_key, s_id, size}
  quhao: baseUrl + '/shop/quhao',
  // 商家排队信息 post {session_key, s_id}
  xiangqing: baseUrl + '/shop/xiangqing',
  //商家服务
  fuwu: baseUrl + '/shop/fuwu',
  // 排队接口
  paidui_shop: baseUrl + '/shop/paidui_shop',
  // 预定接口
  yuding_shop: baseUrl + '/shop/yuding_shop',
  // 获取用户排队信息 post {session_key, s_id}
  queue: baseUrl + '/queue/queue',
  // 取消排队 post {session_key, s_id, id}
  quxiao_queue: baseUrl + '/queue/quxiao_queue',
  // 获取用户的全部排队号
  queue_num: baseUrl + '/queue/queue_num',
  // 订单提交 post {session_key, s_id, order_price, u_desc, dishes}
  post_order: baseUrl + '/order/post_order',
  // 全部订单 post {session_key}
  order: baseUrl + '/order/order',
  // 订单详情 post {session_key, shop_id, o_id}
  order_info: baseUrl + '/order/order_info',
  // 获取用户已有优惠券 post {seesion_key, status}
  coupons_num: baseUrl + '/coupons/coupons_num',
  // 获取所有优惠券
  getCouDetail: baseUrl + '/coupons/getCouDetail',
  // 兑换优惠券
  cou_convert: baseUrl + '/coupons/cou_convert',
  // 用户点击标签评论 post {session_key, s_id, userid, level, l_id}
  post_label_comment: baseUrl + '/comment/post_label_comment',
  // 用户标签评论统计 post {session_key, s_id}
  user_flow_comment: baseUrl + '/comment/user_flow_comment',
  // 用户评论 post {session_key, s_id, level, o_id, desc}
  post_comment: baseUrl + '/comment/post_comment',
  // 首页轮播图 post {session_key}
  ad: baseUrl + '/ad/ad',
  // 店铺轮播图 post {session_key, s_id}
  shop_ad: baseUrl + '/ad/shop_ad',
  // 上传图片
  upPhoto: baseUrl + '/photo'
};
module.exports = {
  serviceUrl: serviceUrl
};
//# sourceMappingURL=service.js.map
