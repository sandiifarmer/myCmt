function Tip(text){
	this.container = $("#container");
	this.html =
	'<div class="tip-box">'
	+'	<div class="tip-mist"></div>'
	+'	<div class="tip-text center">'+ text +'</div>'
	+'</div>';
	this.time = 1500;
	this.flag = null;

	this.show();
}

Tip.prototype = {

	show : function(){
		var self = this;
		self.container.append(self.html);
		self.bind();
	},

	bind : function(){
		var self = this;
		self.flag = setTimeout(function(){
			self.hide();
		}, self.time);
		$(".tip-box").on("click", function(){
			self.hide();
			clearTimeout(self.flag);
		});
	},

	hide : function(){
		var self = this;
		$(".tip-box").remove();
	}
};