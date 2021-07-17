let prevState;//This stores the constraints of the problem
const CONSTRAINTS_BLOCKED = "**CONSTRAINTS ARE HIDDEN BY EXTENSION**";
console.log("constraints blocker extension on work on codechef.com");

function problemsPage() {
    let x = document.getElementsByTagName("*");
    for (let i = 0; i < x.length; i++) {
        if (x[i].innerText === "Constraints" && x[i+1].tagName === "UL") {
            
            const para = document.createElement("p");
            const node = document.createTextNode(CONSTRAINTS_BLOCKED);
            para.appendChild(node);

            prevState=x[i+1];
            
            x[i + 1].parentNode.replaceChild(para, prevState);
            
            break;
        }
    }
}

// init executes after fixed interval
// to either block or show constraints
function init() {
    try {
        chrome.storage.sync.get(['codechef'], function (result) {
            if (result.codechef) {
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

    //0 stands for message sent by codechef button
    if(req.flag!==2)
        return ;

    //If True then block constraints
    console.log("recieved message");
    if (req.codechef) {
        chrome.storage.sync.set({ codechef: true }, function () {
            problemsPage();
        });
    }
    else {
        //If False then show constraints which is stored in prevState
        chrome.storage.sync.set({ codechef: false }, function () {

            let x = document.getElementsByTagName("*");
            for (let i = 0; i < x.length; i++) {
                if (x[i].innerText === "Constraints") {
                    x[i+1].parentNode.replaceChild(prevState,x[i+1]);
                    break;
                }
            }

        });
    }
})


