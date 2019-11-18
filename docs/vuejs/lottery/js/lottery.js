new Vue({
	el:"#app",
	data:{
	  isStart:1,	
	  score:10, //消耗积分
      list:[
	  	{img:'img/j1.png',title:'谢谢参与'},
		{img:'img/j2.png',title:'美女一个'},
		{img:'img/j1.png',title:'宝马一辆'},
		{img:'img/j2.png',title:'单车一辆'},
		{img:'img/j1.png',title:'鸡蛋一蓝'},
		{img:'img/j2.png',title:'500红包'},
		{img:'img/j1.png',title:'靓号一个'},
		{img:'img/j2.png',title:'鲜花一蓝'}
	  ],   //奖品1-9     
      index: -1,  // 当前转动到哪个位置，起点位置
      count: 8,  // 总共有多少个位置
      timer: 0,  // 每次转动定时器
      speed: 200,  // 初始转动速度
      times: 0,    // 转动次数
      cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,   // 中奖位置
      click: true,
      showToast: false, //显示中奖弹窗        
	},
	
	mounted(){},
	
	methods:{
		startLottery(){
			if (!this.click) { return }
			this.startRoll(); 
		},		
		// 开始转动
		startRoll () {
			this.times += 1 // 转动次数
			this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化 
			// 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
			if (this.times > this.cycle + 10 && this.prize === this.index) {
			  clearTimeout(this.timer)  // 清除转动定时器，停止转动
			  this.prize = -1
			  this.times = 0
			  this.speed = 200
			  this.click = true; 
			  var that = this;
			  setTimeout(res=>{
				that.showToast = true;
			  },500)			                  
			} else {
			  if (this.times < this.cycle) {
				this.speed -= 10  // 加快转动速度
			  } else if (this.times === this.cycle) { 
				const index = parseInt(Math.random() * 10, 0) || 0;  // 随机获得一个中奖位置
          		this.prize = index; //中奖位置,可由后台返回 
				if (this.prize > 7) { this.prize = 7 }
			  } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
				this.speed += 110
			  } else {
				this.speed += 20
			  }      
			  if (this.speed < 40) {this.speed = 40}
			  this.timer = setTimeout(this.startRoll, this.speed)
			}
		},

		// 每一次转动
		oneRoll () {
		  let index = this.index // 当前转动到哪个位置
		  const count = this.count // 总共有多少个位置
		  index += 1
		  if (index > count - 1) { index = 0 }
		  this.index = index
		},
	}	
	
})
