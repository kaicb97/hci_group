var numberOfPeople = 3;

var price = 0;

function init() {
    price = JSON.parse(sessionStorage.getItem("data"))["price"];
    document.getElementById("preis").innerHTML = "<h1>"+ price +"</h1>";
}

function send() {
    if((document.getElementById("FirstName").value == "") || (document.getElementById("LastName").value == "")) {
        alert("Bitte geben sie ihren Namen an");
    }else if(document.getElementById("Email").value == "") {
        alert("Bitte geben sie ihre Email an");
    }else{
        var data = JSON.parse(sessionStorage.getItem("data"));
        appendData("orders", {"data":[data]});            

        alert("Vielen Dank für ihre Reservierung! Überprüfen sie ihre Mails");
        sessionStorage.clear();
    }
    
}

function goBack(){
    sessionStorage.setItem("price") = price;
    sessionStorage.setItem("data") = sessionStorage.setItem("data");
    window.location.href = "../index.html";
}
