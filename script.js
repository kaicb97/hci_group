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


//TableID: Number Chairs
var tables = {1: 4, 2: 4, 3: 4, 4: 2, 5: 4, 6: 4, 7: 4, 8: 2, 9: 2};
var selected_tables = [];
var selected_chairs = [];
var number_of_seats = 0;

function logPlanState(){
	console.log("Chairs: "+String(selected_chairs.length)+", Tables: "+String(selected_tables.length));
	if(selected_chairs.length > 0){
		console.log(selected_chairs);
	}
	if(selected_tables.length > 0){
		console.log(selected_tables);
	}
}

function incrementChairs(){
	number_of_seats +=1;
	document.getElementById("chairs").value = number_of_seats;
}

function decrementChairs(){
	number_of_seats -=1;
	document.getElementById("chairs").value = number_of_seats;
}

function selectObject(){
	var ObjectID = event.target.getAttribute("id");
	if(event.target.classList.contains('cell')){
		event.target.classList.add('cell_selected');
		event.target.classList.remove('cell');
		if(ObjectID.includes("C")){
			incrementChairs();
			selected_chairs.push(ObjectID);
		} else if(ObjectID.includes("T")) {
			selected_tables.push(ObjectID);
		}
	} else {
		event.target.classList.add('cell');
		event.target.classList.remove('cell_selected');
		if(ObjectID.includes("C")){
			if(selected_chairs.includes(ObjectID)){
				decrementChairs();
				selected_chairs.pop(ObjectID);
			}
		} else if(ObjectID.includes("T")) {
			if(selected_tables.includes(ObjectID)){
				selected_tables.pop(ObjectID);
			}
		}
	}
	logPlanState();
}

function generatePlan(){
    var plan = document.getElementById("plan");
	
	//Generate Tables Layout
	for(var table in tables) {
		var tableElement = document.createElement("div");
		var tableId = "T"+String(table).padStart(2, '0');
		tableElement.setAttribute("id", tableId);
		tableElement.setAttribute("class", "cell table");
		tableElement.setAttribute("onClick", "selectObject()");
		tableElement.innerHTML = String(table).padStart(2, '0');
		plan.appendChild(tableElement);
		
		for(var index = 1; index <= tables[table]; index++){
			var chairId = "C"+tableId.substring(1)+"_"+String(index).padStart(2, '0');
			var chairElement = document.createElement("div");
			chairElement.setAttribute("id", chairId);
			chairElement.setAttribute("class", "cell chair");
			chairElement.setAttribute("onClick", "selectObject()");
			chairElement.innerHTML = String(index).padStart(2, '0');
			plan.appendChild(chairElement);
		}
	}
	
	//Generate all cells
    plan.style.gridTemplateAreas = ""
    for (let x = 1; x <= 12; x++) {
        var row = '"';
        for (let y = 1; y <= 12; y++) {
            row = row+' Z'+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
            var newCell = document.createElement("div");
            newCell.style.background = "url(ress/floor.png)"
            newCell.style.gridArea = "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
            newCell.classList.add('cell');
            newCell.setAttribute("id", "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0'));
            plan.appendChild(newCell);
        }
        var row = row+'"\n';
        plan.style.gridTemplateAreas = plan.style.gridTemplateAreas+row;
    }

}

function collapseSettings(){
	if(document.getElementById("Settings").style.width != "50px"){
		document.getElementById("Settings").style.width = "50px";
		document.getElementById("collapse").style.transform = "rotate(180deg)";
		document.getElementById("SettingForm").style.display = "none";

	} else {
		document.getElementById("Settings").style.width = "20%";
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

function toggle_popup() {
    var foodContainer = document.getElementById("food-container");
    foodContainer.classList.toggle('show');
}

function choose(button){
    button.classList.toggle("buttonShow");
    return false;
}

var foodprice = 0; 

function calcFoodPrice(){
    var foodprice = 0

    for (var key in choosenFood) {
        foodprice += choosenFood[key] * menu[key].price;
    }

    foodprice = Math.round(foodprice * 100)/100 + "€";
	
    if(foodprice === "0€")
        document.getElementById("food-buy").innerHTML = "Vorort bestellen!"
    else 
        document.getElementById("food-buy").innerHTML = "Bestellen!"

    document.getElementById("food-price-overall").innerHTML = "Gesamt: " + foodprice;
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
	return false;
}

function relativeMenu(id) {
    if(currentMenu == 0 && id < 0) return;
    if(currentMenu == menu.length - 1 && id > 0) return;

    currentMenu += id;

    console.log(currentMenu);

    displayMenuData();
}
