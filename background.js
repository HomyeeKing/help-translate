"use strict";
document.write("<script  src='./md5.js'></script>");
document.write("<script  src='./xhr.js'></script>");

chrome.contextMenus.create({
	id: Date.now() + "",
	title: "翻译 %s",
	contexts: ["selection"],
});
chrome.contextMenus.onClicked.addListener(({ selectionText }) => {
	var appid = "20200430000435396";
	var key = "iQiMeAAafmYSaPxDcN0h";
	var salt = Date.now();
	var query = selectionText;
	var from = "en";
	var to = "zh";
	var str1 = appid + query + salt + key;
	var sign = MD5(str1);
	request({
		url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
		type: "get",
		data: {
			q: query,
			appid: appid,
			salt: salt,
			from: from,
			to: to,
			sign: sign,
		},
		success(data) {
			console.log(data);
		},
	});
});
