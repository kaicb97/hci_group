var numberOfPeople = 3;

var table = `
<div>
    <table>
    <tr>
        <td>
            <label for="FirstName">First</label>, <label for="LastName">Last Name*:</label>
        </td>
        <td>
            <input name="FirstName" id="FirstName" type="text" maxlength="60" style="max-width:146px;width:100%">
            <input name="LastName" id="LastName" type="text" maxlength="60" style="max-width:146px;width:100%">
        </td>
    </tr>
    <tr>
        <td>
            <label for="FirstName">E-Mail*</label>
        </td>
        <td>
            <input name="FirstName" id="Email" type="text" maxlength="60" style="max-width:300px;width:100%">
        </td>
    </tr>
    </table>
</div>`;


function createInputTables() {
    
    document.getElementById("preis").innerHTML = "<h1>"+localStorage.getItem("price")+"Euro</h1>";
    var input= "";
    for (let index = 0; index < 1; index++) {
        input += '<div class="formBG"><label><h1>Persoehnliche Daten</h1></label>';
        input += table;
    }
    input += '<div class="submit"><button class="mybutton" onClick="send()">submit</button></div></div>';
    document.getElementById("finalForm").innerHTML = input;
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