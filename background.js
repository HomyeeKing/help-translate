'use strict';
const XL = 'XL',
    NORMAL = 'NORMAL',
    handled_tabs = new Map();
let DEVICE_TYPE = NORMAL,
    active_tabs = [];

    /**已被处理过的tab页的id
     * 
     * key:tabId
     * value:windowId //用于判断是否仍处于当前窗口
     */
function isHandledTabs(tabId,windowId){
    if(handled_tabs.has(tabId) && handled_tabs.get(tabId) === windowId)return true
    else{
        handled_tabs.set(tabId,windowId)
         return false
    }
}

function clear_removed_tab(tabId){
    handled_tabs.delete(tabId)
}

chrome.tabs.onActivated.addListener(function (selectionInfo) {
    const { windowId, tabId } = selectionInfo;
    if(isHandledTabs(tabId,windowId))return
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
    if(isHandledTabs(tabId,windowId))return

	chrome.tabs.query({ windowId }, (tabs) => {
		if (tabs[0].width > 1440) {
			chrome.tabs.setZoom(tabId, 1.25);
		} else {
			chrome.tabs.setZoom(tabId, 1);
		}
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const { width,windowId } = tab;
    if(isHandledTabs(tabId,windowId))return
	if (width > 1440) {
		chrome.tabs.setZoom(tabId, 1.25);
	} else {
		chrome.tabs.setZoom(tabId, 1);
	}
});

chrome.tabs.onRemoved.addListener((tabId)=>{
    clear_removed_tab(tabId)
})
