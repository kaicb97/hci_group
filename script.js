// menu selector
var menu = [
        {
            "id": 0,
            "name": "Schnitzel",
            "img": "https://images.unsplash.com/photo-1599921841143-819065a55cc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
            "price": 6.99
        },
        {
            "id": 1,
            "name": "Burger",
            "img": "http://www.gourmetburger.ch/wp-content/uploads/2018/02/gourmetburger_gallery13.jpg",
            "price": 10.99
        },
        {
            "id": 2,
            "name": "Burger Vegan",
            "img": "https://www.zauberdergewuerze.de/magazin/wp-content/uploads/2021/02/burger_istock-1248306530.jpg",
            "price": 17.99
        }
];
var currentMenu = 0;
var choosenFood = {}

var selected_table_ids = [];
var selected_tables = [];
var selected_chairs = [];
var number_of_seats = 0;
var wheelchair = false;
var babychair = false;

function initiateWebsite(){
	generatePlan();
	var seats = document.getElementById("seats");
	seats.innerHTML = number_of_seats;
	setTime();
	getOldData();
}

function sendData() {
	sessionStorage.setItem("price",foodprice);
	sessionStorage.setItem("foodList",JSON.stringify(choosenFood));
}

function getOldData(){
	var oldPrice = sessionStorage.getItem("price");
	var oldFoodList = JSON.parse(sessionStorage.getItem("foodList"));
	if(oldPrice != null){
		foodprice = oldPrice;
	}
	if (oldFoodList != null) {
		choosenFood = oldFoodList;
		console.log(choosenFood);
	}

	
	document.getElementById("FoodPrice2").innerHTML = "Gesamtpreis: " + foodprice;
	if (document.getElementById("foodListShowButton").innerHTML == "-") {
		getFoodList();
	}
}


function setTime(){
	let currentDate = new Date();
	let cDay = String(currentDate.getDate()).padStart(2,0);
	let cMonth = String((currentDate.getMonth() + 1)).padStart(2,0);
	let cYear = currentDate.getFullYear();
	var datetime = cYear + "-" + cMonth + "-" + cDay;
	let time = String(currentDate.getHours()).padStart(2,0) + ":" + String(currentDate.getMinutes()).padStart(2,0);
	datetime += "T"+time;
	console.log(datetime);
	document.getElementById("time").min = datetime;

}


function collapseSettings(){
	if(document.getElementById("Settings").style.width != "50px"){
		document.getElementById("Settings").style.width = "50px";
		document.getElementById("collapse").style.transform = "rotate(180deg)";
		document.getElementById("SettingForm").style.display = "none";

	} else {
		document.getElementById("Settings").style.width = "25vw";
		document.getElementById("collapse").style.transform = "none";
		document.getElementById("SettingForm").style.display = "flex";
	}	
}

function showFood(){
    console.log("show food");

    displayMenuData();
    
    return false;
}

function displayMenuData() {
    var foodContainer = document.getElementById("food-container");
    var img = document.getElementById("popup-img");
    var title = document.getElementById("food-name");
    var prod_price = document.getElementById("food-price");

    title.innerHTML = menu[currentMenu].name;
    img.src = menu[currentMenu].img;
    prod_price.innerHTML = menu[currentMenu].price;

    foodContainer.classList.add("show");
}

function hideMenu(){
	var foodContainer = document.getElementById("food-container");
	document.getElementById("FoodPrice2").innerHTML = "Gesamtpreis: " + foodprice;
	foodContainer.classList.toggle("show");
	console.log(choosenFood);
}

function choose(button){
    button.classList.toggle("buttonShow");
    return false;
}

function chooseWheelChair(button){
	document.getElementById("wheel").classList.toggle("show");
	button.classList.toggle("clicked");
}

function chooseHighChair(button){
	document.getElementById("high-chair").classList.toggle("show");
	button.classList.toggle("clicked");
}

var foodprice = 0; 

function calcFoodPrice(){
    foodprice = 0
    for (var key in choosenFood) {
        foodprice += choosenFood[key] * menu[key].price;
    }

    foodprice = Math.round(foodprice * 100)/100 + "€";
	
    if(foodprice === "0€")
        document.getElementById("food-buy").innerHTML = "Vorort bestellen!"
    else 
        document.getElementById("food-buy").innerHTML = "Bestellen!"

    document.getElementById("food-price-overall").innerHTML = "Gesamt: " + foodprice;

	if (document.getElementById("foodListShowButton").innerHTML == "-") {
		getFoodList();
	}
}

function incrementFood(count) {
	console.log(choosenFood)

    if(currentMenu in choosenFood) {
        if(choosenFood[currentMenu] !== 0 || count === 1)
            choosenFood[currentMenu] += count;
    } else {
        if(count === 1)
            choosenFood[currentMenu] = count;
    }

    calcFoodPrice();
	console.log(currentMenu);
	return false;
}

function relativeMenu(id) {
    if(currentMenu == 0 && id < 0) return;
    if(currentMenu == menu.length - 1 && id > 0) return;

    currentMenu += id;

    console.log(currentMenu);

    displayMenuData();
}

function getFoodList(){
	var text = "";
    for (var key in choosenFood) {
		var currentFoodPrice = choosenFood[key] * menu[key].price;
		text += choosenFood[key] + "x " + menu[key].name + ": " + (currentFoodPrice*100)/100 + "€" + "<br>";
    }
	document.getElementById("food-list").innerHTML = text;
}

function showFoodList(button){
	if(button.innerHTML == "+"){
		button.innerHTML = "-";
		button.style.padding = "1px 10px";
		document.getElementById("foodListButton").innerHTML = "Essens Auswahl verbergen";
		getFoodList();
	}else{
		button.innerHTML = "+";
		button.style.padding = "1px 7px";
		document.getElementById("foodListButton").innerHTML = "Essens Auswahl anzeigen";
		document.getElementById("food-list").innerHTML = "";
	}

	

}

