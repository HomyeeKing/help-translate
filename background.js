"use strict";
document.write("<script  src='./md5.js'></script>");
document.write("<script  src='./xhr.js'></script>");
chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: Date.now() + "",
		title: "翻译 %s",
		contexts: ["selection"],
	});
	chrome.contextMenus.onClicked.addListener(async ({ selectionText }) => {
		chrome.contextMenus.removeAll();
		var appid = "20200430000435396";
		var key = "iQiMeAAafmYSaPxDcN0h";
		var salt = Date.now() + "";
		var query = selectionText;
		var from = "auto";
		var to = "zh";
		var str1 = appid + query + salt + key;
		var sign = MD5(str1);
		const res = await postData(
			"https://fanyi-api.baidu.com/api/trans/vip/translate",
			{
				q: query,
				appid,
				salt,
				from,
				to,
				sign,
			}
		);
		showNotifications();
	});
});

function showNotifications() {
	const opt = {
		title: "翻译结果",
		message: "msg",
		iconUrl: "images/dog-128.png",
		type: "list",
		// 文字列表
		items: [
			{ title: "1.", message: "五点半该下班了" },
			{ title: "2.", message: "记得按时吃饭" },
		],
		//按钮功能,设置标题和图片
		buttons: [
			{ title: "call", iconUrl: "images/dog-16.png" },
			{ title: "email", iconUrl: "images/dog-16.png" },
		],
	};
	//创建并显示
	chrome.notifications.create(opt);
}
function postData(url, data) {
	// Default options are marked with *
	return fetch(url, {
		body: JSON.stringify(data), // must match 'Content-Type' header
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, same-origin, *omit
		headers: {
			"user-agent": "Mozilla/4.0 MDN Example",
			"content-type": "application/x-www-form-urlencoded",
		},
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer", // *client, no-referrer
	}).then((response) => response.json()); // parses response to JSON
}
