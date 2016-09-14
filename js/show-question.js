function ShowQuestion(cfg){
	this.container = $("#container");
	this.cfg = cfg;

	this.bind();
}

ShowQuestion.prototype = {

	bind : function(){
		var self = this;
		self.container.delegate("#show-question", "click", function(){
			var url = self.cfg.showQuestion,
				visitor_openid = self.getOpenid()
			url += ("&visitor_openid=" + visitor_openid);
			location.href = url;
		});
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