// //接收消息并处理
// chrome.runtime.onMessage.addListener(function() 
// {
// });
// //监听页面刷新 
// chrome.tabs.onUpdated.addListener(function() {
// });

// // 监听消息 - 当窗口中的当前标签页更改时产生
// chrome.tabs.onActivated.addListener(function() {
// });

// //监听点击（tab）
// chrome.action.onClicked.addListener(function() {
// });

// //监听cookie
// chrome.cookies.onChanged.addListener(function() {
// });
// //插件初次安装
// chrome.runtime.onInstalled.addListener(function() {
// });

console.log('start listen？？？？？？？？？？？？？');


import { backgroundClient, ChromeMessage } from '../chrome/message.js';
import { reload } from '../chrome/runtime.js';
console.log('start listen');
const eventSource = new EventSource('https://localhost:8080/reload/');
eventSource.addEventListener('compiled successfully', () => {
    console.log('compiled successfully');
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true }, async (tabs) => {
        if (tabs.length > 0) {
            const res = await backgroundClient.seedMessage(new ChromeMessage('refresh page'));
            if (res) {
                reload();
            }
        }
    });
});

