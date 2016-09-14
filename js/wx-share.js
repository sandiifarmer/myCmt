function WXShare(cfg, url){
	this.cfg = cfg;
	this.url = url;

	this.getSignature();
}

WXShare.prototype = {

	getSignature : function(){
		var self = this,
			u = self.cfg.getSignature,
			noncestr = "imp_hicamelia",
			timestamp = Math.floor(new Date().getTime() / 1000),
			url = encodeURIComponent( location.href.split('#')[0] );
		if(!u) return;
		u += ("?noncestr=" + noncestr);
		u += ("&timestamp=" + timestamp);
		u += ("&url=" + url);
		$.get(u, function(data){
			data = eval("("+ data +")");
			if(data.code == 200 && data.signature){
				self.init(timestamp, noncestr, data.signature);
			}else{
				// alert("get signature fail..");
			}
		});
	},

	init : function(t, n, s){
		var self = this;
		wx.config({
		    debug: false,
		    appId : "wxeb6dc55b6be73f95",
		    timestamp: t,
		    nonceStr: n,
		    signature: s,
		    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","wx.onMenuShareQQ"]
		});
		wx.ready(function(){
			self.run();
		});
	},

	run : function(){
		var self = this,
			question = $(".reply-question").text(),
			name = $(".user-icon").siblings("span").text();
		
		if(question){
			var title = name +" : "+ question;
		}else{
			var title = $("title").text();
		}

		var	link = self.url || location.href,
			imgUrl = $(".user-icon").children("img").attr("src"); 

		wx.onMenuShareTimeline({
		    title: title,
		    link: link,
		    imgUrl: imgUrl,
		    success: function () { 
		        new Qrcode(window.cfg);
		    },
		    cancel: function () { 
		        new Qrcode(window.cfg);
		    }
		});
		wx.onMenuShareAppMessage({
			title: title,
			desc: '',
		    link: link,
		    imgUrl: imgUrl,
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function(){
		    	new Qrcode(window.cfg);
		    },
		    cancel: function(){
		    	new Qrcode(window.cfg);
		    }
		});
		wx.onMenuShareQQ({
		    title: title,
		    desc: '',
		    link: link,
		    imgUrl: imgUrl,
		    success: function (){
		    	new Qrcode(window.cfg);
		    },
		    cancel: function (){
		    	new Qrcode(window.cfg);
		    }
		});
	}
};