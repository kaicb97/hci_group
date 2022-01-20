// menu selector
var menu = undefined;
var currentMenu = 0;


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

    showFood()
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
    if (!menu) {
        fetch("./menu.json")
        .then(response => { return response.json(); })
        .then(data => {
            menu = data.menu;
            console.log(data);
            displayMenuData();
        })
    }
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

function choose(button){
    button.classList.toggle("buttonShow");
    return false;
}

var foodprice = 0; 

function calcFoodPrice(){
	var id = "quantity";
	foodprice = 0;
	for(var i = 1; i<4;i++){
		var numberOfFood = parseInt(document.getElementById(id+i).value, 10);
		if(isNaN(numberOfFood)){
			return false;
		}
		if (i<3) {
			foodprice += (6.69 * numberOfFood);
		}else{
			foodprice += (4.20 * numberOfFood);
		}
	}
	foodprice = Math.round(foodprice * 100)/100 + "€";
	document.getElementById("food-price-overall").innerHTML = "Gesammt: " + foodprice;
}

function incrementFood(id){
	var numberOfFood = parseInt(document.getElementById(id).value, 10);
	if(isNaN(numberOfFood) || numberOfFood > 98){
		return false;
	}
	numberOfFood ++;
	document.getElementById(id).value = numberOfFood;
	calcFoodPrice();
	return false;
}

function decrementFood(id){
	var numberOfFood = parseInt(document.getElementById(id).value, 10);
	if(isNaN(numberOfFood) || numberOfFood == 0){
		return false;
	}
	numberOfFood --;
	document.getElementById(id).value = numberOfFood;
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
