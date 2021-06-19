let prevState;
const className = "MarkdownDiv_markdown-div__2auQ4 lightcode";
const CONSTRAINTS = "**CONSTRAINTS HIDDEN BY EXTENSION**";

console.log("constraints blocker extension on work on binarysearch.com");

window.addEventListener("load", myMain, false);

function myMain(evt) {
    var jsInitChecktimer = setInterval(checkForJS_Finish, 111);

    function checkForJS_Finish() {

        chrome.storage.sync.get(['binarysearch'], function (result) {
            if (result.binarysearch) {
                if (document.getElementsByClassName(className)
                    && document.getElementsByClassName(className)[0]
                    && document.getElementsByClassName(className)[0].childNodes.length > 2) {
                    let x = document.getElementsByClassName(className)[0];
                    let y = x.childNodes;
                    for (var i = 0; i < y.length; i++) {
                        if (y[i].textContent.includes("Constraints") && !y[i + 2].textContent.includes(CONSTRAINTS)) {
                            prevState = x.childNodes[i + 2];
                            x.replaceChild(document.createTextNode(CONSTRAINTS), prevState);
                        }
                    }
                }
            }

        });

    }
}


chrome.runtime.onMessage.addListener(function (req) {
    if (req.binarysearch) {
        chrome.storage.sync.set({ binarysearch: true }, function () {
            try {
                let x = document.getElementsByClassName(className)[0];
                let y = x.childNodes;
                for (var i = 0; i < y.length; i++) {
                    if (y[i].textContent.includes("Constraints") && !y[i + 2].textContent.includes(CONSTRAINTS)) {
                        prevState = x.childNodes[i + 2];
                        x.replaceChild(document.createTextNode(CONSTRAINTS), prevState);
                    }
                }
            }
            catch (err) {

            }
        });
    }
    else {

        chrome.storage.sync.set({ binarysearch: false }, function () {
            try {
                let x = document.getElementsByClassName(className)[0];
                let y = x.childNodes;
                for (var i = 0; i < y.length; i++) {
                    if (y[i].textContent.includes("Constraints")) {
                        x.replaceChild(prevState, x.childNodes[i + 2]);
                    }
                }
            }
            catch (err) {

            }

        });
    }
})


