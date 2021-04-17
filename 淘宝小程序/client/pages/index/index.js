const app = getApp();
Page({
  data:{
    tradestatuslist:[
      {title:"待发货"},{title:"已发货"},{title:"已签收"},{title:"全部"}
    ],
    tradestatus:0,
    user:null,
    message:"abc"
  },
  onLoad(query) {
    // 页面加载
    app.getUserInfo().then(  user =>{
      this.setData({  user ,message:JSON.stringify(user)});
      
    } ).catch((res)=>{
      this.setData({message:JSON.stringify(res)});
      console.log("err")
      }); 
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
  },
  cl()
  {
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


    this.setData({ tradestatus:2 });

  },
  async testTopApi(){
    try {
      
      const result = await app.cloud.topApi.invoke({
        api: 'taobao.trades.sold.get',
        data: {
         
          'fields': 'tid,type,status'
        },
        autoSession: true,

      });
      //return { success: true, data: result };
      my.alert({ content: 'error ' + JSON.stringify(result) })
    } catch (e) {
      my.alert({ content: 'error ' + e.message })
    }
  } 

});
