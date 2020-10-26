'use strict';
const XL = 'XL',
	NORMAL = 'NORMAL';
let DEVICE_TYPE = NORMAL,
	active_tabs = [];


chrome.tabs.onActivated.addListener(function (selectionInfo) {
	const { windowId, tabId } = selectionInfo;
	chrome.tabs.query({ windowId }, (tabs) => {
		if (tabs[0].width > 1440) {
			chrome.tabs.setZoom(tabId, 1.25);
		} else {
			chrome.tabs.setZoom(tabId, 1);
		}
	});
});
chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
	const { windowId } = moveInfo;

	chrome.tabs.query({ windowId }, (tabs) => {
		if (tabs[0].width > 1440) {
			chrome.tabs.setZoom(tabId, 1.25);
		} else {
			chrome.tabs.setZoom(tabId, 1);
		}
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const { width, id } = tab;
	if (width > 1440) {
		chrome.tabs.setZoom(id, 1.25);
	} else {
		chrome.tabs.setZoom(id, 1);
	}
});
