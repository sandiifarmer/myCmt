function Scatter(arr){
	this.container = $("#container");
	this.box = $("#reply-box");

	this.run(arr);
	this.moreReply();
}

Scatter.prototype = {

	run : function(arr){
		var self = this;
		if(!arr || !arr.length) return;
		// for(var i = 0; i < arr.length * 2; i++){
		// 	self.arrShuffle(arr);
		// }
		self.render(arr);
	},

	arrShuffle : function(arr){
		var self = this,
			len = arr.length,
			random = Math.floor(len * Math.random()),
			mirror = len - 1 - random,
			temp = arr[random];
		arr[random] = arr[mirror];
		arr[mirror] = temp;
	},

	render : function(arr){
		var self = this,
			len = arr.length;
		for(var i = 0; i < len; i++){
			self.renderSingle(arr[i]);
		}
		setTimeout(function(){
			self.honrizontal();
			self.vertical();
		}, 500);
	},

	renderSingle : function(dat, style, more){
		var self = this,
			style = style ? style : "",
			len = dat.comment.length;
		if(len <= 3)
			var sizeClass = "comment-50";	
		else if(len <= 6)
			var sizeClass = "comment-40";
		else
			var sizeClass = "comment-30";

		if(more) sizeClass += " comment-added";

		var	html =
			'<span class="comment trans05 '+ sizeClass +'" '+ style +'>'
			+'	<span class="comment-text">'+ dat.comment +'</span>'
			+'	<span class="comment-icon">'
			+'		<img src="'+ dat.headimgurl +'">'
			+'	</span>'
			+'</span>';
		self.box.append(html);
	},

	gblen : function(str){    
	    var len = 0;    
	    for(var i=0; i<str.length; i++) {    
	        if (str.charCodeAt(i)>127||str.charCodeAt(i)==94) {    
	            len += 2;
	        }else{
	            len ++;    
	        }    
	    }    
	    return len;    
	},

	honrizontal : function(){
		var self = this,
			els = $(".comment"),
			len = els.length,
			top = 0;
		for(var i = 0; i < len; i++){
			var el = $(els[i]),
				w = el.width(),
				l = (self.container.width() - w) * Math.random();
			if(i % 2){
				l /= 3;
				l = self.container.width() - w - l;
			}else{
				l /= 3;
			}
			el.css({left : l});
		}
	},

	vertical : function(){
		var self = this,
			els = $(".comment"),
			len = els.length,
			totalH = 0;
		for(var i = 0; i < len; i++){
			totalH += $(els[i]).height();
			totalH += 3;
			// totalH += (2 * Math.random() + 2);
		} 
		var top = (self.box.height() - totalH) / 2;
		for(var i = 0; i < len; i++){
			var el = $(els[i]),
				h = el.height(),
				t = top,
				marginTop = 3;
				// marginTop = 5 * Math.random() + 2;
			top += h;
			top += marginTop;
			el.css({top : t});
		}
	},

	moreReply : function(){
		var self = this;
		self.container.delegate("#reply-more", "click", function(e){
			$(e.currentTarget).hide();
			var span = $("#reply-all").children("span"),
				len = span.length;
			if(!len) return;

			var	arr = [];
			for(var i = 0; i < len; i++){
				var dat = {};
				dat.comment = $(span[i]).text();
				dat.headimgurl = $(span[i]).attr("data-headimgurl");
				arr.push(dat);
			}
			for(var i = 0; i < len * 2; i++)
				self.arrShuffle(arr);
			self.renderMore(arr);
		});
	},

	renderMore : function(arr){
		var self = this;

		var box = $("reply-box"),
			boxHeight = box.height();
		box.css({height : boxHeight + 50});

		var	len = arr.length,
			style = 'style="top:'+ boxHeight +'px;"';
		for(var i = 0; i < len; i++){
			self.renderSingle(arr[i], style, "more");
		}
		self.setBoxHeight(arr);
		setTimeout(function(){
			self.honrizontal();
			self.vertical();
			box.css({height : box.height() + 50});
		}, 500);
	},

	setBoxHeight : function(arr){
		var self = this,
			addedHeight = 0;
		for(var i = 0; i < arr.length; i++){
			var len = arr[i].comment.length;
			if(len <= 4)
				addedHeight += 40;
			else if(len <= 10)
				addedHeight += 35;
			else
				addedHeight += 30;
			addedHeight += 7
		}
		var box = $("#reply-box");
		box.css({height : box.height() + addedHeight});
	}
};

