let prevState;
const className="content__u3I1 question-content__JfgR";
const CONSTRAINTS = "**CONSTRAINTS HIDDEN BY EXTENSION**";

console.log("constraints blocker extension on work on leetcode.com");

window.addEventListener("load", myMain, false);
function myMain() {
    setInterval(checkForJS_Finish, 111);
    function checkForJS_Finish() {
        try{
            chrome.storage.sync.get(['leetcode'], function (result) {
                if (result.leetcode) {
                    if (document.getElementsByClassName(className)
                        && document.getElementsByClassName(className)[0]
                        && document.getElementsByClassName(className)[0].childNodes
                        && document.getElementsByClassName(className)[0].childNodes[0]) {
    
                        let x = document.getElementsByClassName(className)[0].childNodes[0];
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
        catch(err){

        }
    }
}


chrome.runtime.onMessage.addListener(function (req) {
    if (req.leetcode) {
        chrome.storage.sync.set({ leetcode: true }, function () {
            try {
                let x = document.getElementsByClassName(className)[0].childNodes[0];
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

        chrome.storage.sync.set({ leetcode: false }, function () {
            try {
                let x = document.getElementsByClassName(className)[0].childNodes[0];
                let y = x.childNodes;
                for (var i = 0; i < y.length; i++) {
                    if (y[i].textContent.includes("Constraints")) {
                        x.replaceChild(prevState, x.childNodes[i + 2]);
                    }
                }

            }
            catch (e) {

            }

        });
    }
})


