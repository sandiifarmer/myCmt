function Confirm(text, callback){
	this.container = $("#container");
	this.callback = callback;
	this.html =
	'<div class="confirm-box">'
	+'	<div class="confirm-mist"></div>'
	+'	<div class="confirm-wrap center">'
	+'		<div class="confirm-row">'+ text +'</div>'
	+'		<div class="confirm-row">'
	+'			<div class="confirm-sep"></div>'
	+'			<div class="confirm-btn" data-action="confirm">确认</div>'
	+'			<div class="confirm-btn" data-action="cancel">取消</div>'
	+'		</div>'
	+'	</div>'
	+'</div>';

	this.show();
}

Confirm.prototype = {

	show : function(){
		var self = this;
		self.container.append(self.html);
		self.bind();
	},

	bind : function(){
		var self = this;
		$(".confirm-btn").on("click", function(e){
			var btn = $(e.currentTarget),
				action = btn.attr("data-action"),
				rs1 = (action == "confirm") ? true : false,
				rs2 = self.callback.call(self, rs1);
			if(!rs1 || rs2 === undefined) self.hide();
		});
	},

	hide : function(){
		var self = this;
		$(".confirm-box").remove();
	}

};