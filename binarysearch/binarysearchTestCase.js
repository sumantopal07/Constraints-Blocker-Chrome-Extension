let testCase;//This stores the testcase of the problem
let userOutput;//This stores the result of the problem
let expectedOutput;//This stores the testcase of the problem
const TESTS_BLOCKED = "**HIDDEN BY EXTENSION**";

function MAIN_LOGIC() {
    try {
        if(document.getElementsByClassName("ConsoleResults_left__3f6ke")[0].innerText !== "Accepted"){
            
            let x = document.getElementsByClassName("InputOutputBlock_body__2tbLt")[0];
            testCase = x.innerText;
            x.innerText=TESTS_BLOCKED;

            x = document.getElementsByClassName("InputOutputBlock_body__10-4H InputOutputBlock_output__3E8I8")[0];
            userOutput = x.innerText;
            x.innerText=TESTS_BLOCKED;

            x = document.getElementsByClassName("InputOutputBlock_body__10-4H InputOutputBlock_output__3E8I8")[2];
            expectedOutput = x.innerText;
            x.innerText=TESTS_BLOCKED;

        }
        
    }
    catch (err) { }
}

// init executes after fixed interval
// to either block or show tests
function init() {
    try {
        chrome.storage.sync.get(['binarysearchTestCase'], function (result) {
            if (result.binarysearchTestCase) {
                MAIN_LOGIC();
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


// It Blocks or shows the tests 
// based on the request recieved from the user's input change
// in the popup
chrome.runtime.onMessage.addListener(function (req) {

    //0 stands for message sent by leetcode button
    if (req.flag !== 2)
        return;

    //If True then block tests
    console.log("recieved message");
    if (req.binarysearchTestCase) {
        chrome.storage.sync.set({ binarysearchTestCase: true }, function () {
            MAIN_LOGIC();
        });
    }
    else {
        //If False then show tests which is stored in prevState
        chrome.storage.sync.set({ binarysearchTestCase: false }, function () {


            let x = document.getElementsByClassName("InputOutputBlock_body__2tbLt")[0];
            x.innerText=testCase;


            x = document.getElementsByClassName("InputOutputBlock_body__10-4H InputOutputBlock_output__3E8I8")[0];
            x.innerText=userOutput;

            x = document.getElementsByClassName("InputOutputBlock_body__10-4H InputOutputBlock_output__3E8I8")[2];
            x.innerText=expectedOutput;


        });
    }
})


