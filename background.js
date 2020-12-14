"use strict";
document.write("<script  src='./md5.js'></script>");
document.write("<script  src='./xhr.js'></script>");

chrome.contextMenus.create({
	id: Date.now() + "",
	title: "翻译 %s",
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
	console.log(res);
	const div = document.createElement("div");
	div.textContent = "asdasd";
	document.documentElement.appendChild(div);
});

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
