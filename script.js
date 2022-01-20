var rooms = [];

//Roomname, width, height
var room = ["room1", 12, 12];
//tableYCoordinate, tableXCoordinate, chairs horizontal or vertical
var room_tables = [
	[1,2,'h'], [1,5,'h'], [1,8,'h'], [1,11,'h'],
	[4,1,'v'], 
	[7,1,'v'], [7,7,'v'], [7,8,'v'], [7,11,'v'], [7,12,'v'],
	[10,1,'v'], [10,7,'v'], [10,8,'v'], [10,11,'v'], [10,12,'v'],
				[12, 8,'h'], [12, 11,'h']
];
room.push(room_tables);
rooms.push(room);

//Roomname, width, height
var room = ["room2", 12, 16];
//tableYCoordinate, tableXCoordinate, chairs horizontal or vertical
var room_tables = [
	[7,1,'v'], [7,2,'v'], [7,5,'v'], [7,6,'v'], [7,11,'v'], [7,12,'v'], [7,15,'v'],[7,16,'v'],
	[10,1,'v'], [10,2,'v'], [10,5,'v'], [10,6,'v'], [10,11,'v'], [10,12,'v'], [10,15,'v'],[10,16,'v'],
	[12, 2,'h'], [12, 5,'h'], [12, 11,'h'], [12, 15,'h'], 
];
room.push(room_tables);
rooms.push(room);

//Roomname, width, height
var room = ["room3", 7, 28];
var room_tables = [
						  [2,10,'h'], [2,14,'h'], 				[2,23,'h'],
	[3,1,'v'], [3,6,'v'], [3,10,'h'], [3,14,'h'], [3,17,'v'], 	[3,23,'h'],
	[6,1,'v'], [6,6,'v'], [6,10,'h'], [6,14,'h'], [6,17,'v'],	[6,23,'h'],
						  [7,10,'h'], [7,14,'h'], 				[7,23,'h']
];
room.push(room_tables);
rooms.push(room);

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

function addTisch() {
	alert("test");
	var Table = document.createElement("li");
	Table.innerHTML = document.getElementById("tableText").value;
	
	document.getElementById("selected_tables").appendChild(Table);
	document.getElementById("tableText").value = "";
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
	var tableIds = 0;
	rooms.forEach(room => {
    	var plan = document.getElementById(room[0]);
		//Generate all cells
		plan.style.gridTemplateAreas = ""
		for (let x = 1; x <= room[1]; x++) {
			var row = '"';
			for (let y = 1; y <= room[2]; y++) {
				row = row+' Z'+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
				var newCell = document.createElement("div");
				if(room[0] == "room3"){
					newCell.style.background = "url(ress/floor_stone.jpg)"
				} else {
					newCell.style.background = "url(ress/floor.png)"
				}
				newCell.style.backgroundSize = "50px";
				newCell.style.gridArea = "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
				newCell.classList.add('cell');
				newCell.setAttribute("id", "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0'));
				plan.appendChild(newCell);
			}
			var row = row+'"\n';
			plan.style.gridTemplateAreas = plan.style.gridTemplateAreas+row;
		}

    //Generate Table and Chair layout
		room[3].forEach(table => {
			var tableElement = document.createElement("div");
			var tableId = "T"+String(tableIds).padStart(2, '0');
			tableElement.setAttribute("id", tableId);
			tableElement.setAttribute("class", "cell plan_element table");
			tableElement.setAttribute("onclick", "selectObject()");
			tableElement.style.gridArea = "Z"+String(table[0]).padStart(2, '0')+"_"+String(table[1]).padStart(2, '0');
			tableElement.innerHTML = String(tableIds++).padStart(2, '0');
			plan.appendChild(tableElement);

			for(var index = 1; index <= 2; index++){
				var chairId = "C"+tableId.substring(1)+"_"+String(index).padStart(2, '0');
				var chairElement = document.createElement("div");
				chairElement.setAttribute("id", chairId);
				chairElement.setAttribute("class", "cell plan_element chair_square");
				chairElement.setAttribute("onclick", "selectObject()");
				if(table[2] == "v"){
					if(index == 1){
						chairElement.style.gridArea = "Z"+String(table[0]-1).padStart(2, '0')+"_"+String(table[1]).padStart(2, '0');
					} else if(index == 2){
						chairElement.style.gridArea = "Z"+String(table[0]+1).padStart(2, '0')+"_"+String(table[1]).padStart(2, '0');
						chairElement.style.transform = "rotate(180deg)";
					}
				} else if(table[2] == "h"){
					if(index == 1){
						chairElement.style.gridArea = "Z"+String(table[0]).padStart(2, '0')+"_"+String(table[1]-1).padStart(2, '0');
						chairElement.style.transform = "rotate(270deg)";
					} else if(index == 2){
						chairElement.style.gridArea = "Z"+String(table[0]).padStart(2, '0')+"_"+String(table[1]+1).padStart(2, '0');
						chairElement.style.transform = "rotate(90deg)";
					}
				}
				plan.appendChild(chairElement);
			}
		});
	});
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
