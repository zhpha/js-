const statustext = {
  "TRADE_NO_CREATE_PAY": "没有创建支付宝交易",
  "WAIT_BUYER_PAY": "等待买家付款",
  "WAIT_SELLER_SEND_GOODS": "等待卖家发货",
  "SELLER_CONSIGNED_PART": "卖家部分发货",
  "WAIT_BUYER_CONFIRM_GOODS": "卖家已发货",
  "TRADE_BUYER_SIGNED": "买家已签收",
  "TRADE_FINISHED": "交易成功",
  "TRADE_CLOSED": "交易关闭",
  "TRADE_CLOSED_BY_TAOBAO": "交易被淘宝关闭",
  "ALL_WAIT_PAY": "未付款",
  "ALL_CLOSED": "交易关闭",
  "NOSTATUS": "状态未知"
};
Component({
  mixins: [],
  data: {
    datatrade: { status: statustext },
    index: 0,
    onFahuo: () => { },
    onWuliu: () => { },
    onInfo: () => { },
  },
  props: { trade: {} },
  onInit() {

  },
  didMount() {
    //this.data.datatrade.status = statustext[this.props.trade.status];
    //this.setData(this.data);
  },
  didUpdate() {
  },
  didUnmount() { },
  methods: {
    info() {
      this.props.onInfo({ trade: this.props.trade, datatrade: this.data.datatrade }, this.props.index);
    },
    wuliu() {
      this.props.onWuliu({ trade: this.props.trade, datatrade: this.data.datatrade }, this.props.index);
    },
    fahuo() {
      this.props.onFahuo({ trade: this.props.trade, datatrade: this.data.datatrade }, this.props.index);
    },
    addr() {
      my.qn.openChat({
        nick: "cntaobao:" + this.props.trade.buyer_nick, text: `请核对地址：${this.props.trade.receiver_name}  ${this.props.trade.receiver_mobile}  ${this.props.trade.receiver_phone ? this.props.trade.receiver_phone : ""}
      ${this.props.trade.receiver_state} ${this.props.trade.receiver_city} ${this.props.trade.receiver_district} ${this.props.trade.receiver_address} 
      `})
    },
    toastaddr() {
      my.showToast({ content: "长按可复制地址" });
    },
    copyaddr() {
      my.setClipboard({
        text: `${this.props.trade.receiver_name}  ${this.props.trade.receiver_mobile}  ${this.props.trade.receiver_phone}
      ${this.props.trade.receiver_state} ${this.props.trade.receiver_city} ${this.props.trade.receiver_district} ${this.props.trade.receiver_address}`
      });
      my.showToast({ content: "已复制" });
    },
    toastid() {
      my.showToast({ content: "长按可复制订单号" });
    },
    copytid() {
      my.setClipboard({
        "text": this.props.trade.tid,
      });
      my.showToast({ content: "已复制" });
    }
  },
});
