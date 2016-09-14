function CreateComment(cfg){
	this.container = $("#container");
	this.box = $("#reply-box");
	this.cfg = cfg;
	this.valve = true;

	this.bind();
	this.pick();
}

CreateComment.prototype = {

	bind : function(){
		var self = this;
		self.container.delegate("#reply-btn", "click", function(e){
			if(!self.valve) return;
			self.valve = false;
			var btn = $(e.currentTarget),
				input = btn.siblings("input"),
				comment = input.val().replace(/(^\s*)|(\s*$)/g,"");
			if(!comment) return;
			if(comment.length > 10){
				new Tip("回复不得多于10个字");
				self.valve = true;
				return;
			}
			self.request(comment);
		});			
	},

	request : function(comment){
		var self = this;
		var headimgurl = $("#visitor_headimgurl").val(),
			visitor_openid = self.getOpenid(),
			questionid = $("#questionid").val(),
			url = self.cfg.createComment;
		url += ("&visitor_openid=" + visitor_openid);
		url += ("&questionid=" + questionid);
		url += ("&comment=" + comment);

		if(!visitor_openid){
			$.fn.cookie("comment-content", comment);
			location.href = url;
		}else{
			$.fn.cookie("comment-content", null);
		}
		
		$.get(url, function(data){
			data = eval('('+ data +')');
			if(data.code == 200){
				$("#comment-input").val("");
				self.render(comment, headimgurl);
				setTimeout(function(){
					new Launch( headimgurl );
				}, 2000);			
			}else{
				new Tip("评论失败，请再试一次");
			}
			self.valve = true;
		});
	},

	pick : function(){
		var self = this;
		self.container.delegate(".sample", "click", function(e){
			var btn = $(e.currentTarget);
			$("#comment-input").val(btn.text());
		});
	},

	render : function(comment, headimgurl){
		var self = this,
			len = comment.length;
		if(len <= 3){
			var sizeClass = "comment-50",
				height = 40;	
		}else if(len <= 6){
			var sizeClass = "comment-40",
				height = 35;
		}else{
			var sizeClass = "comment-30",
				height = 30;
		}

		var	style = 'style="top:'+ self.box.height() +'px; left:100px;"',
			html =
			'<span class="comment trans1 '+ sizeClass +'" '+ style +'>'
			+'	<span class="comment-text">'+ comment +'</span>'
			+'	<span class="comment-icon">'
			+'		<img src="'+ headimgurl +'">'
			+'	</span>'
			+'</span>';
		self.box
			.append(html)
			.css({height : self.box.height() + height + 3});

		var replyNum = $(".reply-num");
		replyNum.text( parseInt( replyNum.text() ) + 1 );

		self.anim();
	},

	anim : function(){
		var self = this,
			comments = $(".comment"),
			last = comments.last(),
			len = comments.length;
		if(len == 1){
			last.css({top : self.box.height() / 2 - 25});
			return;
		}
		var second = last.prev(),
			secondLeft = parseInt( second.css("left") ),			
			w = last.width(),
			l = (self.container.width() - w) * Math.random();
		if(secondLeft < 100){
			l /= 3;
			l = self.container.width() - w - l;
		}else{
			l /= 3;
		}
		last.css({left : l});

		var secondTop = parseInt( second.css("top") ),
			secondHeight = second.height(),
			t = secondTop + secondHeight + 3;
		last.css({top : t});
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