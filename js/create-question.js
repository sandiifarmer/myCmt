function CreateQuestion(cfg){
	this.container = $("#container");
	this.cfg = cfg;

	this.bind();
	this.pick();
}

CreateQuestion.prototype = {

	bind : function(){
		var self = this;
		self.container.delegate("#create-question", "click", function(){
			var question = $("#question-input").val().replace(/(^\s*)|(\s*$)/g,"");
			if(!question) return;
			if(question.length > 18){
				new Tip("问题不得多于18字");
				return;
			}

			$.fn.cookie("share-mask", "1");

			var url = self.cfg.createQuestion,
				visitor_openid = self.getOpenid();
			url += ("&visitor_openid=" + visitor_openid);
			url += ("&question=" + question);
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
	},

	pick : function(){
		var self = this;
		self.container.delegate(".ask-entry", "click", function(e){
			var btn = $(e.currentTarget);
			$("#question-input").val(btn.text());
			
			if(btn.hasClass("checked")) return;
			var checked = $(".ask-entry").filter(".checked");
			if(checked && checked.length) checked.removeClass("checked");
			btn.addClass("checked");
		});
	}
};