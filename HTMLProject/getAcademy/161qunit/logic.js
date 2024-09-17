
function isEmail(text) {
    if (text.includes('@') && text.includes('.')) {
        return true;
    } else {
        return false;
    }
}

function checkEmail() {
    var text = document.getElementById("inputText").trim().value; 
    var resultElement = document.getElementById("result"); 

    if (isEmail(text)) {
        resultElement.innerHTML = "<li>Yes, this looks like an email address.</li>";
    } else {
        resultElement.innerHTML = "<li>No, this doesn't look like an email address.</li>";
    }
}