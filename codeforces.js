let mathExpression = [];

function AddBlurInput() {
    let inputs = document.querySelectorAll(".input-specification  p");

    inputs.forEach(element => {
        element.style.webkitFilter = "blur(10px)"
    });
}


function RemoveBlurInput() {
    let inputs = document.querySelectorAll(".input-specification  p");

    inputs.forEach(element => {
        element.style.webkitFilter = "blur(0px)"
    });
}

function filler() {
    mathExpression = [];
    var inputSelector = document.querySelectorAll(".input-specification .MathJax");

    for (var i = 0; i < inputSelector.length; i++) {
        let paragraph = inputSelector[i];
        mathExpression.push(paragraph);
    }    
}


function getXml(expression) {
    let text = expression.getAttribute("data-mathml");
    return text;
}

function findNConstraintBracket(mathExpression) {
    if(mathExpression.length <= 1) return;
    RemoveBlurInput();
    for(let i=1; i<mathExpression.length; i++) {
        let pre = getXml(mathExpression[i - 1]);
        let current = getXml(mathExpression[i]);
        
        try {
            let preIndex = pre.indexOf("<mi>n</mi>");
            let currentIndex = current.indexOf("<mi>n</mi>");

            if(preIndex != -1 && currentIndex != -1) {
                mathExpression[i].innerText = "  Constraints Are Hidden  ";
                mathExpression[i].style.color = "white";
                mathExpression[i].style.backgroundColor = "black";
                return;
            }
        } catch(err) {
            // Do Nothing
            console.log(err);
        }
    }
}


AddBlurInput();

let currentInterval = setInterval(() => {
    filler();
    if(mathExpression.length != 0 && mathExpression[0].hasAttribute("data-mathml")) {
        findNConstraintBracket(mathExpression);
        clearInterval(currentInterval);
    }
}, 10);

