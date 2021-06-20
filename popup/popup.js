chrome.storage.sync.get(['binarysearch'], function (result) {
    document.getElementById("hide_constraints1").checked = result.binarysearch;
});
chrome.storage.sync.get(['leetcode'], function (result) {
    document.getElementById("hide_constraints2").checked = result.leetcode;
});

document.getElementById("hide_constraints1").addEventListener("click", binarysearchCallback);
document.getElementById("hide_constraints2").addEventListener("click", leetcodeCallback);


function binarysearchCallback() {
    chrome.tabs.query({
        // active: true,
        // currentWindow: true
    }, function (tabs) {
        for (let i = 0; i < tabs.length; i++)
            chrome.tabs.sendMessage(tabs[i].id, { binarysearch: document.getElementById("hide_constraints1").checked });
    });

}

function leetcodeCallback() {
    chrome.tabs.query({
        // active: true,
        // currentWindow: true
    }, function (tabs) {
        for (let i = 0; i < tabs.length; i++)
            chrome.tabs.sendMessage(tabs[i].id, { leetcode: document.getElementById("hide_constraints2").checked });
    });
}