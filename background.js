//This code runs when you install the extesnion on your browser
console.log("installed successfully");
chrome.runtime.onInstalled.addListener( () => {
    chrome.storage.sync.set({ leetcode: true }, () => { });
    chrome.storage.sync.set({ binarysearch: true }, () => { });
    chrome.storage.sync.set({ binarysearchTestCase: true }, () => { });
});