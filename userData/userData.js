var numberOfPeople = 3;

function init() {
    document.getElementById("preis").innerHTML = "<h1>"+JSON.parse(localStorage.getItem("data"))["price"]+"Euro</h1>";
}

function send() {
    if((document.getElementById("FirstName").value == "") || (document.getElementById("LastName").value == "")) {
        alert("Bitte geben sie ihren Namen an");
    }else if(document.getElementById("Email").value == "") {
        alert("Bitte geben sie ihre Email an");
    }else{
        appendData("orders", {"data":[JSON.parse(localStorage.getItem("data"))]});            

        alert("Vielen Dank für ihre Reservierung! Überprüfen sie ihre Mails");
    }
    
}
