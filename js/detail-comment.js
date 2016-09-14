function DetailComment(cfg){
	this.container = $("#container");
	this.cfg = cfg;

	this.bind();
}

DetailComment.prototype = {

	bind : function(){
		var self = this;
		self.container.delegate("#detail-comment", "click", function(){
			var url = self.cfg.detailComment,
				visitor_openid = self.getOpenid(),
				questionid = $("#questionid").val();
			url += ("&visitor_openid=" + visitor_openid);
			url += ("&questionid=" + questionid);
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