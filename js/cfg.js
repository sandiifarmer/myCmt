window.cfg = {

	// createComment : "../data/success.json?method=create",
	// deleteComment : "../data/success.json?method=delete",
	// queryComment : "../data/queryComment.json?method=query&pagesize=10",
	// showComment : "reply.html?method=show",
	// detailComment : "detail.html?method=detail",
	// createQuestion : "reply.html?method=create",
	// showQuestion : "ask.html?method=show",
	// defaultIcon : "../img/weixin.jpg",
	// getSignature : "../data/getSignature.json",
	// qrcode : "../img/qrcode.jpg"	

	createComment : "http://imp.hicamelia.com/comment?method=create", //GET openid questionid comment
	deleteComment : "http://imp.hicamelia.com/comment?method=delete", //GET openid commentid
	queryComment : "http://imp.hicamelia.com/comment?method=query&pagesize=10", //GET questionid pagesize pageno
	showComment : "http://imp.hicamelia.com/comment?method=show", //HREF openid questionid
	detailComment : "http://imp.hicamelia.com/comment?method=detail", //HREF openid questionid
	createQuestion : "http://imp.hicamelia.com/question?method=create", //HREF openid question
	showQuestion : "http://imp.hicamelia.com/question?method=show", //HREF openid
	defaultIcon : "../static/img/weixin.jpg",
	getSignature : "http://imp.hicamelia.com/weixin_jsapi_signature",
	qrcode : "../static/img/qrcode.jpg"
};