const app = getApp();
Page({
  data: {
    tradestatuslist: [
      { title: "待发货" }, { title: "已发货" }, { title: "已签收" }, { title: "全部" }
    ],
    tradestatus: 0,
    user: null,
    message: "abc",
    page_no: 1,
    tradelist: [],
    totaltrade: 0,
    has_next: false,
    showpop: false,
    text: "",
    onetrade: {},
  },
  async onLoad(query) {
    // 页面加载
    try {
      var user = await app.getUserInfo();
      this.setData({ user, message: JSON.stringify(user) });
      this.loadtrade();
    } catch (res) {
      this.setData({ message: JSON.stringify(res) });
      console.log("err")
    }

    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '打印助手',
      desc: '打印助手_一键打印',
      path: 'pages/index/index',
    };
  },
  tradestaustuschange({ index }) {
    this.setData({ tradestatus: index });
    this.loadtrade();
  },
  cl() {
    my.authorize({
      scopes: '*',
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
    });


  },
  bl() {


    this.setData({ tradestatus: 2 });

  },
  async loadtrade(samestatus) {
    if (!samestatus) {
      this.data.page_no = 0;
    }
    my.showLoading({ content: "正在加载订单……" });
    var t = await this.tradesget(this.data.tradestatus);
    my.hideLoading();

    if (!t) {
      this.setData({ tradelist: [], totaltrade: 0 });
      this.setData({ message: "null" });
      return;
    }

    //this.setData({message:JSON.stringify(t)});
    this.data.has_next = t.has_next;
    if (!samestatus) {
      if ("trades" in t) {
        this.data.totaltrade = t.trades.length;
        this.data.tradelist = t.trades;
      }
      else {
        this.data.totaltrade = 0;
        this.data.tradelist = [];
      }

    }
    else {
      this.data.totaltrade += t.trades.length;
      this.data.tradelist = this.data.tradelist.concat(t.trades);
    }
    this.setData(this.data);


  },
  async tradesget(staus) {
    try {

      var s = ["WAIT_SELLER_SEND_GOODS", "WAIT_BUYER_CONFIRM_GOODS", "TRADE_FINISHED", "ALL_TRADE"][staus];
      const result = await app.cloud.topApi.invoke({
        api: 'taobao.trades.sold.get',
        data: {
          "page_no": this.data.page_no,
          "status": s,
          "use_has_next": true,
          'fields': 'tid,type,status,orders,payment,post_fee,receiver_name, receiver_state, receiver_city,receiver_district, receiver_address, receiver_zip, receiver_mobile, receiver_phone,buyer_message,seller_memo,seller_flag,buyer_nick',
          "type": "guarantee_trade,auto_delivery,ec,cod,step,nopaid,hopex_trade,netcn_trade,external_trade,b2c_cod,tmall_i18n",
        },
        autoSession: true,

      });
      //return { success: true, data: result };
      return result
    } catch (e) {
      return null;
    }
  },
  async testTopApi() {
    try {

      const result = await app.cloud.topApi.invoke({
        api: 'taobao.trades.sold.get',
        data: {
          "page_no": this.data.page_no,
          'fields': 'tid,type,status,orders,payment,post_fee,receiver_name, receiver_state, receiver_city,receiver_district, receiver_address, receiver_zip, receiver_mobile, receiver_phone,buyer_message,seller_memo,seller_flag',
          "type": "guarantee_trade,auto_delivery,ec,cod,step,nopaid,hopex_trade,netcn_trade,external_trade,b2c_cod,tmall_i18n",
        },
        autoSession: true,

      });
      //return { success: true, data: result };
      my.alert({ content: JSON.stringify(result) })
    } catch (e) {
      my.alert({ content: 'error ' + e.message })
    }
  },
  async fulltradeget(tid) {
    try {

      const result = await app.cloud.topApi.invoke({
        api: 'taobao.trade.fullinfo.get',
        data: {
          "tid": tid,
          'fields': 'tid,type,status,orders,payment,post_fee,receiver_name, receiver_state, receiver_city,receiver_district, receiver_address, receiver_zip, receiver_mobile, receiver_phone,buyer_message,seller_memo,seller_flag,buyer_nick,discount_fee,created,pay_time,delivery_time,collect_time,dispatch_time,sign_time,delivery_cps,has_post_fee',

        },
        autoSession: true,

      });
      //return { success: true, data: result };
      return result
    } catch (e) {
      return null;
    }
  },
  nexpage() {
    this.data.page_no++;
    this.loadtrade(true);
  },
  async onInfo(data, index) {
    var r = await this.fulltradeget(data.trade.tid);
    //my.alert({ content: JSON.stringify(r.trade) });
    if (!r) {
      return;
    }

    this.setData({ showpop: true, text: "info", onetrade: r.trade });
  },
  async onWuliu(data, index) {
    try {

      var s = ["WAIT_SELLER_SEND_GOODS", "WAIT_BUYER_CONFIRM_GOODS", "TRADE_FINISHED", "ALL_TRADE"][staus];
      const result = await app.cloud.topApi.invoke({
        api: 'taobao.logistics.trace.search',
        data: {
          tid: data.trade.tid
        },
        autoSession: true,

      });
      if ("error_response" in result) {
        my.alert({ title: "出错了", content: result.error_response.msg + error_response.sub_msg });
        return;
      }

    } catch (e) {
      return null;
    }
    this.setData({ showpop: true, text: "wuliu" });
  },
  onFahuo(data, index) {
    this.setData({ showpop: true, text: "fahuo" });
  },
  onclosepop(data) {
    this.setData({ showpop: false });
  },


});
