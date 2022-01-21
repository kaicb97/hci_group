var numberOfPeople = 3;

function init() {
    document.getElementById("preis").innerHTML = "<h1>"+localStorage.getItem("price")+"Euro</h1>";
}

function send() {
    if((document.getElementById("FirstName").value == "") || (document.getElementById("LastName").value == "")) {
        alert("Bitte geben sie ihren Namen an");
    }else if(document.getElementById("Email").value == "") {
        alert("Bitte geben sie ihre Email an");
    }else{
        alert("Vielen Dank für ihre Reservierung! Überprüfen sie ihre Mails");
    }
    
}