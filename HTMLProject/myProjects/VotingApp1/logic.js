function submitVote() {
    let email = document.getElementById("emailAddress").value;
    let candidate = document.getElementById("selectResponsiblePerson").value;

    if (!email || !candidate) {
        alert('Please enter your email or select a candidate');
        return;
    }
    if (localStorage.getItem(email)) {
        alert('You have already voted');
    } else {
        localStorage.setItem(email, candidate);
        updateResults();
    }
}

function updateResults() {
    let counts = { candidate1: 0, candidate2: 0, candidate3: 0 };
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let vote = localStorage.getItem(key);
        if (counts[vote] !== undefined) {
            counts[vote]++;
        }
    }
    email = '';
    candidate = '';

    document.getElementById("candidate1Count").innerText = counts["candidate1"];
    document.getElementById("candidate2Count").innerText = counts["candidate2"];
    document.getElementById("candidate3Count").innerText = counts["candidate3"];
}
function resetData() {
    localStorage.clear(); 
    location.reload();    
}
updateResults();
