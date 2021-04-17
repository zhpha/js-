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
    datatrade: {
      status: statustext,
      ico: ["gray", "red", "yellow", "green", "blue", "violet"]
    },
    index: 0,
    onFahuo: () => { },
    onWuliu: () => { },
    onInfo: () => { },
  },
  props: { trade: {} },
  onInit() {

  },
  didMount() {
  },
  didUpdate() { },
  didUnmount() { },
  methods: {},
});
