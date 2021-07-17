chrome.storage.sync.get(['binarysearch'], function (result) {
    document.getElementById("hide_constraints1").checked = result.binarysearch;
});
chrome.storage.sync.get(['leetcode'], function (result) {
    document.getElementById("hide_constraints2").checked = result.leetcode;
});
chrome.storage.sync.get(['codechef'], function (result) {
    document.getElementById("hide_constraints3").checked = result.codechef;
});

document.getElementById("hide_constraints1").addEventListener("click", binarysearchCallback);
document.getElementById("hide_constraints2").addEventListener("click", leetcodeCallback);
document.getElementById("hide_constraints3").addEventListener("click", codechefCallback);


function binarysearchCallback() {
    chrome.tabs.query({
        // active: true,
        // currentWindow: true
    }, function (tabs) {
        for (let i = 0; i < tabs.length; i++)
            chrome.tabs.sendMessage(tabs[i].id, { binarysearch: document.getElementById("hide_constraints1").checked, flag: 0 });
    });

}

function leetcodeCallback() {
    chrome.tabs.query({
        // active: true,
        // currentWindow: true
    }, function (tabs) {
        for (let i = 0; i < tabs.length; i++)
            chrome.tabs.sendMessage(tabs[i].id, { leetcode: document.getElementById("hide_constraints2").checked, flag: 1 });
    });
}

function codechefCallback() {
    chrome.tabs.query({
        // active: true,
        // currentWindow: true
    }, function (tabs) {
        for (let i = 0; i < tabs.length; i++)
            chrome.tabs.sendMessage(tabs[i].id, { codechef: document.getElementById("hide_constraints3").checked, flag: 2 });
    });
}