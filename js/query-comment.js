function QueryComment(cfg){
	this.container = $("#container");
	this.visitor_openid = this.getOpenid();
	this.questionid = $("#questionid").val();
	this.box = $("#detail-box");
	this.cfg = cfg;
	this.pageno = 2;

	this.min = 60 * 1000;
	this.hour = 60 * this.min;
	this.day = 24 * this.hour;
	this.month = 30 * this.day;
	this.year = 12 * this.month;

	this.bind();	
}

QueryComment.prototype = {

	bind : function(){
		var self = this;
		self.container.delegate("#detail-more", "click", function(e){
			var url = self.cfg.queryComment;
			url += ("&pageno=" + self.pageno);
			url += ("&questionid=" + self.questionid);
			$.getJSON(url, function(data){
				if(data.code != 200){
					new Tip("加载数据失败，请再试一次");
				}else{
					self.render(data);
				}
			});
		});
	},

	render : function(data){
		var self = this,			
			arr = data.comment,
			len = arr.length;
		for(var i = 0; i < len; i++){
			self.renderSingle(arr[i], data.openid);
		}
		if(data.totalpage == self.pageno){
			$("#detail-more").hide();
		}else{
			self.pageno++;
		}
	},

	renderSingle : function(dat, hostOpenid){
		var self = this,
			timeStr = self.getTimeStr(dat.create_time * 1000);
		if(hostOpenid == self.visitor_openid || dat.openid == self.visitor_openid){
			var delClass = "";
		}else{
			var delClass = "hide";
		}

		var	html =
			'<div class="detail-one">'
			+'	<div class="detail-line"></div>'
			+'	<div class="detail-time">'+ timeStr +'</div>'
			+'	<div class="detail-pic">'
			+'		<img src="'+ dat.headimgurl +'">'
			+'	</div>'
			+'	<div class="detail-name">'+ dat.nickname +' 发布</div>'
			+'	<div class="detail-del '+ delClass +'" data-commentid="'+ dat.commentid +'">删除</div>'
			+'	<div class="detail-text">'+ dat.comment +'</div>'
			+'</div>';
		self.box.append(html);
	},

	getTimeStr : function(t){
		var self = this,
			now = new Date().getTime(),
			delta = now - t;
		if(delta < self.min) return "刚才";
		if(delta < self.hour) 
			return Math.floor(delta / self.min) + "分钟前"
		if(delta < self.day) 
			return Math.floor(delta / self.hour) + "小时前"
		if(delta < self.month) 
			return Math.floor(delta / self.day) + "天前"
		if(delta < self.year) 
			return Math.floor(delta / self.month) + "月前"
		return Math.floor(delta / self.year) + "年前"
	},

	getOpenid : function(){
		var self = this,
			visitor_openid = "";
		visitor_openid = $.fn.cookie("visitor_openid");
		if(visitor_openid) return visitor_openid;

		var	hidden = $("#visitor_openid");
		if(hidden.length){
			visitor_openid = hidden.val();
			// $.fn.cookie("visitor_openid", visitor_openid, { expires: 1000 });
			return visitor_openid;
		}
		return "";
	}

};