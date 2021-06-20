let prevState;
const className = "MarkdownDiv_markdown-div__2auQ4 lightcode";
const CONSTRAINTS = "**CONSTRAINTS HIDDEN BY EXTENSION**";
console.log("constraints blocker extension on work on binarysearch.com");



function canRunProblemsPage() {
    return document.getElementsByClassName(className)
        && document.getElementsByClassName(className)[0]
        && document.getElementsByClassName(className)[0].childNodes.length > 2;
}
function problemsPage() {
    let x = document.getElementsByClassName(className)[0];
    let y = x.childNodes;
    for (var i = 0; i < y.length; i++) {
        if (y[i].textContent.includes("Constraints") && !y[i + 2].textContent.includes(CONSTRAINTS)) {
            prevState = x.childNodes[i + 2];
            x.replaceChild(document.createTextNode(CONSTRAINTS), prevState);
        }
    }
}

// init executes after fixed interval
// to either block or show constraints
function init() {
    try {
        chrome.storage.sync.get(['binarysearch'], function (result) {
            if (result.binarysearch) {
                if (canRunProblemsPage()) {
                    problemsPage();
                }
            }

        });
    }
    catch (err) {

    }
}


init();

window.addEventListener("load", myMain, false);

function myMain() {
    setInterval(init, 400);
}

chrome.runtime.onMessage.addListener(function (req) {

    //0 stands for message sent by binarysearch button
    if(req.flag!==0)
        return ;

    //If True then block constraints
    if (req.binarysearch) {
        chrome.storage.sync.set({ binarysearch: true }, function () {
            if (canRunProblemsPage()) {
                problemsPage();
            }
        });
    }
    else  {
        //If False then show constraints which is stored in prevState
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


