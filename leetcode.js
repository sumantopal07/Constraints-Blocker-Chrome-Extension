let prevState;
const problemPage = "content__u3I1 question-content__JfgR";
const contestPage = "question-content default-content";
const CONSTRAINTS = "**CONSTRAINTS HIDDEN BY EXTENSION**";
console.log("constraints blocker extension on work on leetcode.com");

function problemsPage() {
    let x = document.getElementsByClassName(problemPage)[0].childNodes[0];
    let y = x.childNodes;
    for (var i = 0; i < y.length; i++) {
        if (y[i].textContent.includes("Constraints") && !y[i + 2].textContent.includes(CONSTRAINTS)) {
            prevState = x.childNodes[i + 2];
            x.replaceChild(document.createTextNode(CONSTRAINTS), prevState);
        }
    }

}
function contestsPage() {

    let x = document.getElementsByClassName(contestPage)[0];
    let y = x.childNodes;
    for (var i = 0; i < y.length; i++) {
        if (y[i].textContent.includes("Constraints") && !y[i + 2].textContent.includes(CONSTRAINTS)) {
            prevState = x.childNodes[i + 2];
            x.replaceChild(document.createTextNode(CONSTRAINTS), prevState);
        }
    }
}
function canRunProblemsPage() {
    return document.getElementsByClassName(problemPage) &&
        document.getElementsByClassName(problemPage)[0] &&
        document.getElementsByClassName(problemPage)[0].childNodes &&
        document.getElementsByClassName(problemPage)[0].childNodes[0];
}
function canRunContestsPage() {
    return document.getElementsByClassName(contestPage) &&
        document.getElementsByClassName(contestPage)[0] &&
        document.getElementsByClassName(contestPage)[0].childNodes;
}
function init() {
    try {
        chrome.storage.sync.get(['leetcode'], function (result) {
            if (result.leetcode) {
                if (canRunProblemsPage())
                    problemsPage();
                if (canRunContestsPage())
                    contestsPage();
            }
        });
    }
    catch(err){}
    
}
function myMain() {
    setInterval(init, 111);
}


init();

window.addEventListener("load", myMain, false);

chrome.runtime.onMessage.addListener(function (req) {
    if (req.leetcode) {
        chrome.storage.sync.set({ leetcode: true }, function () {
            if (canRunProblemsPage())
                problemsPage();
            if (canRunContestsPage())
                contestsPage();
        });
    }
    else {
        chrome.storage.sync.set({ leetcode: false }, function () {
            if (canRunProblemsPage()) {
                let x = document.getElementsByClassName(problemPage)[0].childNodes[0];
                let y = x.childNodes;
                for (var i = 0; i < y.length; i++) {
                    if (y[i].textContent.includes("Constraints")) {
                        x.replaceChild(prevState, x.childNodes[i + 2]);
                    }
                }

            }
            if (canRunContestsPage()) {
                let x = document.getElementsByClassName(contestPage)[0];
                let y = x.childNodes;
                for (var i = 0; i < y.length; i++) {
                    if (y[i].textContent.includes("Constraints")) {
                        x.replaceChild(prevState, x.childNodes[i + 2]);
                    }
                }

            }
        });
    }
})


