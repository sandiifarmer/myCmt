function DeleteComment(cfg){
	this.container = $("#container");
	this.cfg = cfg;

	this.bind();
}

DeleteComment.prototype = {

	bind : function(){
		var self = this;
		self.container.delegate(".detail-del", "click", function(e){
			new Confirm("确定删除本条评论吗？", function(result){
				if(!result) return;
				self.doDelete(e);
			});			
		});
	},

	doDelete : function(e){
		var self = this
			btn = $(e.currentTarget),
			commentid = btn.attr("data-commentid"),
			visitor_openid = self.getOpenid(),
			url = self.cfg.deleteComment;
		url += ("&commentid=" + commentid);
		url += ("&visitor_openid=" + visitor_openid);
		$.getJSON(url, function(data){
			if(data.code == 200){
				new Tip("删除成功！");
				btn.parent().remove();
			}else{
				new Tip("删除失败，请再试一次");
			}
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