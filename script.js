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
    var foodContainer = document.getElementById("food-container");
    foodContainer.classList.toggle('show');
    return false;
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
	document.getElementById("FoodPrice").value = foodprice;
	document.getElementById("FoodPrice2").value = foodprice;
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