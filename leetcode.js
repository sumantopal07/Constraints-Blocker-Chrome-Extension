let prevState;//This stores the constraints of the problem
const problemPage = "content__u3I1 question-content__JfgR";
const contestPage = "question-content default-content";
const CONSTRAINTS_BLOCKED = "**CONSTRAINTS HIDDEN BY EXTENSION**";
let BLOCK_STATE=false;
console.log("constraints blocker extension on work on leetcode.com");
let iteration=0;
function problemsPage() {
    let x = document.getElementsByTagName("*");
    for (let i = 0; i < x.length; i++) {
        if (x[i].innerText === "Constraints:" && !BLOCK_STATE) {
            const para = document.createElement("p");
            const node = document.createTextNode(CONSTRAINTS_BLOCKED);
            para.appendChild(node);

            prevState=x[i+2];
            
            x[i + 2].parentNode.replaceChild(para, prevState);
            
            BLOCK_STATE=true;
            break;
        }
    }
}

// init executes after fixed interval
// to either block or show constraints
function init() {
    try {
        chrome.storage.sync.get(['leetcode'], function (result) {
            if (result.leetcode) {
                problemsPage();
            }
        });
    }
    catch (err) { }

}

init();

function myMain() {
    setInterval(init, 400);
}

window.addEventListener("load", myMain, false);


// It Blocks or shows the constraints 
// based on the request recieved from the user's input change
// in the popup
chrome.runtime.onMessage.addListener(function (req) {
    //If True then block constraints
    console.log("recieved message");
    if (req.leetcode) {
        chrome.storage.sync.set({ leetcode: true }, function () {
            problemsPage();
        });
    }
    else {
        //If False then show constraints which is stored in prevState
        chrome.storage.sync.set({ leetcode: false }, function () {

            BLOCK_STATE=false;

            let x = document.getElementsByTagName("*");
            for (let i = 0; i < x.length; i++) {
                if (x[i].innerText === "Constraints:") {
                    x[i+2].parentNode.replaceChild(prevState,x[i+2]);
                    break;
                }
            }

        });
    }
})


