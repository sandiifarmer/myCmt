function Qrcode(cfg){
	this.container = $("#container");
	this.cfg = cfg;
	this.html = 
	'<div class="qr-box">'
	+'	<div class="qr-mist"></div>'
	+'	<div class="qr-wrap center">'
	+'		<div class="qr-inner">'
	+'			<div class="qr-title">关注「Camelia山茶花」</div>'
	+'			<div class="qr-pic">'
	+'				<div class="qr-code">'
	+'					<img src="'+ this.cfg.qrcode +'">'
	+'				</div>'
	+'			</div>'
	+'			<div class="qr-text">Tips：长按二维码即可关注「Camelia山茶花」</div>'
	+'		</div>'
	+'	</div>'
	+'</div>';

	this.run();
}

Qrcode.prototype = {

	run : function(){
		var self = this;
		self.container.append(self.html);
		this.bind();
	},

	bind : function(){
		var self = this;
		$(".qr-mist").on("click", function(){
			$(".qr-box").remove();
		});
	}
};