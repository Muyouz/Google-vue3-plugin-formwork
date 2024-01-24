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