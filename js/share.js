function Share(){
	this.container = $("#container");
	this.html =
	'<div class="share-box">'
	+'	<div class="share-mist"></div>'
	+'	<div class="share-wrap"></div>'
	+'	<div class="share-text">'
	+'		<p>戳这里，让更多朋友看到，</p>'
	+'		<p>和他们谈一谈</p>'
	+'	</div>'
	+'</div>';

	// this.run();
}

Share.prototype = {

	run : function(){
		var self = this;
		self.container.append(self.html);
		self.bind();
	},

	bind : function(){
		var self = this;
		$(".share-mist").on("click", function(e){
			$(".share-box").remove();
		});
	}

};