function Launch(visitor_headimgurl){
	this.container = $("#container");
	this.icon = $(".user-icon");
	this.host = this.icon.children("img").attr("src");
	this.name = this.icon.siblings("span").text();
	this.guest = visitor_headimgurl;
	this.html =
	'<div class="launch-box">'
	+'	<div class="launch-mist"></div>'
	+'	<div class="launch-wrap center">'
	+'		<div class="launch-inner">'
	+'			<div class="launch-host">'
	+'				<img src="'+ this.host +'">'
	+'			</div>'
	+'			<div class="launch-title">回复成功！'+ this.name +'喊你来提问</div>'
	+'			<div class="launch-btn" id="show-question">'
	+'				<div class="launch-guest">'
	+'					<img src="'+ this.guest +'">'
	+'				</div>'
	+'			</div>'
	+'		</div>'
	+'	</div>'
	+'</div>';

	this.run();
}

Launch.prototype = {

	run : function(){
		var self = this;
		if(!self.guest) return;
		self.container.append(self.html);
		self.bind();
	},

	bind : function(){
		var self = this;
		$(".launch-mist").on("click", function(){
			$(".launch-box").remove();
		});

	}

};